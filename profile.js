document.addEventListener('DOMContentLoaded', () => {
  // First load the tutor data
  const tutor = JSON.parse(localStorage.getItem('selectedTutor') || '{}');
  if (!tutor.name) {
    document.body.innerHTML = '<p>Unable to load profile.</p>';
    return;
  }

  // Profile Header
  document.getElementById('profile-avatar').src = tutor.image;
  document.getElementById('profile-name').textContent = tutor.name;
  document.getElementById('profile-role').textContent = 'Community Tutor';
  document.getElementById('profile-status').innerHTML = '<span class="online-dot"></span> Online';

  // Languages
  document.getElementById('profile-langs').innerHTML = 
    'Speaks: ' + tutor.speaks
      .map(lang => `<span class="lang">${lang}</span>`)
      .join(' ');

  // Tagline & Description
  document.getElementById('profile-tagline').textContent = tutor.tagline || '';
  document.getElementById('profile-description').textContent = tutor.description;

  // Video & Lessons
  const iframe = document.getElementById('intro-video');
  iframe.src = tutor.video + '?autoplay=0';

  document.getElementById('profile-price').textContent = tutor.price;
  document.getElementById('profile-lessons').textContent = tutor.lessons;

  // AFTER populating content, make the cards clickable
  makeProfileCardsClickable();
});

/**
 * Makes all profile cards clickable
 * This is separate so it can be called after content is loaded
 */
function makeProfileCardsClickable() {
  console.log('Making profile cards clickable...');
  const profileCards = document.querySelectorAll('.profile-card');
  console.log(`Found ${profileCards.length} profile cards`);
  
  profileCards.forEach((card, index) => {
    // Get profile ID or use index as fallback
    const profileId = card.dataset.profileId || index.toString();
    const profileUrl = card.dataset.profileUrl || `profile.html?id=${profileId}`;
    
    // Add visual indicator that the card is clickable
    card.classList.add('clickable');
    console.log(`Made card ${index} clickable, linking to: ${profileUrl}`);
    
    // Remove any existing click listeners to avoid duplicates
    card.removeEventListener('click', cardClickHandler);
    
    // Add click event handler to the entire card
    card.addEventListener('click', cardClickHandler);
    
    // Store the URL as a data attribute for the click handler to use
    card.dataset.profileUrl = profileUrl;
    
    // Add keyboard accessibility
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'link');
    card.setAttribute('aria-label', `View profile details for ${card.querySelector('.profile-name')?.textContent || 'this tutor'}`);
    
    // Handle keyboard navigation
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        window.location.href = profileUrl;
        e.preventDefault();
      }
    });
    
    // Add a visual effect to indicate the card is clickable
    if (!card.querySelector('.click-indicator')) {
      const indicator = document.createElement('div');
      indicator.className = 'click-indicator';
      indicator.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>';
      card.appendChild(indicator);
    }
  });
}

/**
 * Click event handler for profile cards
 * Extracted as a named function to allow for removal of event listeners
 */
function cardClickHandler(e) {
  // Only navigate if NOT clicking on an interactive element
  const isInteractive = e.target.closest('a, button, .profile-tab, .language-tab, input, select, textarea');
  
  console.log('Card clicked!', {
    isInteractive,
    target: e.target,
    currentTarget: this
  });
  
  if (!isInteractive) {
    const profileUrl = this.dataset.profileUrl;
    console.log(`Navigating to: ${profileUrl}`);
    window.location.href = profileUrl;
  }
}

// Add the necessary CSS for the click indicator
document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('profile-card-styles')) {
    const style = document.createElement('style');
    style.id = 'profile-card-styles';
    style.innerHTML = `
      .profile-card {
        position: relative;
        cursor: pointer;
      }
      
      .profile-card.clickable:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      
      .click-indicator {
        position: absolute;
        top: 1rem;
        right: 1rem;
        color: var(--primary-color, #ff4f4f);
        opacity: 0;
        transition: opacity 0.2s ease;
      }
      
      .profile-card:hover .click-indicator {
        opacity: 0.7;
      }
    `;
    document.head.appendChild(style);
  }
});