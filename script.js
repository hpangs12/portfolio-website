// script.js
// JavaScript for Portfolio Website Interactivity

// Toast notification helper
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: ${type === "error" ? "#f44336" : type === "success" ? "#4CAF50" : "#2196F3"};
    color: white;
    padding: 16px 24px;
    border-radius: 4px;
    font-size: 14px;
    z-index: 10000;
    max-width: 300px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  `;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

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
  
  // Show instant success message
  const submitBtn = contactForm.querySelector("button[type='submit']");
  const originalBtnText = submitBtn.textContent;
  submitBtn.textContent = "✓ Message sent!";
  submitBtn.style.backgroundColor = "#4CAF50";
  submitBtn.disabled = true;
  
  // Reset form immediately
  const formData = new FormData(contactForm);
  const payload = Object.fromEntries(formData.entries());
  contactForm.reset();
  
  // Close modal after short delay
  setTimeout(() => {
    modal.style.display = "none";
    // Reset button for next use
    submitBtn.textContent = originalBtnText;
    submitBtn.style.backgroundColor = "";
    submitBtn.disabled = false;
  }, 1500);
  
  // Send to backend and wait for response
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const res = await fetch(
      "https://portfolio-backend-xx9p.onrender.com/api/contact",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      }
    );
    clearTimeout(timeoutId);
    
    const json = await res.json();
    if (res.ok && json.ok) {
      console.log("Message successfully sent:", json);
    } else {
      showToast("⚠️ Couldn't deliver message. Try again later.", "error");
      console.error("Backend error:", json);
    }
  } catch (err) {
    if (err.name === "AbortError") {
      showToast("⚠️ Request timeout. Please try again.", "error");
    } else {
      showToast("⚠️ Network error. Please try again later.", "error");
    }
    console.error("Network error:", err);
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
