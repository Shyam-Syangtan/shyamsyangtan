/**
 * Supabase client initialization
 * This file centralizes Supabase connection details and makes the client
 * available globally through window.supabaseClient
 */

// URL and anon key for your Supabase project
const SUPABASE_URL = 'https://jjfpqquontjrjiwnfuku.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZnBxcXVvbnRqcmppd25mdWt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NDkwNjgsImV4cCI6MjA2NTAyNTA2OH0.ek6Q4K_89KgKSwRz0G0F10O6OzFDfbciovYVjoOIrgQ';

// Initialize the client only if it doesn't exist yet
if (!window.supabaseClient && typeof supabase !== 'undefined' && typeof supabase.createClient === 'function') {
  console.log('⚙️ Initializing Supabase client...');
  window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('✅ Supabase client initialized globally');
} else if (!window.supabaseClient) {
  console.error('❌ Supabase library not loaded or createClient not available');
}

console.log('📢 supabaseClient.js loaded, client available:', !!window.supabaseClient);

console.log('📢 supabaseClient.js loaded and initialized:', !!supabaseClient);