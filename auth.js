/**
 * Authentication utilities for Supabase
 * Handles login, session management, and UI updates
 */

// Get reference to the globally available supabase client
const supabase = window.supabaseClient;

/**
 * Check for active session and update UI accordingly
 * This should run on every page load
 */
async function checkAndUpdateSession() {
  console.log('🔍 Checking for active session...');

  try {
    // IMPORTANT: First check for session from URL after OAuth redirect
    if (window.location.hash && window.location.hash.includes('access_token')) {
      console.log('🔑 OAuth redirect detected with token in URL');
      
      try {
        // Get session from URL parameters
        const { data, error } = await supabase.auth.getSessionFromUrl();
        
        if (error) {
          console.error('❌ Error getting session from URL:', error.message);
        } else if (data && data.session) {
          console.log('✅ Successfully extracted session from URL:', data.session.user.email);
          
          // Clean the URL by removing the auth hash
          window.history.replaceState({}, document.title, window.location.pathname);
          console.log('🧹 Cleaned URL hash');
          
          // Update UI to show logged in state
          updateUIWithUserSession(data.session);
          
          // Create user profile in database
          await createUserProfile(data.session.user);
          
          return data.session;
        }
      } catch (e) {
        console.error('❌ Exception handling OAuth redirect:', e);
      }
    }
    
    // Always check for existing session
    console.log('🔍 Checking for existing session in browser...');
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('❌ Error fetching session:', error.message);
      return null;
    }
    
    if (session && session.user) {
      console.log('✅ Active session found for:', session.user.email);
      
      // Update UI for logged in user
      updateUIWithUserSession(session);
      
      return session;
    } else {
      console.log('ℹ️ No active session');
      updateUIForLoggedOutState();
      return null;
    }
  } catch (err) {
    console.error('❌ Unexpected error checking session:', err);
    updateUIForLoggedOutState();
    return null;
  }
}

/**
 * Update UI elements to show logged-in state
 * @param {Object} session - The user session object
 */
function updateUIWithUserSession(session) {
  if (!session || !session.user) {
    console.error('❌ Invalid session object');
    return;
  }
  
  const loginBtn = document.getElementById('login-btn');
  const userInitialContainer = document.getElementById('user-initial-container');
  const userInitial = document.getElementById('user-initial');
  
  if (!loginBtn || !userInitialContainer || !userInitial) {
    console.warn('⚠️ UI elements not found for auth update');
    return;
  }
  
  const user = session.user;
  const email = user.email || '';
  const name = user.user_metadata?.full_name || email.split('@')[0];
  const initial = name.charAt(0).toUpperCase();
  
  // Hide login button, show user initial
  loginBtn.classList.add('hidden');
  userInitialContainer.classList.remove('hidden');
  userInitial.textContent = initial;
  
  console.log('🎨 Updated UI for logged-in user:', initial);
  
  // FIXED: Correctly set "My Profile" link with id parameter (not user_id)
  const myProfileLink = document.querySelector('#user-dropdown a[id="my-profile-link"]');
  if (myProfileLink && user.id) {
    myProfileLink.href = `profile.html?id=${user.id}`;
    console.log('🔗 Set profile link to:', myProfileLink.href);
  }
  
  // Set up dropdown toggle functionality
  setupDropdownBehavior();
}

/**
 * Update UI for logged in users
 * @param {Object} user - The current user object
 */
function updateUIForLoggedInUser(user) {
  if (!user || !user.id) {
    console.error('❌ Invalid user object');
    return;
  }
  
  // Update the "My Profile" link to point to the current user's profile
  const myProfileLink = document.getElementById('my-profile-link');
  if (myProfileLink) {
    myProfileLink.href = `profile.html?id=${user.id}`;
  }
}

/**
 * Update UI for logged out state
 */
function updateUIForLoggedOutState() {
  const loginBtn = document.getElementById('login-btn');
  const userInitialContainer = document.getElementById('user-initial-container');
  
  if (loginBtn && userInitialContainer) {
    loginBtn.classList.remove('hidden');
    userInitialContainer.classList.add('hidden');
    console.log('🎨 Updated UI for logged-out state');
  }
}

/**
 * Set up dropdown toggle behavior
 */
function setupDropdownBehavior() {
  const userInitialContainer = document.getElementById('user-initial-container');
  const userDropdown = document.getElementById('user-dropdown');
  const logoutBtn = document.getElementById('logout-btn');
  
  if (!userInitialContainer || !userDropdown) {
    console.warn('⚠️ Dropdown elements not found');
    return;
  }
  
  // Toggle dropdown on user initial click
  userInitialContainer.addEventListener('click', (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle('hidden');
    console.log('🔽 Toggled user dropdown');
  });
  
  // Close dropdown when clicking elsewhere
  document.addEventListener('click', (e) => {
    if (!userInitialContainer.contains(e.target) && !userDropdown.classList.contains('hidden')) {
      userDropdown.classList.add('hidden');
    }
  });
  
  // Set up logout button
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      await signOut();
    });
  }
}

/**
 * Sign in with Google
 */
