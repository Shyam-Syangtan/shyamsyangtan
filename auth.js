/**
 * Authentication utilities for Supabase
 * Handles login, session management, and UI updates
 * Uses the globally available window.supabaseClient
 */

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
        const { data, error } = await window.supabaseClient.auth.getSessionFromUrl();
        
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
    const { data: { session }, error } = await window.supabaseClient.auth.getSession();
    
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
  
  // Update all "My Profile" links with user ID
  updateProfileLink(session);
  
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
    const { data, error } = await window.supabaseClient.auth.signInWithOAuth({
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
    const { error } = await window.supabaseClient.auth.signOut();
    
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
    // Create profile data structure matching the profiles table schema
    const profileData = {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name || user.email.split('@')[0],
      avatar_url: user.user_metadata?.avatar_url || null,
      created_at: new Date().toISOString()
    };
    
    // Use upsert to create or update the profile
    console.log('🔄 Creating or updating profile with upsert');
    
    const { error } = await window.supabaseClient
      .from('profiles')
      .upsert([profileData]);
    
    if (error) {
      console.error('❌ Error upserting profile:', error);
    } else {
      console.log('✅ Profile upsert successful');
    }
  } catch (err) {
    console.error('❌ Exception during profile creation:', err);
  }
}

// Function to update the "My Profile" link
function updateProfileLink(session) {
  const myProfileLink = document.getElementById('my-profile-link');
  if (myProfileLink && session && session.user && session.user.id) {
    myProfileLink.href = `profile.html?id=${session.user.id}`;
    console.log("Profile link updated:", myProfileLink.href);
  } else {
    console.warn("⚠️ No user ID available to update profile links");
  }
}

// Make sure this runs on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log("Checking for session on page load");
  window.supabaseClient.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      console.log("Session found on page load");
      updateProfileLink(session);
    } else {
      console.log("No session found on page load");
    }
  });
});

// Also run when auth state changes
window.supabaseClient.auth.onAuthStateChange((event, session) => {
  console.log("Auth state changed:", event);
  if (session) {
    updateProfileLink(session);
  }
});

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

// Make authentication functions available globally
window.checkAndUpdateSession = checkAndUpdateSession;
window.signInWithGoogle = signInWithGoogle;
window.signOut = signOut;
window.updateProfileLink = updateProfileLink;

console.log('✅ Auth module loaded and functions exposed globally');

