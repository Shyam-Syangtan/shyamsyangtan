/**
 * BULLETPROOF AUTHENTICATION SYSTEM
 * Fixed Google OAuth and session management
 */

console.log('🔧 Loading auth.js...');

// Global auth state
let isAuthReady = false;
let currentSession = null;

/**
 * Wait for Supabase client to be ready
 */
async function waitForSupabase() {
  let attempts = 0;
  const maxAttempts = 20;

  while (!window.supabaseClient && attempts < maxAttempts) {
    console.log(`⏳ Waiting for Supabase client... (${attempts + 1}/${maxAttempts})`);
    await new Promise(resolve => setTimeout(resolve, 500));
    attempts++;
  }

  if (!window.supabaseClient) {
    throw new Error('Supabase client not available after timeout');
  }

  console.log('✅ Supabase client ready');
  return window.supabaseClient;
}

/**
 * Check for active session and update UI - ENHANCED VERSION
 */
async function checkAndUpdateSession() {
  console.log('🔍 Checking for active session...');

  try {
    await waitForSupabase();

    // Try multiple approaches to get session
    let session = null;
    let error = null;

    // First attempt: getSession
    const sessionResult = await window.supabaseClient.auth.getSession();
    session = sessionResult.data?.session;
    error = sessionResult.error;

    if (error) {
      console.error('❌ Error fetching session:', error.message);

      // Try to refresh session if there's an error
      console.log('🔄 Attempting to refresh session...');
      try {
        const refreshResult = await window.supabaseClient.auth.refreshSession();

        if (refreshResult.data?.session) {
          session = refreshResult.data.session;
          error = null;
          console.log('✅ Session refreshed successfully');
        } else if (refreshResult.error) {
          console.warn('⚠️ Session refresh failed:', refreshResult.error.message);
        }
      } catch (refreshError) {
        console.warn('⚠️ Session refresh exception:', refreshError);
      }
    }

    if (session && session.user) {
      console.log('✅ Session found for:', session.user.email);
      currentSession = session;

      // Store session info in localStorage for persistence
      try {
        localStorage.setItem('supabase_session_user', JSON.stringify({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
          timestamp: Date.now()
        }));
      } catch (storageError) {
        console.warn('⚠️ Could not store session info:', storageError);
      }

      updateUIWithUserSession(session);
      return session;
    } else {
      console.log('ℹ️ No active session found, checking localStorage...');

      // Check if we have recent session data in localStorage
      try {
        const storedUser = localStorage.getItem('supabase_session_user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          const timeDiff = Date.now() - (userData.timestamp || 0);

          // If stored session is less than 5 minutes old, use it temporarily
          if (timeDiff < 300000) { // 5 minutes
            console.log('📦 Using stored session data temporarily for:', userData.email);
            updateUIWithUserSession({
              user: {
                id: userData.id,
                email: userData.email,
                user_metadata: { full_name: userData.name }
              }
            });

            // Try to refresh the session in the background
            setTimeout(async () => {
              try {
                const { data: { session: refreshedSession } } = await window.supabaseClient.auth.refreshSession();
                if (refreshedSession) {
                  console.log('✅ Session refreshed in background');
                  currentSession = refreshedSession;
                  updateUIWithUserSession(refreshedSession);
                }
              } catch (refreshError) {
                console.warn('⚠️ Background session refresh failed:', refreshError);
              }
            }, 1000);

            return null; // Return null but don't log out UI
          }
        }
      } catch (storageError) {
        console.warn('⚠️ Error reading stored session:', storageError);
      }

      currentSession = null;
      // Clear stored session info
      try {
        localStorage.removeItem('supabase_session_user');
      } catch (storageError) {
        console.warn('⚠️ Could not clear session info:', storageError);
      }

      updateUIForLoggedOutState();
      return null;
    }
  } catch (err) {
    console.error('❌ Error checking session:', err);
    updateUIForLoggedOutState();
    return null;
  }
}

/**
 * Update UI for logged-in user
 */
function updateUIWithUserSession(session) {
  if (!session || !session.user) {
    console.warn('⚠️ Invalid session');
    return;
  }

  const loginBtn = document.getElementById('login-btn');
  const userInitialContainer = document.getElementById('user-initial-container');
  const userInitial = document.getElementById('user-initial');

  const user = session.user;
  const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  const initial = name.charAt(0).toUpperCase();

  // Show/hide UI elements
  if (loginBtn) {
    loginBtn.style.display = 'none';
    loginBtn.classList.add('hidden');
  }
  if (userInitialContainer) {
    userInitialContainer.style.display = 'block';
    userInitialContainer.classList.remove('hidden');
  }
  if (userInitial) {
    userInitial.textContent = initial;
  }

  console.log('✅ UI updated for user:', name);

  // Update profile links
  updateProfileLinks(session);
  setupDropdown();
}

