// script.js
// JavaScript for Portfolio Website Interactivity

// Modal functionality for Contact Form

// Get modal elements
const modal = document.getElementById("contact-modal");
const getInTouchBtn = document.querySelector("#get-in-touch-btn");
const closeBtn = document.querySelector(".close");
const contactForm = document.querySelector("#contact-modal form");

// Open modal when clicking "Get In Touch"
getInTouchBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// Close modal when clicking (X)
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Handle form submission
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // contactForm is already defined above; convert its FormData to a plain object
  const formData = new FormData(contactForm);
  const payload = Object.fromEntries(formData.entries());
  try {
    const res = await fetch(
      "https://portfolio-backend-xx9p.onrender.com/api/contact",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const json = await res.json();
    if (res.ok && json.ok) {
      alert("Message sent — thank you.");
      contactForm.reset();
      modal.style.display = "none";
      console.log("Server response:", json);
    } else {
      console.error("Server response:", json);
      alert("Failed to send. Try again later.");
    }
  } catch (err) {
    console.error(err);
    alert("Network error — try again later.");
  }
});

// CV Section Functionality

// CV Section Elements
const cvButton = document.getElementById("view-cv-btn");
const closeCVButton = document.getElementById("close-cv-btn");
let cvSection;

// CV Button Event Listeners
closeCVButton.addEventListener("click", hideCV);

// Show CV Section
function showCV() 
{
    // Hide other sections or elements
    const otherSections = document.querySelectorAll("section, h2");
    otherSections.forEach(section => {
        if (section.id === "mobile-nav") {
            return;
        }
        section.style.display = "none";
    });

    cvSection = document.getElementById("cv-section");
    cvSection.style.display = "block";
    cvSection.scrollIntoView({ behavior: "smooth" });
    cvSection.zIndex = "1000";
};

// Hide CV Section
function hideCV() {
    // show other sections or elements
    const otherSections = document.querySelectorAll("section, h2");
    otherSections.forEach(section => {
        if (section.id === "contact-modal") {
            section.style.display = "none";
            return;
        }else if (section.id === "project-section") {
            section.style.display = "grid";
            return;
        }else if (section.id === "mobile-nav") {
            return;
        }
        section.style.display = "block";
    });

    cvSection = document.getElementById("cv-section");
    cvSection.style.display = "none";
    cvSection.zIndex = "-1";

    
};
