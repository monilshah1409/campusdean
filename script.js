// Module Tabs Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const moduleInfos = document.querySelectorAll('.module-info');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and module infos
            tabs.forEach(t => t.classList.remove('active'));
            moduleInfos.forEach(info => {
                info.classList.remove('active');
                info.style.opacity = '0';
                info.style.transform = 'translateY(20px)';
            });
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding module info with animation
            const moduleId = tab.getAttribute('data-tab');
            const targetModule = document.getElementById(moduleId);
            targetModule.classList.add('active');
            
            // Trigger animation
            setTimeout(() => {
                targetModule.style.opacity = '1';
                targetModule.style.transform = 'translateY(0)';
            }, 50);
        });
    });

    // Scroll Animation
    const scrollElements = document.querySelectorAll('.scroll-animation');

    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 100)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Counter Animation for Achievement Numbers
    const achievementNumbers = document.querySelectorAll('.achievement-number');
    
    const animateNumber = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 20);
    };

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile Navigation Toggle
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.classList.add('mobile-menu-button');
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    const navbar = document.querySelector('.navbar .container');
    navbar.insertBefore(mobileMenuButton, navbar.firstChild);

    const mobileNav = document.querySelector('.nav-links');
    
    mobileMenuButton.addEventListener('click', () => {
        mobileNav.classList.toggle('show');
        mobileMenuButton.classList.toggle('active');
    });

    // Add hover effect to module cards
    const moduleCards = document.querySelectorAll('.module-info');
    
    moduleCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Form validation for search
    const searchForm = document.querySelector('.search-box');
    const searchInput = searchForm.querySelector('input');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (searchInput.value.trim() !== '') {
            // Add your search functionality here
            console.log('Searching for:', searchInput.value);
        }
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});
