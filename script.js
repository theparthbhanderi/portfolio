// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Update meta theme-color for mobile browsers
    function updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        const themeColors = {
            dark: '#1a1a2e',
            light: '#ffffff'
        };
        
        metaThemeColor.content = themeColors[theme] || themeColors.dark;
    }
    
    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', currentTheme);
    
    // Force apply dark theme if no theme is set
    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', 'dark');
        body.setAttribute('data-theme', 'dark');
    }
    
    // Enhanced theme application with smooth transitions
    function applyTheme(theme) {
        // Add transition class for smooth switching
        body.classList.add('theme-transitioning');
        
        // Remove any inline styles that might override CSS variables
        body.style.background = '';
        body.style.color = '';
        
        // Set the theme attribute (CSS variables will handle the styling)
        body.setAttribute('data-theme', theme);
        
        // Explicitly set background based on theme
        if (theme === 'dark') {
            body.style.background = '#0c0c0c';
            body.style.color = '#ffffff';
        } else {
            body.style.background = '#f8fafc';
            body.style.color = '#0f172a';
        }
        
        // Update meta theme-color for mobile browsers
        updateMetaThemeColor(theme);
        
        // Force a repaint to ensure CSS variables are applied
        body.offsetHeight;
        
        // Remove transition class after animation completes
        setTimeout(() => {
            body.classList.remove('theme-transitioning');
        }, 400);
    }
    
    // Apply theme immediately
    applyTheme(currentTheme);
    
    // Ensure theme toggle exists before adding event listener
    if (!themeToggle) {
        return;
    }
    
    // Theme toggle event listener with enhanced functionality
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add click animation
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Apply theme using the function
        applyTheme(newTheme);
        
        // Trigger theme change event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Theme-aware navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    function updateNavbarBackground() {
        const currentTheme = document.body.getAttribute('data-theme');
        const isScrolled = window.scrollY > 100;
        
        if (currentTheme === 'light') {
            if (isScrolled) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(25px) saturate(180%)';
                navbar.style.borderBottom = '1.5px solid rgba(0, 0, 0, 0.15)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.85)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            }
        } else {
            // Dark mode
            if (isScrolled) {
                navbar.style.background = 'rgba(0, 0, 0, 0.9)';
                navbar.style.backdropFilter = 'blur(25px)';
                navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.1)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
                navbar.style.boxShadow = 'none';
            }
        }
    }
    
    window.addEventListener('scroll', updateNavbarBackground);
    
    // Update navbar when theme changes
    const navbarThemeObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                updateNavbarBackground();
            }
        });
    });
    
    navbarThemeObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
    
    // Initial navbar setup
    updateNavbarBackground();
    
    // Simple Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    // Add simple reveal animation to all cards
    const revealElements = document.querySelectorAll('.glass-card, .skill-card, .service-card, .project-card');
    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
    
    // Skills section animation trigger
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger skill animations when skills section is visible
                    const skillCards = document.querySelectorAll('.skill-card');
                    let animationDelay = 0;
                    
                    skillCards.forEach((card, index) => {
                        const circle = card.querySelector('.progress-circle');
                        const percentageText = card.querySelector('.progress-text');
                        
                        if (circle) {
                            const percentage = parseInt(circle.dataset.percentage);
                            
                            if (percentage && percentageText) {
                                setTimeout(() => {
                                    animateProgressCircle(circle, percentage, percentageText);
                                }, animationDelay);
                                animationDelay += 200; // Stagger animations
                            }
                        }
                    });
                    
                    // Unobserve after triggering animations
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        skillsObserver.observe(skillsSection);
    }
    

    
    // Hero title is now static with gradient effect
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '1';
    }
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                return;
            }
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                return;
            }

            // AJAX submit to Formspree
            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                if (response.ok) {
                    showNotification('Thank you! Your message has been sent successfully.', 'success');
                    this.reset();
                    // Reset floating labels
                    document.querySelectorAll('.floating-label').forEach(label => {
                        label.style.top = '1rem';
                        label.style.fontSize = '1rem';
                        label.style.color = '#b0b0b0';
                    });
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        showNotification(data.errors.map(error => error.message).join(', '), 'error');
                    } else {
                        showNotification('Oops! There was a problem submitting your form', 'error');
                    }
                }
            } catch (error) {
                showNotification('Oops! There was a problem submitting your form', 'error');
            }
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    }
    
    // Floating labels for form inputs
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            const label = this.nextElementSibling;
            if (label && label.classList.contains('floating-label')) {
                label.style.top = '-0.5rem';
                label.style.left = '0.5rem';
                label.style.fontSize = '0.9rem';
                label.style.color = '#007bff';
            }
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                const label = this.nextElementSibling;
                if (label && label.classList.contains('floating-label')) {
                    label.style.top = '1rem';
                    label.style.left = '1rem';
                    label.style.fontSize = '1rem';
                    label.style.color = '#b0b0b0';
                }
            }
        });
    });
    
    // Simple hover effects only
    const glassElements = document.querySelectorAll('.glass-card, .skill-card, .service-card, .project-card');
    glassElements.forEach(card => {
        card.classList.add('glass-hover');
    });
});

// Optimized helper function to animate progress circles
function animateProgressCircle(circle, percentage, percentageText) {
    let currentPercentage = 0;
    const duration = 2000; // 2 seconds
    const increment = percentage / (duration / 16); // 60fps
    
    const animate = () => {
        currentPercentage += increment;
        
        if (currentPercentage >= percentage) {
            currentPercentage = percentage;
        }
        
        // Update the CSS custom property for the conic gradient
        circle.style.setProperty('--percentage', `${currentPercentage}%`);
        
        // Update the text
        if (percentageText) {
            percentageText.textContent = `${Math.round(currentPercentage)}%`;
        }
        
        if (currentPercentage < percentage) {
            requestAnimationFrame(animate);
        }
    };
    
    animate();
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        background: ${type === 'success' ? 'rgba(40, 167, 69, 0.9)' : type === 'error' ? 'rgba(220, 53, 69, 0.9)' : 'rgba(0, 123, 255, 0.9)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        backdrop-filter: blur(20px);
        border: 1px solid ${type === 'success' ? 'rgba(40, 167, 69, 0.3)' : type === 'error' ? 'rgba(220, 53, 69, 0.3)' : 'rgba(0, 123, 255, 0.3)'};
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Add active navigation highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active navigation
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: #007bff !important;
        text-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(navStyle);
