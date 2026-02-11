document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Hearts Background
    const heartsContainer = document.getElementById('heartsContainer');

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤';

        // Random positioning
        heart.style.left = Math.random() * 100 + 'vw';

        // Random size
        const size = Math.random() * 1.5 + 0.5;
        heart.style.fontSize = size + 'rem';

        // Random animation duration
        const duration = Math.random() * 3 + 4; // Between 4 and 7 seconds
        heart.style.animationDuration = duration + 's';

        heartsContainer.appendChild(heart);

        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    // Create hearts periodically
    setInterval(createHeart, 300);

    // 2. Interactive Cupid Bull (Subtle movement)
    const cupidBull = document.getElementById('cupidBull');

    if (cupidBull) {
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        document.addEventListener('mousemove', (e) => {
            // Calculate center dynamically
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            mouseX = e.clientX - centerX;
            mouseY = e.clientY - centerY;
        });

        function animateFollow() {
            // Smooth easing
            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;

            // Apply very subtle movement to the mascot
            // Limit the movement range to 25px
            const moveX = (targetX * 0.02);
            const moveY = (targetY * 0.02);

            cupidBull.style.transform = `translate(${moveX}px, ${moveY}px)`;

            requestAnimationFrame(animateFollow);
        }

        animateFollow();
    }

    // 3. Scroll Reveal Animation for Professional Feel
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Targets for reveal
    const reveals = document.querySelectorAll('.glass-card, .gallery-item, .products-grid > *, .drink-hero-content, .join-info, .form-card');
    reveals.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(el);
    });

    // Add revealed class styles via JS for simplicity or in CSS
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
    // 4. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const sideMenu = document.querySelector('.side-menu');

    if (menuToggle && sideMenu) {
        menuToggle.addEventListener('click', () => {
            sideMenu.classList.add('active');
        });

        if (closeMenu) {
            closeMenu.addEventListener('click', () => {
                sideMenu.classList.remove('active');
            });
        }

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target) && sideMenu.classList.contains('active')) {
                sideMenu.classList.remove('active');
            }
        });
    }
});
