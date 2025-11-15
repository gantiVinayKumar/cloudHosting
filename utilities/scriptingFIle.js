function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields before sending your message.");
    return false;
  }

  alert("Message sent successfully! (Demo only)");
  document.getElementById("contactForm").reset();
  return false; // prevent actual form submission for demo
}
function getGreetingMessage() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Good Morning";
  } else if (hour >= 12 && hour < 17) {
    return "Good Afternoon";
  } else if (hour >= 17 && hour < 21) {
    return "Good Evening";
  } else {
    return "Good Night";
  }
}
const greeting = getGreetingMessage();
 document.addEventListener("DOMContentLoaded", function () {
  let greeting = getGreetingMessage();   // dynamic here
  new Typed(".typed-greeting", {
    strings: [greeting],
    typeSpeed: 100,
    backSpeed: 50,
    loop: false
  });
  new Typed(".typed-name", {
    strings: ["Ganti Vinay Kumar"],
    typeSpeed: 100,
    backSpeed: 50,
    loop: true
  });
});

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  hamburger.addEventListener("click", () => {
    navMenu.style.display =
      navMenu.style.display === "block" ? "none" : "block";
  });

  // Dropdown toggle
  const dropdown = document.querySelector(".dropdown");
  const dropdownBtn = document.querySelector(".dropdown-btn");

  dropdownBtn.addEventListener("click", (e) => {
    e.stopPropagation(); 
    dropdown.classList.toggle("open");
  });

  // Close when clicking outside
  document.addEventListener("click", () => {
    dropdown.classList.remove("open");
  });



