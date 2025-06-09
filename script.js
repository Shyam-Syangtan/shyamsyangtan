console.log("🚀 Main script loading...");

import { checkAndUpdateSession, signInWithGoogle } from './auth.js';

const tutors = [
  {
    name: "Shyam Syangtan",
    language: "Hindi",
    price: "$15/hr",
    rating: 5.0,
    lessons: 500,
    speaks: ["Hindi", "Nepali", "English"],
    image: "https://placehold.co/120x120",
    video: "https://www.youtube.com/embed/bElFGv0Ku40",
    description: "Certified Hindi tutor with 5 years of experience."
  },
  {
    name: "Sam",
    language: "Tamil",
    price: "$12/hr",
    rating: 4.8,
    lessons: 300,
    speaks: ["Tamil", "English"],
    image: "https://placehold.co/120x120",
    video: "https://www.youtube.com/embed/QiDij7qCCaY?si=GCwYrV713_5oWeD3",
    description: "Native Tamil tutor passionate about language and culture."
  }
];

window.tutors = tutors;

const tutorList = document.getElementById("tutor-list");
const iframe = document.getElementById("intro-video");
const modal = document.getElementById('profileModal');

function playVideo(url) {
  iframe.src = url + "?autoplay=1";
}

function openProfile(tutor) {
  localStorage.setItem("selectedTutor", JSON.stringify(tutor));
  window.open("profile.html", "_blank");
}

function renderTutors(filteredTutors = tutors) {
  if (!tutorList) return;
  tutorList.innerHTML = "";

  filteredTutors.forEach(tutor => {
    const tutorDiv = document.createElement("div");
    tutorDiv.className = "tutor-card";
    tutorDiv.onclick = () => openProfile(tutor);

    tutorDiv.innerHTML = `
      <img src="${tutor.image}" alt="${tutor.name}" class="card-img"/>
      <div class="card-content">
        <h3>${tutor.name}</h3>
        <p><strong>Language:</strong> ${tutor.language}</p>
        <p><strong>Speaks:</strong> ${tutor.speaks.join(", ")}</p>
        <p><strong>Rating:</strong> ${tutor.rating} ⭐</p>
        <p><strong>Lessons:</strong> ${tutor.lessons}</p>
        <p><strong>Rate:</strong> ${tutor.price}</p>
        <div class="card-buttons">
          <button class="btn" onclick="event.stopPropagation(); playVideo('${tutor.video}')">🎥 Watch Intro</button>
          <button class="btn" onclick="event.stopPropagation(); openInNewTab('${tutor.name}')">Profile Details</button>
          <button class="btn">Book lesson</button>
        </div>
      </div>
    `;
    tutorList.appendChild(tutorDiv);
  });
}

function filterTutors() {
  const query = document.getElementById("search-input").value.toLowerCase();
  const results = tutors.filter(t => t.name.toLowerCase().includes(query) || t.language.toLowerCase().includes(query));
  renderTutors(results);
}

function openProfileModal() {
  if (modal) {
    modal.style.display = 'block';
  }
}

function closeProfileModal() {
  if (modal) {
    modal.style.display = 'none';
  }
}

window.onclick = function(event) {
  if (event.target === modal) {
    closeProfileModal();
  }
};

function openInNewTab(tutorName) {
  const tutor = tutors.find(t => t.name === tutorName);
  if (!tutor) return;
  localStorage.setItem("selectedTutor", JSON.stringify(tutor));
  window.open("profile.html", "_blank");
}

const tutorCards = document.querySelectorAll('.tutor-card');
const videoScheduleSection = document.querySelector('.video-schedule-section');
const introVideo = document.getElementById('intro-video');

// Function to check if the device is mobile
function isMobileDevice() {
  return window.innerWidth < 768; // Consider devices with width < 768px as mobile
}

// Update sidebar function - now with mobile check
function updateSidebar(card) {
  // Skip showing video on mobile devices
  if (isMobileDevice()) {
    console.log('📱 Mobile device detected, skipping video display');
    return; // Don't show video/schedule on mobile
  }

  const videoSection = document.querySelector('.video-schedule-section');
  const videoFrame = document.getElementById('intro-video');
  const videoMeta = document.querySelector('.video-meta');
  
  // Make video section visible if it was hidden
  videoSection.style.display = 'block';
  
  // Get video URL from card's data attribute
  const videoUrl = card.dataset.video;
  // Get timestamps if available
  const timestamps = card.dataset.timestamps || '';
  
  // Update video source
  videoFrame.src = videoUrl;
  
  // Update metadata
  videoMeta.innerHTML = timestamps || `<div>${card.dataset.name}'s intro video</div>`;
  
  // Position the video section next to the hovered card
  const cardRect = card.getBoundingClientRect();
  const sidebarTop = cardRect.top + window.scrollY;
  videoSection.style.top = `${sidebarTop}px`;
}

// Add window resize listener to handle orientation changes
window.addEventListener('resize', function() {
  const videoSection = document.querySelector('.video-schedule-section');
  
  // On mobile, hide the video section
  if (isMobileDevice()) {
    videoSection.style.display = 'none';
  }
});

for (const card of tutorCards) {
  card.addEventListener('mouseenter', () => updateSidebar(card));
}

// 🔐 Supabase Auth Integration for Navbar with Profile Creation
document.addEventListener('DOMContentLoaded', async () => {
  console.log("📄 DOM fully loaded");
  
  // IMPORTANT: Check for session and update UI immediately
  const session = await checkAndUpdateSession();
  console.log(session ? "🔓 User is logged in as: " + session.user.email : "🔒 No user logged in");
  
  // Setup login button click handler
  const loginBtn = document.getElementById('login-btn');
  if (loginBtn) {
    loginBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      console.log('🖱️ Login button clicked');
      await signInWithGoogle();
    });
  }
  
  // Initialize rest of your application
  renderTutors();
  setupVideoCardBehavior();
});

// Set up video card behavior
function setupVideoCardBehavior() {
  const tutorCards = document.querySelectorAll('.tutor-card');
  const videoScheduleSection = document.querySelector('.video-schedule-section');
  
  if (!tutorCards.length || !videoScheduleSection) {
    console.log('⚠️ Tutor cards or video section not found');
    return;
  }
  
  for (const card of tutorCards) {
    card.addEventListener('mouseenter', () => {
      updateSidebar(card);
    });
  }
  
  // Handle window resize event
  window.addEventListener('resize', () => {
    if (isMobileDevice() && videoScheduleSection) {
      videoScheduleSection.style.display = 'none';
    }
  });
  
  console.log(`✅ Set up hover behavior for ${tutorCards.length} tutor cards`);
}

renderTutors();

console.log("📢 Main script loaded");