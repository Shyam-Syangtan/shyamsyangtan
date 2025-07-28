-- =====================================================
-- MINIMAL ITALKI-LIKE TUTORING PLATFORM DATABASE
-- Run this ENTIRE script in Supabase SQL Editor
-- =====================================================

-- Enable Row Level Security on existing tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutors ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 1. ADD MISSING COLUMNS TO EXISTING TABLES
-- =====================================================

-- Add missing columns to tutors table
DO $$ 
BEGIN
  -- Add is_active column (needed for filtering active tutors)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tutors' AND column_name = 'is_active') THEN
    ALTER TABLE tutors ADD COLUMN is_active BOOLEAN DEFAULT true;
    UPDATE tutors SET is_active = true WHERE is_active IS NULL;
    RAISE NOTICE 'Added is_active column to tutors table';
  END IF;
  
  -- Add specializations column (for tutor specialties)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tutors' AND column_name = 'specializations') THEN
    ALTER TABLE tutors ADD COLUMN specializations TEXT;
    RAISE NOTICE 'Added specializations column to tutors table';
  END IF;
  
  -- Add updated_at column for tracking changes
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tutors' AND column_name = 'updated_at') THEN
    ALTER TABLE tutors ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    UPDATE tutors SET updated_at = NOW() WHERE updated_at IS NULL;
    RAISE NOTICE 'Added updated_at column to tutors table';
  END IF;
  
  -- Add updated_at to profiles table
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'updated_at') THEN
    ALTER TABLE profiles ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    UPDATE profiles SET updated_at = NOW() WHERE updated_at IS NULL;
    RAISE NOTICE 'Added updated_at column to profiles table';
  END IF;
  
END $$;

-- =====================================================
-- 2. CREATE ADDITIONAL TABLES (IF NEEDED)
-- =====================================================

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tutor_id UUID REFERENCES tutors(id) ON DELETE CASCADE NOT NULL,
  learner_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  price DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')),
  meeting_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  recipient_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tutor_id UUID REFERENCES tutors(id) ON DELETE CASCADE NOT NULL,
  learner_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tutor_id, learner_id, lesson_id)
);

-- Enable RLS on new tables
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 3. ROW LEVEL SECURITY POLICIES
-- =====================================================

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Anyone can view active tutors" ON tutors;
DROP POLICY IF EXISTS "Anyone can view tutors" ON tutors;
DROP POLICY IF EXISTS "Tutors can update own profile" ON tutors;
DROP POLICY IF EXISTS "Users can insert tutor profile" ON tutors;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Tutors policies
CREATE POLICY "Anyone can view active tutors" ON tutors FOR SELECT USING (is_active = true OR is_active IS NULL);
CREATE POLICY "Tutors can update own profile" ON tutors FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert tutor profile" ON tutors FOR INSERT WITH CHECK (auth.uid() = id);

-- Lessons policies
DROP POLICY IF EXISTS "Users can view own lessons" ON lessons;
DROP POLICY IF EXISTS "Users can insert lessons" ON lessons;
DROP POLICY IF EXISTS "Users can update own lessons" ON lessons;

CREATE POLICY "Users can view own lessons" ON lessons FOR SELECT USING (auth.uid() = tutor_id OR auth.uid() = learner_id);
CREATE POLICY "Users can insert lessons" ON lessons FOR INSERT WITH CHECK (auth.uid() = learner_id);
CREATE POLICY "Users can update own lessons" ON lessons FOR UPDATE USING (auth.uid() = tutor_id OR auth.uid() = learner_id);

-- Messages policies
DROP POLICY IF EXISTS "Users can view own messages" ON messages;
DROP POLICY IF EXISTS "Users can send messages" ON messages;

CREATE POLICY "Users can view own messages" ON messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);
CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Reviews policies
DROP POLICY IF EXISTS "Anyone can view reviews" ON reviews;
DROP POLICY IF EXISTS "Learners can insert reviews" ON reviews;

CREATE POLICY "Anyone can view reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Learners can insert reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = learner_id);

-- =====================================================
-- 4. FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at (only if columns exist)
DO $$
BEGIN
  -- Profiles trigger
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'updated_at') THEN
    DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
    CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    RAISE NOTICE 'Created updated_at trigger for profiles';
  END IF;
  
  -- Tutors trigger
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tutors' AND column_name = 'updated_at') THEN
    DROP TRIGGER IF EXISTS update_tutors_updated_at ON tutors;
    CREATE TRIGGER update_tutors_updated_at BEFORE UPDATE ON tutors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    RAISE NOTICE 'Created updated_at trigger for tutors';
  END IF;
  
  -- Lessons trigger
  DROP TRIGGER IF EXISTS update_lessons_updated_at ON lessons;
  CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  RAISE NOTICE 'Created updated_at trigger for lessons';
END $$;

-- Function to update tutor rating based on reviews
CREATE OR REPLACE FUNCTION update_tutor_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE tutors 
  SET rating = (
    SELECT COALESCE(AVG(rating::DECIMAL), 0)
    FROM reviews 
    WHERE tutor_id = NEW.tutor_id
  )
  WHERE id = NEW.tutor_id;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update tutor rating when review is added
DROP TRIGGER IF EXISTS update_tutor_rating_trigger ON reviews;
CREATE TRIGGER update_tutor_rating_trigger 
  AFTER INSERT OR UPDATE ON reviews 
  FOR EACH ROW EXECUTE FUNCTION update_tutor_rating();

-- =====================================================
-- 5. INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_tutors_active ON tutors(is_active);
CREATE INDEX IF NOT EXISTS idx_tutors_rating ON tutors(rating DESC);
CREATE INDEX IF NOT EXISTS idx_tutors_price ON tutors(price_per_hour);
CREATE INDEX IF NOT EXISTS idx_lessons_tutor ON lessons(tutor_id);
CREATE INDEX IF NOT EXISTS idx_lessons_learner ON lessons(learner_id);
CREATE INDEX IF NOT EXISTS idx_lessons_status ON lessons(status);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient ON messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_reviews_tutor ON reviews(tutor_id);

-- =====================================================
-- 6. UPDATE EXISTING DATA
-- =====================================================

-- Set default values for new columns
UPDATE tutors SET is_active = true WHERE is_active IS NULL;
UPDATE profiles SET updated_at = NOW() WHERE updated_at IS NULL;
UPDATE tutors SET updated_at = NOW() WHERE updated_at IS NULL;

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================

-- Verify setup
SELECT 
  'Setup completed successfully!' as status,
  (SELECT COUNT(*) FROM profiles) as profiles_count,
  (SELECT COUNT(*) FROM tutors) as tutors_count,
  (SELECT COUNT(*) FROM tutors WHERE is_active = true) as active_tutors_count;
