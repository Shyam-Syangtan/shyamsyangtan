/**
 * Configuration file for TutorConnect
 * This handles environment-specific settings for development and production
 */

console.log('🔧 Loading configuration...');

// Detect environment
const isGitHubPages = window.location.hostname.includes('github.io');

// Configuration object
window.APP_CONFIG = {
  // Environment detection
  environment: isGitHubPages ? 'github-pages' : 'production',
  
  // Supabase configuration (same for all environments)
  supabase: {
    url: 'https://jjfpqquontjrjiwnfuku.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZnBxcXVvbnRqcmppd25mdWt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NDkwNjgsImV4cCI6MjA2NTAyNTA2OH0.ek6Q4K_89KgKSwRz0G0F10O6OzFDfbciovYVjoOIrgQ'
  },
  
  // Base URL for the application
  baseUrl: (() => {
    if (isGitHubPages) {
      // For GitHub Pages, include the repository name in the path
      const pathParts = window.location.pathname.split('/').filter(part => part);
      const repoName = pathParts[0] || '';
      return `${window.location.origin}/${repoName}`;
    } else {
      return window.location.origin;
    }
  })(),
  
  // OAuth redirect URLs
  redirectUrls: {
    afterLogin: isGitHubPages ?
      `${window.location.origin}${window.location.pathname.split('/').slice(0, -1).join('/')}/find-tutors.html` :
      `${window.location.origin}/find-tutors.html`,
    afterLogout: isGitHubPages ?
      `${window.location.origin}${window.location.pathname.split('/').slice(0, -1).join('/')}/index.html` :
      `${window.location.origin}/index.html`
  }
};

console.log('✅ Configuration loaded:', window.APP_CONFIG);
console.log('🌍 Environment:', window.APP_CONFIG.environment);
console.log('🔗 Base URL:', window.APP_CONFIG.baseUrl);
