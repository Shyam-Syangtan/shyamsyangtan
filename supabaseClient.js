/**
 * Supabase client initialization
 * This file centralizes Supabase connection details and exports the client
 * for use throughout the application.
 */

// URL and anon key for your Supabase project
const SUPABASE_URL = 'https://jjfpqquontjrjiwnfuku.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZnBxcXVvbnRqcmppd25mdWt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NDkwNjgsImV4cCI6MjA2NTAyNTA2OH0.ek6Q4K_89KgKSwRz0G0F10O6OzFDfbciovYVjoOIrgQ';

// Store the supabase client as a module-level variable
let supabaseClient = null;

/**
 * Initialize the Supabase client
 * This function handles different contexts (module vs non-module)
 * and ensures we create only one client instance
 */
function initSupabase() {
  // If client already exists, return it
  if (supabaseClient) {
    return supabaseClient;
  }
  
  console.log('⚙️ Initializing Supabase client...');
  
  try {
    // Check if we're in a module context with import available
    if (typeof createClient === 'undefined' && typeof window.createClient === 'function') {
      // Using the globally available createClient
      supabaseClient = window.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      console.log('✅ Supabase client initialized from global createClient');
      
    } else if (typeof createClient === 'function') {
      // Using imported createClient
      supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      console.log('✅ Supabase client initialized from imported createClient');
      
    } else {
      console.error('❌ createClient function not available. Make sure Supabase JS is loaded first.');
      return null;
    }
    
    return supabaseClient;
    
  } catch (error) {
    console.error('❌ Error initializing Supabase client:', error);
    return null;
  }
}

// Initialize on load
supabaseClient = initSupabase();

// Export for ES modules
export { supabaseClient };

// IMPORTANT: Make available globally for non-module scripts
window.supabaseClient = supabaseClient;

console.log('📢 supabaseClient.js loaded and initialized:', !!supabaseClient);