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

function updateSidebar(card) {
  const videoUrl = card.getAttribute('data-video');
  const videoMeta = videoScheduleSection.querySelector('.video-meta');
  introVideo.src = videoUrl;
  videoMeta.innerHTML = '';
  const cardRect = card.getBoundingClientRect();
  const sidebarTop = cardRect.top + window.scrollY;
  videoScheduleSection.style.position = 'absolute';
  videoScheduleSection.style.top = `${sidebarTop}px`;
}

for (const card of tutorCards) {
  card.addEventListener('mouseenter', () => updateSidebar(card));
}

renderTutors();

// 🔐 Supabase Auth Integration for Navbar
const sb = supabase.createClient(
  'https://jjfpqquontjrjiwnfuku.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZnBxcXVvbnRqcmppd25mdWt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NDkwNjgsImV4cCI6MjA2NTAyNTA2OH0.ek6Q4K_89KgKSwRz0G0F10O6OzFDfbciovYVjoOIrgQ'
);

async function checkSession() {
  const { data: { session } } = await sb.auth.getSession();
  const loginBtn = document.getElementById("login-btn");
  const userContainer = document.getElementById("user-initial-container");
  const userInitial = document.getElementById("user-initial");

  if (session && session.user) {
    const email = session.user.email || '';
    const initial = email.charAt(0).toUpperCase();
    userInitial.textContent = initial;

    if (loginBtn) loginBtn.classList.add("hidden");
    if (userContainer) userContainer.classList.remove("hidden");
  }
}

document.getElementById("user-initial-container")?.addEventListener("click", () => {
  document.getElementById("user-dropdown")?.classList.toggle("hidden");
});

document.getElementById("logout-btn")?.addEventListener("click", async () => {
  await sb.auth.signOut();
  window.location.href = "login.html";
});

checkSession();
