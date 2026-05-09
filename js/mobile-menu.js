// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileClose = document.querySelector('.mobile-close');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      if (mobileNav) {
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }
  
  if (mobileClose) {
    mobileClose.addEventListener('click', function() {
      if (mobileNav) {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  // Close mobile menu when clicking on a link
  if (mobileNav) {
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
  
  // Close mobile menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // Add touch-friendly class to body
  if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
  }
  
});
