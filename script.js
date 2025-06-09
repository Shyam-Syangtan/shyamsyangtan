console.log("Script loaded successfully");

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

// Expose tutors globally for static markup interaction
window.tutors = tutors;

const tutorList = document.getElementById("tutor-list");
const iframe = document.getElementById("intro-video");

// Global modal variables and functions
const modal = document.getElementById('profileModal');

function playVideo(url) {
  iframe.src = url + "?autoplay=1";
}

function openProfile(tutor) {
  // Remove the special case for Shyam - all tutors should open in new tab
  localStorage.setItem("selectedTutor", JSON.stringify(tutor));
  window.open("profile.html", "_blank");
}

function renderTutors(filteredTutors = tutors) {
  tutorList.innerHTML = "";

  filteredTutors.forEach(tutor => {
    const tutorDiv = document.createElement("div");
    tutorDiv.className = "tutor-card";

    // click still opens on click
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

// Simple modal functions
function openProfileModal() {
  console.log("Opening modal");
  if (modal) {
    modal.style.display = 'block';
  } else {
    console.error("Modal element not found!");
  }
}

function closeProfileModal() {
  console.log("Closing modal");
  if (modal) {
    modal.style.display = 'none';
  }
}

// Make sure this click listener is defined only once
window.onclick = function(event) {
  if (event.target === modal) {
    closeProfileModal();
  }
};

// Add this function to your script.js

function openInNewTab(tutorName) {
  const tutor = tutors.find(t => t.name === tutorName);
  if (!tutor) {
    console.error("Tutor not found:", tutorName);
    return;
  }
  localStorage.setItem("selectedTutor", JSON.stringify(tutor));
  window.open("profile.html", "_blank");
}

// Add hover interaction to dynamically update the sidebar content and position
const tutorCards = document.querySelectorAll('.tutor-card');
const videoScheduleSection = document.querySelector('.video-schedule-section');
const introVideo = document.getElementById('intro-video');

// Function to update sidebar content and position
function updateSidebar(card) {
  const videoUrl = card.getAttribute('data-video');
  const timestamps = card.getAttribute('data-timestamps');

  // Update video source
  introVideo.src = videoUrl;

  // Update timestamps
  const videoMeta = videoScheduleSection.querySelector('.video-meta');
  videoMeta.innerHTML = ''; // Clear the content to remove 'Time Stamps' and any placeholder text

  // Align sidebar with the hovered card
  const cardRect = card.getBoundingClientRect();
  const sidebarTop = cardRect.top + window.scrollY;
  videoScheduleSection.style.position = 'absolute';
  videoScheduleSection.style.top = `${sidebarTop}px`;
}

// Add event listeners to tutor cards
for (const card of tutorCards) {
  card.addEventListener('mouseenter', () => updateSidebar(card));
}

renderTutors();
