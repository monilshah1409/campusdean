document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');

    // Intersection Observer for animations
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                if (entry.target.classList.contains('animated-number')) {
                    const targetText = entry.target.textContent.replace(/[^0-9.]/g, ''); // Extract only numbers and dot
                    const targetNumber = parseFloat(targetText);
                    if (!isNaN(targetNumber)) {
                        animateNumber(entry.target, targetNumber, 2000); // Animate over 2 seconds
                    }
                }
                observer.unobserve(entry.target);
            }
        });
    };

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        const observer = new IntersectionObserver(animateOnScroll, observerOptions);
        observer.observe(title);
    });

    const animatedNumbers = document.querySelectorAll('.animated-number');
    animatedNumbers.forEach(number => {
        const observer = new IntersectionObserver(animateOnScroll, observerOptions);
        observer.observe(number);
    });

    function animateNumber(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 10);
        const isFloat = target % 1 !== 0;

        const timer = setInterval(() => {
            start += increment;
            if (start > target) {
                start = target;
                clearInterval(timer);
            }
            element.textContent = isFloat ? start.toFixed(1) + (element.textContent.includes('%') ? '%' : '') : Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
        }, 10);
    }

    // Tab functionality for modules section
    const tabs = document.querySelectorAll('.module-tabs .tab');
    const moduleContents = document.querySelectorAll('.module-info');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;

            tabs.forEach(t => t.classList.remove('active'));
            moduleContents.forEach(content => content.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Typing animation for hero section text
    const typingSpeed = 150; // Milliseconds per character
    const deletingSpeed = 100; // Milliseconds per character
    const delayBetweenTexts = 1500; // Milliseconds

    const texts = [
        "School Management Software",
        "Educational ERP",
        "Campus Automation System"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeText() {
        const currentText = texts[textIndex];
        const typingElement = document.getElementById('typing-text');

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = delayBetweenTexts; // Pause at end of typing
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length; // Move to next text
            typeSpeed = 500; // Short pause before typing next text
        }

        setTimeout(typeText, typeSpeed);
    }

    // Start typing animation when the page loads
    typeText();

    // Mobile menu functionality
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    const searchBox = document.querySelector('.search-box');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            searchBox.classList.toggle('active');
        });
    }
});
