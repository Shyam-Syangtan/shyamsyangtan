# 🚀 TutorConnect - Minimal Setup Guide

## ✅ **WHAT I BUILT FOR YOU:**

A clean, minimal italki-like language tutoring platform with:

### 📁 **Core Files (Only Essential):**
- `index.html` - Landing page with hero section
- `login.html` - Single login/signup page with Google Auth
- `home.html` - Dashboard after login
- `find-tutors.html` - Browse tutors from Supabase
- `tutor.html` - Individual tutor profile with booking calendar
- `profile.html` - User profile page
- `styles.css` - Clean, professional styling
- `auth.js` - Authentication system
- `supabaseClient.js` - Database connection
- `FIXED_DATABASE_SETUP.sql` - Database schema

### 🔄 **User Flow:**
1. **Landing** (`index.html`) → "Find Tutors" or "Get Started"
2. **Login** (`login.html`) → Google OAuth → Creates profile in Supabase
3. **Dashboard** (`home.html`) → Main action: "Find Tutors"
4. **Browse Tutors** (`find-tutors.html`) → Horizontal cards from Supabase
5. **Tutor Profile** (`tutor.html`) → Bio, video, calendar booking
6. **Profile Dropdown** → "My Profile", "Become Tutor", "Settings", "Support", "Sign Out"

---

## 🔧 **WHAT YOU NEED TO DO IN SUPABASE:**

### **Step 1: Run Database Setup**
1. Open Supabase SQL Editor
2. Copy/paste entire `FIXED_DATABASE_SETUP.sql`
3. Click "Run"
4. Should see "Setup completed successfully!"

### **Step 2: Enable Google OAuth**
1. Go to **Authentication → Providers**
2. **Enable Google** provider
3. Add your **Google Client ID** and **Client Secret**

### **Step 3: Configure Redirect URLs**
1. Go to **Authentication → URL Configuration**
2. Add these to **"Redirect URLs":**
   ```
   http://localhost:5500/home.html
   http://localhost:3000/home.html
   https://yourdomain.com/home.html
   ```

### **Step 4: Get Google OAuth Credentials (If Needed)**
1. Go to **Google Cloud Console** (console.cloud.google.com)
2. Create project → Enable Google+ API
3. Create **OAuth 2.0 Client ID**
4. Add **Authorized redirect URI:**
   ```
   https://jjfpqquontjrjiwnfuku.supabase.co/auth/v1/callback
   ```
5. Copy **Client ID** and **Client Secret** to Supabase

---

## 🧪 **TESTING YOUR PLATFORM:**

### **Test 1: Database**
```sql
-- Run in Supabase SQL Editor to verify:
SELECT COUNT(*) FROM profiles;
SELECT COUNT(*) FROM tutors;
```

### **Test 2: Add Sample Tutors**
1. Open browser console on any page
2. Run this code:
```javascript
// Add a sample tutor
const tutorId = 'sample-' + Date.now();
await window.supabaseClient.from('profiles').upsert({
  id: tutorId,
  email: 'sample@example.com',
  name: 'Sample Tutor',
  role: 'tutor'
});
await window.supabaseClient.from('tutors').upsert({
  id: tutorId,
  languages: 'Hindi, English',
  bio: 'Experienced Hindi teacher',
  price_per_hour: 25,
  rating: 4.5,
  total_lessons: 100,
  years_experience: 5,
  is_active: true
});
```

### **Test 3: Complete Flow**
1. **Open `index.html`** → Should see landing page
2. **Click "Find Tutors"** → Should see tutors list
3. **Click "Get Started"** → Should go to login
4. **Login with Google** → Should redirect to dashboard
5. **Click user initial** → Should show dropdown
6. **Click tutor card** → Should open tutor profile with calendar

---

## 🎯 **SUCCESS INDICATORS:**

### ✅ **Authentication Working:**
- Google login redirects properly
- User profile created in Supabase
- User initial appears in top-right
- Dropdown shows "My Profile", "Become Tutor", etc.

### ✅ **Tutors Working:**
- Tutors display in horizontal cards
- Profile images show (or generated avatars)
- Clicking tutor opens profile page
- Calendar and booking system works

### ✅ **Navigation Working:**
- All links work correctly
- Consistent navigation across pages
- Responsive design on mobile

---

## 📱 **FEATURES INCLUDED:**

### **Core MVP Features:**
- ✅ Google Authentication via Supabase
- ✅ Shared login/signup page
- ✅ User dashboard with "Find Tutors" focus
- ✅ Tutor browsing with Supabase data
- ✅ Individual tutor profiles
- ✅ Calendar booking system
- ✅ Profile dropdown with all required options
- ✅ Clean, minimal design
- ✅ Mobile responsive

### **Database Tables:**
- ✅ `profiles` - User accounts (learners & tutors)
- ✅ `tutors` - Tutor-specific data
- ✅ `lessons` - Booking system
- ✅ `messages` - Communication (ready for future)
- ✅ `reviews` - Rating system (ready for future)

---

## 🚀 **NEXT STEPS:**

### **Immediate:**
1. Run the database setup script
2. Configure Google OAuth
3. Test the complete flow
4. Add real tutor data

### **Future Features (Not Included):**
- Payment processing
- Video calling integration
- Advanced messaging system
- Tutor application process
- Advanced search/filtering
- Mobile app

---

## 🔍 **TROUBLESHOOTING:**

### **Issue: Google login not working**
- Check Google Cloud Console setup
- Verify redirect URLs match exactly
- Ensure Google provider enabled in Supabase

### **Issue: No tutors showing**
- Run database setup script
- Add sample tutors using the test code above
- Check browser console for errors

### **Issue: Profile dropdown not working**
- Check if user is logged in
- Verify auth.js is loaded
- Check browser console for JavaScript errors

---

## 📞 **SUPPORT:**

If you encounter issues:
1. Check browser console for errors
2. Verify Supabase dashboard settings
3. Test with the provided sample code
4. Share specific error messages

**Your minimal, professional tutoring platform is ready! 🎉**
