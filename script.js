// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = document.querySelectorAll('main > section[id]');

function scrollToSection(event) {
  event.preventDefault();
  const targetId = this.getAttribute('href');
  const targetSection = document.querySelector(targetId);
  if (!targetSection) return;
  const targetName = targetId.replace('#', '');
  updateActiveLink(targetName);
  targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  closeMobileMenu();
}

navLinks.forEach(link => {
  link.addEventListener('click', scrollToSection);
});

// Highlight the currently visible section link
function updateActiveLink(activeId) {
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
  });
}

const observer = new IntersectionObserver(entries => {
  let highestRatio = 0;
  let currentId = null;

  entries.forEach(entry => {
    if (entry.intersectionRatio > highestRatio) {
      highestRatio = entry.intersectionRatio;
      currentId = entry.target.id;
    }
  });

  if (currentId) {
    updateActiveLink(currentId);
  }
}, {
  rootMargin: '-30% 0px -50% 0px',
  threshold: [0.1, 0.25, 0.5, 0.75],
});

sections.forEach(section => observer.observe(section));

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-links');

function closeMobileMenu() {
  navMenu.classList.remove('active');
  hamburger.classList.remove('active');
}

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Close mobile menu on nav item click
navLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Contact form submission feedback
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

if (contactForm && successMessage) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    successMessage.textContent = 'Thank you for your message — I’ll get back to you soon.';
    contactForm.reset();
    setTimeout(() => {
      successMessage.textContent = '';
    }, 5000);
  });
}
