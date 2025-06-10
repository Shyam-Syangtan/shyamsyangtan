console.log("🚀 Main script loading...");

import { checkAndUpdateSession, signInWithGoogle } from './auth.js';
import { supabaseClient } from './supabaseClient.js';

// Fetch tutors from Supabase instead of using a hardcoded array
async function fetchTutors() {
  const { data, error } = await supabaseClient
    .from('tutors')
    .select('*')
    .order('created_at', { ascending: false });
      console.log("Fetched tutors:", data, "Error:", error);
    if (error) {
    console.error('❌ Error fetching tutors:', error);
    return [];
  }
  return data;
}

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

function renderTutors(tutors = []) {
  const tutorList = document.getElementById("tutor-list");
  if (!tutorList) return;
  tutorList.innerHTML = "";

  tutors.forEach(tutor => {
    const displayName = tutor.name || "Unnamed";
    const languages = tutor.languages || "";
    const description = tutor.bio || "";
    const price = tutor.price_per_hour ? `USD ${tutor.price_per_hour} / Hour` : "";
    const rating = tutor.rating || "";
    const lessons = tutor.lessons || "";
    const profileImg = tutor.profile_img || "profile.jpg";

    const card = document.createElement("div");
    card.className = "tutor-card";
    card.innerHTML = `
      <div class="tutor-avatar">
        <img src="${profileImg}" alt="${displayName}" />
      </div>
      <div class="tutor-info">
        <span class="tutor-name">${displayName}</span>
        <span class="tutor-role">Community Tutor</span>
        <div class="tutor-langs"><span>Speaks:</span> ${languages}</div>
        <div class="tutor-desc">${description}</div>
        <div class="tutor-meta">
          <span class="rating">⭐ ${rating}</span>
          <span>${lessons} Lessons</span>
          <span class="price">${price}</span>
        </div>
      </div>
    `;
    tutorList.appendChild(card);
  });
}

// Add filter/search functionality as needed

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
  // We'll fetch from the currently rendered list
  const tutorCards = document.querySelectorAll('.tutor-card');
  for (let card of tutorCards) {
    if (card.querySelector('h3').textContent === tutorName) {
      // Get the JSON from the onclick handler
      // In this setup, you should have the full tutor object already
      // Fallback: just open profile.html
      window.open("profile.html", "_blank");
      return;
    }
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  console.log("📄 DOM fully loaded");
  const session = await checkAndUpdateSession();
  console.log(session ? "🔓 User is logged in as: " + session.user.email : "🔒 No user logged in");
  const loginBtn = document.getElementById('login-btn');
  if (loginBtn) {
    loginBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      console.log('🖱️ Login button clicked');
      await signInWithGoogle();
    });
  }
  await renderTutors();
  setupVideoCardBehavior();
});

function setupVideoCardBehavior() {
  const tutorCards = document.querySelectorAll('.tutor-card');
  const videoScheduleSection = document.querySelector('.video-schedule-section');
  if (!tutorCards.length || !videoScheduleSection) return;
  for (const card of tutorCards) {
    card.addEventListener('mouseenter', () => {
      updateSidebar(card);
    });
  }
  window.addEventListener('resize', () => {
    if (isMobileDevice() && videoScheduleSection) {
      videoScheduleSection.style.display = 'none';
    }
  });
  console.log(`✅ Set up hover behavior for ${tutorCards.length} tutor cards`);
}

function isMobileDevice() {
  return window.innerWidth < 768;
}

function updateSidebar(card) {
  if (isMobileDevice()) return;
  const videoSection = document.querySelector('.video-schedule-section');
  const videoFrame = document.getElementById('intro-video');
  const videoMeta = document.querySelector('.video-meta');
  videoSection.style.display = 'block';
  const videoUrl = card.dataset.video;
  const timestamps = card.dataset.timestamps || '';
  videoFrame.src = videoUrl;
  videoMeta.innerHTML = timestamps || `<div>${card.dataset.name}'s intro video</div>`;
  const cardRect = card.getBoundingClientRect();
  const sidebarTop = cardRect.top + window.scrollY;
  videoSection.style.top = `${sidebarTop}px`;
}

console.log("📢 Main script loaded");

document.addEventListener('DOMContentLoaded', async () => {
  const tutors = await fetchTutors();
  renderTutors(tutors);
});