async function signInWithGoogle() {
  console.log('🚀 Starting Google Sign-In flow...');
  
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + window.location.pathname
      }
    });
    
    if (error) {
      console.error('❌ Google sign-in error:', error.message);
      return { success: false, error };
    }
    
    console.log('🔄 Redirecting to Google authentication...');
    return { success: true, data };
  } catch (err) {
    console.error('❌ Exception during Google sign-in:', err);
    return { success: false, error: err };
  }
}

/**
 * Sign out the current user
 */
async function signOut() {
  console.log('🚪 Signing out...');
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('❌ Sign-out error:', error.message);
      return false;
    }
    
    console.log('✅ Successfully signed out');
    updateUIForLoggedOutState();
    
    // Redirect to home page
    window.location.href = '/';
    return true;
  } catch (err) {
    console.error('❌ Exception during sign-out:', err);
    return false;
  }
}

/**
 * Create or update user profile after authentication
 * @param {Object} user - User object from session
 */
async function createUserProfile(user) {
  if (!user || !user.id) {
    console.warn('⚠️ Invalid user object for profile creation');
    return;
  }
  
  console.log('👤 Creating/updating profile for user:', user.email);
  
  try {
    // First check if profile already exists
    const { data: existingProfile, error: fetchError } = await supabase
      .from('user_profiles') // IMPORTANT: This should match your table name exactly
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = row not found
      console.error('❌ Error checking existing profile:', fetchError);
      return;
    }
    
    // Profile data structure
    const profileData = {
      user_id: user.id,
      email: user.email,
      display_name: user.user_metadata?.full_name || user.email.split('@')[0],
      avatar_url: user.user_metadata?.avatar_url || null,
      last_login: new Date().toISOString()
    };
    
    if (existingProfile) {
      // Update existing profile
      console.log('🔄 Updating existing profile');
      
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update(profileData)
        .eq('user_id', user.id);
      
      if (updateError) {
        console.error('❌ Error updating profile:', updateError);
      } else {
        console.log('✅ Profile updated successfully');
      }
    } else {
      // Create new profile
      console.log('➕ Creating new user profile');
      
      // Add created_at for new profiles
      profileData.created_at = new Date().toISOString();
      
      const { error: insertError } = await supabase
        .from('user_profiles')
        .insert([profileData]);
      
      if (insertError) {
        console.error('❌ Error creating profile:', insertError);
      } else {
        console.log('✅ New profile created successfully');
      }
    }
  } catch (err) {
    console.error('❌ Exception during profile creation:', err);
  }
}

// Export functions
export {
  checkAndUpdateSession,
  signInWithGoogle,
  signOut
};

// Fix for "My Profile" link - runs when auth.js loads
(function() {
  // Wait for DOM to be loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Check if we have a Supabase client and look for an existing session
    if (window.supabaseClient) {
      window.supabaseClient.auth.getSession().then(function(response) {
        const { data } = response;
        if (data && data.session && data.session.user) {
          // Fix the "My Profile" link to use 'id' param instead of 'user_id'
          const myProfileLink = document.getElementById('my-profile-link');
          if (myProfileLink) {
            myProfileLink.href = `profile.html?id=${data.session.user.id}`;
            console.log('Fixed profile link to use correct "id" parameter:', myProfileLink.href);
          }
        }
      }).catch(function(err) {
        console.error('Error checking session for profile link fix:', err);
      });
    }
  });
})();

/**
 * Debug script to check URL parameters
 */
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const profileId = urlParams.get('id');
  console.log('Current URL parameters:', {
    'id parameter': profileId,
    'full URL': window.location.href,
    'has id parameter': urlParams.has('id')
  });
  
  // Log the current "My Profile" link if it exists
  const myProfileLink = document.getElementById('my-profile-link');
  if (myProfileLink) {
    console.log('Current "My Profile" link href:', myProfileLink.href);
  }
});

/**
 * Update UI elements to show logged-in state
 * @param {Object} session - The user session object
 */
function updateUIWithUserSession(session) {
  if (!session || !session.user) {
    console.error('❌ Invalid session object');
    return;
  }
  
  const loginBtn = document.getElementById('login-btn');
  const userInitialContainer = document.getElementById('user-initial-container');
  const userInitial = document.getElementById('user-initial');
  
  if (!loginBtn || !userInitialContainer || !userInitial) {
    console.warn('⚠️ UI elements not found for auth update');
    return;
  }
  
  const user = session.user;
  const email = user.email || '';
  const name = user.user_metadata?.full_name || email.split('@')[0];
  const initial = name.charAt(0).toUpperCase();
  
  // Hide login button, show user initial
  loginBtn.classList.add('hidden');
  userInitialContainer.classList.remove('hidden');
  userInitial.textContent = initial;
  
  console.log('🎨 Updated UI for logged-in user:', initial);
  
  // FIXED: Correctly set "My Profile" link with id parameter (not user_id)
  const myProfileLink = document.querySelector('#user-dropdown a[id="my-profile-link"]');
  if (myProfileLink && user.id) {
    myProfileLink.href = `profile.html?id=${user.id}`;
    console.log('🔗 Set profile link to:', myProfileLink.href);
  }
  
  // Set up dropdown toggle functionality
  setupDropdownBehavior();
}