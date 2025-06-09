document.addEventListener('DOMContentLoaded', () => {
  const tutor = JSON.parse(localStorage.getItem('selectedTutor') || '{}');
  if (!tutor.name) {
    document.body.innerHTML = '<p>Unable to load profile.</p>';
    return;
  }

  // Profile Header
  document.getElementById('profile-avatar').src      = tutor.image;
  document.getElementById('profile-name').textContent = tutor.name;
  document.getElementById('profile-role').textContent = 'Community Tutor';
  document.getElementById('profile-status').innerHTML = '<span class="online-dot"></span> Online';

  // Languages
  document.getElementById('profile-langs').innerHTML = 
    'Speaks: ' + tutor.speaks
      .map(lang => `<span class="lang">${lang}</span>`)
      .join(' ');

  // Tagline & Description
  document.getElementById('profile-tagline').textContent     = tutor.tagline || '';
  document.getElementById('profile-description').textContent = tutor.description;

  // Video & Lessons
  const iframe = document.getElementById('intro-video');
  iframe.src = tutor.video + '?autoplay=0';

  document.getElementById('profile-price').textContent   = tutor.price;
  document.getElementById('profile-lessons').textContent = tutor.lessons;
});