/**
 * Update UI for logged-out state
 */
function updateUIForLoggedOutState() {
  const loginBtn = document.getElementById('login-btn');
  const userInitialContainer = document.getElementById('user-initial-container');

  if (loginBtn) {
    loginBtn.style.display = 'block';
    loginBtn.classList.remove('hidden');
  }
  if (userInitialContainer) {
    userInitialContainer.style.display = 'none';
    userInitialContainer.classList.add('hidden');
  }

  console.log('✅ UI updated for logged-out state');
}

/**
 * Update profile links
 */
function updateProfileLinks(session) {
  if (!session?.user?.id) return;

  const profileLinks = document.querySelectorAll('#my-profile-link, #profile-link');
  profileLinks.forEach(link => {
    if (link) {
      link.href = `profile.html?id=${session.user.id}`;
    }
  });
}

/**
 * Set up user dropdown functionality
 */
function setupDropdown() {
  const userInitialContainer = document.getElementById('user-initial-container');
  const userDropdown = document.getElementById('user-dropdown');
  const logoutBtn = document.getElementById('logout-btn');
  const profileLink = document.getElementById('my-profile-link');

  if (!userInitialContainer || !userDropdown) {
    console.warn('⚠️ Dropdown elements not found');
    return;
  }

  console.log('🔧 Setting up dropdown functionality');

  // Toggle dropdown on click
  userInitialContainer.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('🔽 User initial clicked, toggling dropdown');

    const isHidden = userDropdown.classList.contains('hidden');
    if (isHidden) {
      userDropdown.classList.remove('hidden');
      userDropdown.style.display = 'block';
      userInitialContainer.classList.add('active');
    } else {
      userDropdown.classList.add('hidden');
      userDropdown.style.display = 'none';
      userInitialContainer.classList.remove('active');
    }
  });

  // Close dropdown when clicking elsewhere
  document.addEventListener('click', (e) => {
    if (!userInitialContainer.contains(e.target)) {
      userDropdown.classList.add('hidden');
      userDropdown.style.display = 'none';
      userInitialContainer.classList.remove('active');
    }
  });

  // Set up logout button
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      console.log('🚪 Logout clicked');
      await signOut();
    });
  }

  // Set up profile link
  if (profileLink) {
    profileLink.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('👤 Profile clicked');
      // Close dropdown first
      userDropdown.classList.add('hidden');
      userDropdown.style.display = 'none';
      userInitialContainer.classList.remove('active');

      // Navigate to profile with auto-trigger parameter
      window.location.href = 'profile.html?auto=true';
    });
  }

  console.log('✅ Dropdown setup complete');
}

/**
 * Sign in with Google - FIXED VERSION
 */
