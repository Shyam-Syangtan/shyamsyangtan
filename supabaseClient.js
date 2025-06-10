/**
 * FIXED Supabase client initialization
 * This creates a working Supabase client for authentication and database
 */

console.log('🔧 Loading Supabase client...');

// Your Supabase project credentials
const SUPABASE_URL = 'https://jjfpqquontjrjiwnfuku.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZnBxcXVvbnRqcmppd25mdWt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NDkwNjgsImV4cCI6MjA2NTAyNTA2OH0.ek6Q4K_89KgKSwRz0G0F10O6OzFDfbciovYVjoOIrgQ';

// Wait for Supabase library to load, then initialize
function initializeSupabase() {
  try {
    if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
      console.log('✅ Supabase library found, creating client...');

      window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true
        }
      });

      console.log('✅ Supabase client created successfully');
      console.log('🔗 Supabase URL:', SUPABASE_URL);

      // Test the connection
      window.supabaseClient.auth.getSession().then(({ data, error }) => {
        if (error) {
          console.warn('⚠️ Auth session check error:', error.message);
        } else {
          console.log('✅ Supabase auth ready, session:', data.session ? 'Found' : 'None');
        }
      });

      return true;
    } else {
      console.warn('⚠️ Supabase library not ready yet...');
      return false;
    }
  } catch (error) {
    console.error('❌ Error initializing Supabase:', error);
    return false;
  }
}

// Try to initialize immediately
if (!initializeSupabase()) {
  // If not ready, wait and try again
  let attempts = 0;
  const maxAttempts = 10;

  const checkInterval = setInterval(() => {
    attempts++;
    console.log(`🔄 Attempt ${attempts} to initialize Supabase...`);

    if (initializeSupabase()) {
      clearInterval(checkInterval);
      console.log('🎉 Supabase client ready!');
    } else if (attempts >= maxAttempts) {
      clearInterval(checkInterval);
      console.error('❌ Failed to initialize Supabase after maximum attempts');
    }
  }, 500);
}