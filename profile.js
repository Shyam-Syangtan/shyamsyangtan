// Profile page functionality
console.log('🔧 Profile.js loading...');

let currentUser = null;
let currentProfile = null;

// Helper function to check stored session info
function getStoredSessionInfo() {
  try {
    const stored = localStorage.getItem('supabase_session_user');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('⚠️ Could not read stored session info:', error);
    return null;
  }
}

// Wait for Supabase to be ready
async function waitForSupabase() {
  let attempts = 0;
  while (!window.supabaseClient && attempts < 50) {
    await new Promise(resolve => setTimeout(resolve, 100));
    attempts++;
  }
  if (!window.supabaseClient) {
    throw new Error('Supabase client not available');
  }
}

// Show loading state
function showLoading() {
  document.getElementById('loading-indicator').style.display = 'block';
  document.getElementById('profile-container').style.display = 'none';
  document.getElementById('error-message').style.display = 'none';
}

// Show error state
function showError(message) {
  document.getElementById('loading-indicator').style.display = 'none';
  document.getElementById('profile-container').style.display = 'none';
  const errorDiv = document.getElementById('error-message');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';

  // Show debug section for session-related errors
  if (message.includes('session') || message.includes('login') || message.includes('auth')) {
    document.getElementById('debug-section').style.display = 'block';
  }
}

// Show profile data
function showProfile() {
  document.getElementById('loading-indicator').style.display = 'none';
  document.getElementById('error-message').style.display = 'none';
  document.getElementById('profile-container').style.display = 'block';
}