async function signInWithGoogle() {
  console.log('🚀 Starting Google Sign-In...');

  try {
    await waitForSupabase();

    console.log('🔗 Initiating Google OAuth...');

    const { error } = await window.supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/index.html`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    });

    if (error) {
      console.error('❌ Google sign-in error:', error);
      throw error;
    }

    console.log('✅ Google OAuth initiated successfully');
    // User will be redirected to Google, then back to our app
    return true;

  } catch (err) {
    console.error('❌ Exception during Google sign-in:', err);

    // Show user-friendly error message
    let errorMessage = 'Sign-in failed. ';
    if (err.message.includes('Invalid login credentials')) {
      errorMessage += 'Please check your Google account credentials.';
    } else if (err.message.includes('Email not confirmed')) {
      errorMessage += 'Please confirm your email address.';
    } else {
      errorMessage += err.message;
    }

    alert(errorMessage);
    return false;
  }
}

/**
 * Sign out user
 */
async function signOut() {
  console.log('🚪 Signing out...');

  try {
    const { error } = await window.supabaseClient.auth.signOut();

    if (error) {
      console.error('❌ Sign-out error:', error);
      return false;
    }

    console.log('✅ Signed out successfully');
    updateUIForLoggedOutState();
    window.location.href = 'index.html';
    return true;
  } catch (err) {
    console.error('❌ Exception during sign-out:', err);
    return false;
  }
}

/**
 * Create user profile in database
 */
async function createUserProfile(user) {
  if (!user?.id) {
    console.warn('⚠️ Invalid user for profile creation');
    return;
  }

  console.log('👤 Creating profile for:', user.email);

  try {
    const profileData = {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
      avatar_url: user.user_metadata?.avatar_url || null,
      role: 'learner'
    };

    console.log('📝 Attempting to create profile with data:', profileData);

    // First check if profile already exists
    const { data: existingProfile, error: checkError } = await window.supabaseClient
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('❌ Error checking existing profile:', checkError);
      return;
    }

    if (existingProfile) {
      console.log('✅ Profile already exists, skipping creation');
      return;
    }

    // Create new profile
    const { data, error } = await window.supabaseClient
      .from('profiles')
      .insert([profileData])
      .select();

    if (error) {
      console.error('❌ Profile creation error:', error);
      console.error('❌ Error details:', JSON.stringify(error, null, 2));
    } else {
      console.log('✅ Profile created successfully:', data);
    }
  } catch (err) {
    console.error('❌ Profile creation exception:', err);
    console.error('❌ Exception stack:', err.stack);
  }
}

/**
 * Initialize authentication system - FIXED VERSION
 */
async function initAuth() {
  console.log('🔧 Initializing auth system...');

  try {
    await waitForSupabase();

    // Set up auth state change listener
    window.supabaseClient.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 Auth state changed:', event);

      if (event === 'SIGNED_IN' && session) {
        console.log('✅ User signed in:', session.user.email);
        currentSession = session;
        await createUserProfile(session.user);
        updateUIWithUserSession(session);

        // Handle redirect after login
        const redirectUrl = localStorage.getItem('redirect_after_login');
        if (redirectUrl) {
          console.log('🔄 Redirecting to stored URL from SIGNED_IN event:', redirectUrl);
          localStorage.removeItem('redirect_after_login');
          window.location.href = redirectUrl;
        } else if (window.location.pathname === '/index.html') {
          console.log('🔄 No stored redirect, redirecting to find-tutors.html after login');
          window.location.href = 'find-tutors.html';
        }
      } else if (event === 'SIGNED_OUT') {
        console.log('✅ User signed out');
        currentSession = null;
        updateUIForLoggedOutState();
      } else if (event === 'TOKEN_REFRESHED' && session) {
        console.log('🔄 Token refreshed');
        currentSession = session;
      }
    });

    // Check for existing session
    await checkAndUpdateSession();

    // Handle redirect after OAuth login (when user comes back from Google)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('access_token') || urlParams.has('code')) {
      console.log('🔄 OAuth callback detected, checking for redirect...');

      // Wait a bit for session to be established
      setTimeout(() => {
        const redirectUrl = localStorage.getItem('redirect_after_login');
        if (redirectUrl && currentSession) {
          console.log('🔄 Redirecting to stored URL after OAuth:', redirectUrl);
          localStorage.removeItem('redirect_after_login');
          window.location.href = redirectUrl;
        } else if (currentSession) {
          console.log('🔄 No stored redirect, redirecting to find-tutors.html after OAuth');
          window.location.href = 'find-tutors.html';
        }
      }, 1000);
    }

    // Add page visibility listener to refresh session when user returns
    document.addEventListener('visibilitychange', async () => {
      if (!document.hidden && isAuthReady) {
        console.log('👁️ Page became visible, checking session...');
        await checkAndUpdateSession();
      }
    });

    // Add focus listener as backup
    window.addEventListener('focus', async () => {
      if (isAuthReady) {
        console.log('🎯 Window focused, checking session...');
        setTimeout(async () => {
          await checkAndUpdateSession();
        }, 500); // Small delay to avoid rapid calls
      }
    });

    isAuthReady = true;
    console.log('✅ Auth system initialized successfully');

  } catch (error) {
    console.error('❌ Failed to initialize auth system:', error);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  console.log('🚀 DOM loaded, initializing auth...');

  try {
    await initAuth();
  } catch (error) {
    console.error('❌ Auth initialization failed:', error);

    // Retry once after a delay
    setTimeout(async () => {
      console.log('🔄 Retrying auth initialization...');
      try {
        await initAuth();
      } catch (retryError) {
        console.error('❌ Auth initialization failed on retry:', retryError);
      }
    }, 2000);
  }
});

// Make functions globally available
window.checkAndUpdateSession = checkAndUpdateSession;
window.signInWithGoogle = signInWithGoogle;
window.signOut = signOut;
window.waitForSupabase = waitForSupabase;

console.log('✅ Auth module loaded');

