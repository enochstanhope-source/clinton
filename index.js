// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav if open
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && navLinks.classList.contains('show')) navLinks.classList.remove('show');
    });
});

// Navbar scroll effect (toggle .scrolled for CSS-driven styles)
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// No image slider: hero shows a single static image (goodfold1.jpg)

// Form submission handling with inline status (no alert)
const enrollmentForm = document.getElementById('enrollmentForm');
if (enrollmentForm) {
    const statusEl = document.getElementById('formStatus');
    enrollmentForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;

        const formData = new FormData(this);
        const payload = {};
        formData.forEach((v, k) => (payload[k] = v));
        console.log('Form payload:', payload);

        // Simulate async submit
        setTimeout(() => {
            if (statusEl) statusEl.textContent = 'Application received — we will contact you soon.';
            this.reset();
            if (submitBtn) submitBtn.disabled = false;
        }, 700);
    });
}

// Intersection Observer for fade-in animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Add necessary style for fade-in
const styleTag = document.createElement('style');
styleTag.textContent = `.fade-in{opacity:1 !important;transform:translateY(0) !important}`;
document.head.appendChild(styleTag);

// No image slider functionality here; hero uses a single static image

// Mobile navigation functionality
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
let isAnimating = false;

function toggleMobileNav() {
    if (isAnimating) return;
    
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isExpanded));
    
    if (!isExpanded) {
        // Opening the menu
        navLinks.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
        // Closing the menu
        closeMobileNav();
    }
}

function closeMobileNav() {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove('show');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = ''; // Restore scrolling
}

// Add event listeners for mobile navigation
if (navToggle && navLinks) {
    navToggle.addEventListener('click', toggleMobileNav);
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const isClickInsideNav = navLinks.contains(e.target);
        const isClickOnToggle = navToggle.contains(e.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('show')) {
            closeMobileNav();
        }
    });
}

// Close mobile nav on resize if window becomes larger than mobile breakpoint
window.addEventListener('resize', () => {
    if (window.innerWidth > 700) {
        closeMobileNav();
    }
});

// Testimonial slider controls
const track = document.querySelector('.slider-track');
const prevBtn = document.querySelector('.slider-nav.prev');
const nextBtn = document.querySelector('.slider-nav.next');
if (track && prevBtn && nextBtn) {
    let index = 0;
    const items = track.children;
    const total = items.length;

    const update = () => {
        const width = items[0].getBoundingClientRect().width + parseFloat(getComputedStyle(items[0]).marginRight || 0);
        track.style.transform = `translateX(${-(index * width)}px)`;
    };

    nextBtn.addEventListener('click', () => {
        index = (index + 1) % total;
        update();
    });
    prevBtn.addEventListener('click', () => {
        index = (index - 1 + total) % total;
        update();
    });

    // handle resize
    window.addEventListener('resize', update);
    // init
    setTimeout(update, 50);
}

// Inline hero image slideshow (crossfade between two images)
/* (function() {
    const heroImg = document.querySelector('.hero-inline-img');
    if (!heroImg) return;

    const imgs = [
        'images/goodfold1.jpg',
        'images/altimage.jpg'
    ];
    let idx = 0;
    const crossfade = (nextIdx) => {
        // fade out
        heroImg.classList.add('is-fading');
        setTimeout(() => {
            // swap src while hidden
            heroImg.src = imgs[nextIdx];
            // force reflow then fade back in
            // eslint-disable-next-line no-unused-expressions
            heroImg.offsetWidth;
            heroImg.classList.remove('is-fading');
        }, 450); // match CSS transition duration to ensure smooth fade
    };

    // loop
    setInterval(() => {
        idx = (idx + 1) % imgs.length;
        crossfade(idx);
    }, 6200); // change image every 6.2s for slower transitions
})(); */