// Load user profile from database
async function loadUserProfile() {
  try {
    console.log('📊 Loading user profile...');
    showLoading();

    console.log('⏳ Waiting for Supabase...');
    await waitForSupabase();
    console.log('✅ Supabase is ready');

    console.log('🔐 Getting current session...');
    let session = null;
    let sessionError = null;

    // Try to get session multiple times with different methods
    for (let attempt = 1; attempt <= 5; attempt++) {
      console.log(`🔄 Session attempt ${attempt}/5...`);

      // Wait a bit longer for auth to be ready
      if (attempt > 1) {
        console.log(`⏳ Waiting before attempt ${attempt}...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      const result = await window.supabaseClient.auth.getSession();
      sessionError = result.error;
      session = result.data?.session;

      if (sessionError) {
        console.error(`❌ Session error on attempt ${attempt}:`, sessionError);

        // Try to refresh session on every attempt
        console.log('🔄 Trying to refresh session...');
        const refreshResult = await window.supabaseClient.auth.refreshSession();
        if (refreshResult.data?.session) {
          session = refreshResult.data.session;
          sessionError = null;
          console.log('✅ Session refreshed successfully');
          break;
        }
      } else if (session && session.user) {
        console.log(`✅ Valid session found on attempt ${attempt}`);
        break;
      } else {
        console.log(`⚠️ No session on attempt ${attempt}, will retry...`);
      }
    }

    if (sessionError) {
      console.error('❌ Final session error:', sessionError);
      throw new Error(`Session error: ${sessionError.message}`);
    }

    if (!session || !session.user) {
      console.error('❌ No valid session found after all attempts');
      console.log('🔄 Attempting to trigger OAuth flow...');

      // Try to trigger OAuth as a last resort
      try {
        await window.supabaseClient.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.href
          }
        });
        return; // This will redirect, so we return here
      } catch (oauthError) {
        console.error('❌ OAuth fallback failed:', oauthError);
        throw new Error('No active session. Please log in again.');
      }
    }

    currentUser = session.user;
    console.log('👤 Current user:', currentUser.email);
    console.log('👤 User ID:', currentUser.id);

    // Get profile from database
    console.log('🔍 Querying profiles table...');
    const { data: profile, error: profileError } = await window.supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', currentUser.id)
      .single();

    console.log('📊 Query result:', { profile, profileError });

    if (profileError) {
      console.error('❌ Profile query error:', profileError);

      // If no profile found, try to create one
      if (profileError.code === 'PGRST116') {
        console.log('🔧 No profile found, creating one...');
        const newProfile = {
          id: currentUser.id,
          email: currentUser.email,
          name: currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'User',
          avatar_url: currentUser.user_metadata?.avatar_url || null,
          role: 'learner'
        };

        const { data: createdProfile, error: createError } = await window.supabaseClient
          .from('profiles')
          .insert([newProfile])
          .select()
          .single();

        if (createError) {
          throw new Error(`Failed to create profile: ${createError.message}`);
        }

        console.log('✅ Profile created:', createdProfile);
        currentProfile = createdProfile;
      } else {
        throw new Error(`Profile error: ${profileError.message}`);
      }
    } else {
      if (!profile) {
        throw new Error('Profile not found in database');
      }
      currentProfile = profile;
    }

    console.log('✅ Profile loaded:', currentProfile);

    // Display profile data
    displayProfile(currentProfile);
    showProfile();

  } catch (error) {
    console.error('❌ Error loading profile:', error);
    showError(`Failed to load profile: ${error.message}`);
  }
}

// Display profile data in the UI
function displayProfile(profile) {
  console.log('🎨 Displaying profile data...');

  // Basic info
  document.getElementById('profile-name').textContent = profile.name || 'No name set';
  document.getElementById('profile-email').textContent = profile.email || 'No email';
  document.getElementById('contact-email').textContent = profile.email || 'No email';

  // Avatar
  const avatarImg = document.getElementById('profile-image');
  if (profile.avatar_url) {
    avatarImg.src = profile.avatar_url;
    avatarImg.style.display = 'block';
  } else {
    // Show initials if no avatar
    avatarImg.style.display = 'none';
    // You could add initials logic here
  }

  // Bio
  const bioElement = document.getElementById('profile-bio');
  if (profile.bio) {
    bioElement.textContent = profile.bio;
  } else {
    bioElement.innerHTML = '<em>No bio added yet. Click edit to add one!</em>';
    bioElement.style.color = '#999';
  }

  // Role badge
  const roleInfo = document.createElement('div');
  roleInfo.className = 'role-badge';
  roleInfo.innerHTML = `<i class="fas fa-user"></i> ${profile.role || 'learner'}`;
  
  // Add role badge to profile info if not already there
  const profileInfo = document.querySelector('.profile-info');
  const existingRole = profileInfo.querySelector('.role-badge');
  if (existingRole) {
    existingRole.remove();
  }
  profileInfo.appendChild(roleInfo);

  // Skills (if any)
  const skillsContainer = document.getElementById('skills-container');
  if (profile.skills && profile.skills.length > 0) {
    skillsContainer.innerHTML = profile.skills.map(skill => 
      `<span class="skill-tag">${skill}</span>`
    ).join('');
  } else {
    skillsContainer.innerHTML = '<em>No skills added yet</em>';
  }

  // Add created date info
  if (profile.created_at) {
    const joinDate = new Date(profile.created_at).toLocaleDateString();
    const joinInfo = document.createElement('p');
    joinInfo.className = 'join-date';
    joinInfo.innerHTML = `<i class="fas fa-calendar"></i> Member since ${joinDate}`;
    profileInfo.appendChild(joinInfo);
  }
}

// Initialize profile page
async function initProfilePage() {
  console.log('🚀 Initializing profile page...');

  try {
    // Remove timeout - let it try as long as needed
    await loadUserProfile();
  } catch (error) {
    console.error('❌ Failed to initialize profile page:', error);
    showError(`Failed to load profile: ${error.message}`);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  console.log('📄 Profile page DOM loaded');

  // Add more debugging
  console.log('🔍 Checking if Supabase is available...');
  console.log('Supabase client:', window.supabaseClient);

  // Small delay to ensure other scripts are loaded
  setTimeout(async () => {
    console.log('🚀 Starting profile initialization...');
    try {
      await initProfilePage();
    } catch (error) {
      console.error('💥 Profile initialization failed:', error);
      showError(`Initialization failed: ${error.message}`);
    }
  }, 1000); // Increased delay
});

// Also try to initialize when window loads (backup)
window.addEventListener('load', async () => {
  console.log('🌐 Window loaded, checking profile state...');

  // If still loading after window load, try again
  setTimeout(() => {
    const loadingDiv = document.getElementById('loading-indicator');
    if (loadingDiv && loadingDiv.style.display !== 'none') {
      console.log('🔄 Still loading, retrying...');
      initProfilePage().catch(error => {
        console.error('💥 Retry failed:', error);
        showError(`Retry failed: ${error.message}`);
      });
    }
  }, 2000);
});

// Set up debug button event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Retry session button
  const retryBtn = document.getElementById('retry-session-btn');
  if (retryBtn) {
    retryBtn.addEventListener('click', async () => {
      console.log('🔄 Retry session button clicked');
      document.getElementById('debug-section').style.display = 'none';
      document.getElementById('error-message').style.display = 'none';
      await initProfilePage();
    });
  }

  // Force login button
  const forceLoginBtn = document.getElementById('force-login-btn');
  if (forceLoginBtn) {
    forceLoginBtn.addEventListener('click', async () => {
      console.log('🔐 Force login button clicked');
      try {
        await window.supabaseClient.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.href
          }
        });
      } catch (error) {
        console.error('❌ Force login failed:', error);
        alert('Login failed: ' + error.message);
      }
    });
  }

  // Manual OAuth button (always visible)
  const manualOAuthBtn = document.getElementById('manual-oauth-btn');
  if (manualOAuthBtn) {
    manualOAuthBtn.addEventListener('click', async () => {
      console.log('🚀 Manual OAuth button clicked');
      try {
        await window.supabaseClient.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.href
          }
        });
      } catch (error) {
        console.error('❌ Manual OAuth failed:', error);
        alert('OAuth failed: ' + error.message);
      }
    });
  }
});

console.log('✅ Profile.js loaded');
