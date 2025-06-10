/**
 * Student Profile Page
 * Loads and displays user profile from the 'profiles' table in Supabase
 */

document.addEventListener('DOMContentLoaded', function () {
  console.log("Profile page loaded, checking for profile ID");
  
  // Get profile ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const profileId = urlParams.get('id');
  console.log("Profile ID from URL:", profileId);
  
  // DOM elements
  const profileContainer = document.getElementById('profile-container');
  const profileName = document.getElementById('profile-name');
  const profileEmail = document.getElementById('profile-email');
  const profileBio = document.getElementById('profile-bio');
  const profileImage = document.getElementById('profile-image');
  const loadingIndicator = document.getElementById('loading-indicator');
  const errorElement = document.getElementById('error-message') || document.createElement('div');
  const contactEmail = document.getElementById('contact-email');
  const editProfileButton = document.getElementById('edit-profile-button');
  
  // Show loading state
  if (loadingIndicator) loadingIndicator.style.display = 'block';
  if (profileContainer) profileContainer.style.display = 'none';
  if (errorElement) errorElement.style.display = 'none';
  
  // If no error element exists, add one
  if (!document.getElementById('error-message')) {
    errorElement.id = 'error-message';
    errorElement.style.color = 'red';
    document.body.insertBefore(errorElement, document.body.firstChild);
  }
  
  // Check if we have a profile ID
  if (!profileId) {
    console.error("No profile ID found in URL");
    errorElement.textContent = 'No profile ID provided';
    if (loadingIndicator) loadingIndicator.style.display = 'none';
    return;
  }
  
  // Fetch the profile data using window.supabaseClient
  console.log("Fetching profile data for ID:", profileId);
  window.supabaseClient
    .from('profiles')
    .select('*')
    .eq('id', profileId)
    .single()
    .then(response => {
      // Hide loading indicator
      if (loadingIndicator) loadingIndicator.style.display = 'none';
      
      if (response.error) {
        // Show error message with more details
        console.error('Error fetching profile:', response.error);
        console.log('Full error details:', {
          code: response.error.code,
          message: response.error.message,
          details: response.error.details,
          hint: response.error.hint
        });
        
        // Handle 406 error more gracefully (likely RLS policy restriction)
        if (response.error.code === '406') {
          errorElement.textContent = 'You do not have permission to view this profile.';
          
          // Check if the profile ID matches the current user ID
          window.supabaseClient.auth.getSession().then(({ data }) => {
            const currentUserId = data?.session?.user?.id;
            console.log('Current user ID:', currentUserId, 'Requested profile ID:', profileId);
            
            if (currentUserId && currentUserId !== profileId) {
              errorElement.textContent = 'You can only view your own profile.';
            }
          });
        } else {
          errorElement.textContent = 'Error loading profile: ' + response.error.message;
        }
        return;
      }
      
      const profile = response.data;
      if (!profile) {
        errorElement.textContent = 'Profile not found';
        return;
      }
      
      // Update the DOM with profile data
      if (profileContainer) profileContainer.style.display = 'block';
      
      if (profileName) profileName.textContent = profile.name || 'No name provided';
      if (profileEmail) profileEmail.textContent = profile.email || 'No email provided';
      if (profileBio) profileBio.textContent = profile.bio || 'No bio provided';
      if (contactEmail) contactEmail.textContent = profile.email || 'No email provided';
      
      // Update profile image if available
      if (profileImage && profile.avatar_url) {
        profileImage.src = profile.avatar_url;
        profileImage.alt = profile.name || 'Profile image';
      } else if (profileImage) {
        // Set default image
        profileImage.src = 'assets/default-profile.png';
        profileImage.alt = 'Default profile image';
      }
    })
    .catch(error => {
      console.error('Unexpected error:', error);
      errorElement.textContent = 'An unexpected error occurred';
    });
    
  // Edit Profile Button Event
  if (editProfileButton) {
    editProfileButton.addEventListener('click', () => {
      alert('Profile editing functionality coming soon!');
      // In a real app, this would open a modal or navigate to an edit form
    });
  }
});