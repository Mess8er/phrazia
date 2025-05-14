// Main JavaScript file for Phrazia Katwaza's portfolio website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        const navItems = document.querySelectorAll('.nav-links li a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Dark mode toggle
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        // Check for saved theme preference or use preferred color scheme
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('animated');
            }
        });
    };
    
    // Add animate-on-scroll class to elements that should animate
    const addAnimationClasses = function() {
        const elementsToAnimate = [
            '.skill-card', 
            '.project-card', 
            '.interest-item',
            '.timeline-item',
            '.contact-method'
        ];
        
        elementsToAnimate.forEach(selector => {
            document.querySelectorAll(selector).forEach((element, index) => {
                element.classList.add('animate-on-scroll');
                element.style.animationDelay = `${index * 0.1}s`;
            });
        });
    };
    
    addAnimationClasses();
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check on page load
    
    // Form validation helper function
    window.validateForm = function(formId, callback) {
        const form = document.getElementById(formId);
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Reset error messages
                const errorMessages = form.querySelectorAll('.error-message');
                errorMessages.forEach(msg => msg.style.display = 'none');
                
                // Validate required fields
                let isValid = true;
                const requiredFields = form.querySelectorAll('[required]');
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        const errorId = field.id + '-error';
                        const errorElement = document.getElementById(errorId);
                        
                        if (errorElement) {
                            errorElement.style.display = 'block';
                            isValid = false;
                        }
                    }
                    
                    // Email validation
                    if (field.type === 'email') {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(field.value)) {
                            const errorId = field.id + '-error';
                            const errorElement = document.getElementById(errorId);
                            
                            if (errorElement) {
                                errorElement.style.display = 'block';
                                isValid = false;
                            }
                        }
                    }
                });
                
                // If form is valid and callback provided, execute callback
                if (isValid && typeof callback === 'function') {
                    callback(form);
                }
                
                return isValid;
            });
        }
    };
    
    // Add accessibility features
    const enhanceAccessibility = function() {
        // Add aria-current to active navigation item
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage || 
                (currentPage === '' && link.getAttribute('href') === 'index.html')) {
                link.setAttribute('aria-current', 'page');
            }
        });
        
        // Ensure all interactive elements are keyboard accessible
        const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]');
        interactiveElements.forEach(element => {
            if (element.getAttribute('tabindex') !== '-1') {
                element.setAttribute('tabindex', '0');
            }
        });
    };
    
    enhanceAccessibility();
});