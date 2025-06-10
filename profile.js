/**
 * Student Profile Page
 * Loads and displays user profile from the 'profiles' table in Supabase
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Profile page loaded');
  
  // DOM elements
  const loadingIndicator = document.getElementById('loading-indicator');
  const errorMessage = document.getElementById('error-message');
  const profileContent = document.getElementById('profile-content');
  const profileAvatar = document.getElementById('profile-avatar');
  const profileName = document.getElementById('profile-name');
  const profileEmail = document.getElementById('profile-email');
  const profileCreated = document.getElementById('profile-created');
  
  /**
   * Show error message
   */
  function showError(message) {
    loadingIndicator.classList.add('hidden');
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    profileContent.classList.add('hidden');
    console.error('Profile error:', message);
  }
  
  /**
   * Show profile content
   */
  function showProfile() {
    loadingIndicator.classList.add('hidden');
    errorMessage.classList.add('hidden');
    profileContent.classList.remove('hidden');
  }
  
  /**
   * Format date nicely
   */
  function formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  // Get profile ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const profileId = urlParams.get('id');
  
  if (!profileId) {
    showError('Profile ID is missing. Please check the URL.');
    return;
  }
  
  console.log('Fetching profile with ID:', profileId);
  
  // Check if Supabase client is available
  if (!window.supabaseClient) {
    showError('Database connection not available');
    return;
  }
  
  // Fetch profile data from Supabase 'profiles' table
  window.supabaseClient
    .from('profiles')
    .select('*')
    .eq('id', profileId)
    .single()
    .then(function(response) {
      const { data, error } = response;
      
      if (error) {
        console.error('Supabase error:', error);
        showError('Unable to load profile.');
        return;
      }
      
      if (!data) {
        console.error('No profile found with ID:', profileId);
        showError('Unable to load profile.');
        return;
      }
      
      console.log('Profile data loaded:', data);
      
      // Display profile data
      profileAvatar.src = data.avatar_url || 'https://via.placeholder.com/120';
      profileName.textContent = data.name || 'Unnamed User';
      profileEmail.textContent = data.email || '';
      profileCreated.textContent = formatDate(data.created_at);
      
      showProfile();
    })
    .catch(function(err) {
      console.error('Unexpected error:', err);
      showError('An unexpected error occurred.');
    });
});