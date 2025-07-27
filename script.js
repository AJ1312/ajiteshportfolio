// F1 Style Page Animations
document.addEventListener('DOMContentLoaded', function() {
    // Trigger F1-style animations on page load
    setTimeout(() => {
        // Add animation classes to elements
        const elements = document.querySelectorAll('.f1-entrance, .f1-slide-in, .f1-fade-in, .f1-zoom-in, .f1-rotate-in, .f1-scale-in, .f1-cards-entrance');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate');
            }, index * 200);
        });
        
        // Start F1 background animations
        document.querySelector('.f1-background').classList.add('active');
    }, 100);

    // Resume Download Button
    const resumeBtnContainer = document.getElementById('resume-btn-container');
    if (resumeBtnContainer) {
        const downloadBtn = document.createElement('a');
        downloadBtn.href = 'Ajitesh Sharma_Resume.pdf';
        downloadBtn.className = 'download-btn';
        downloadBtn.textContent = 'Download Resume';
        downloadBtn.download = 'Ajitesh_Sharma_Resume.pdf';
        resumeBtnContainer.appendChild(downloadBtn);
    }

    // Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links ul');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }

    // Typing Animation
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = 'Ajitesh Sharma';
        let index = 0;

        function type() {
            if (index < text.length) {
                typingText.textContent += text.charAt(index);
                index++;
                setTimeout(type, 100);
            } else {
                // Add blinking cursor effect
                setTimeout(() => {
                    typingText.style.borderRight = 'none';
                }, 1000);
            }
        }

        // Start typing animation immediately
        setTimeout(() => {
            type();
        }, 800);
    }

    // Navigation Cards Click Handler
    const navCards = document.querySelectorAll('.nav-card');
    navCards.forEach(card => {
        card.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            if (page) {
                // Add a smooth transition effect
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    window.location.href = page;
                }, 150);
            }
        });

        // Add ripple effect on click
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(197, 36, 36, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Scroll animation for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply initial styles and observe sections
    document.querySelectorAll('.section, .project-card, .skill-item, .certification-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Easter Eggs Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Konami Code Easter Egg
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    let konamiIndex = 0;
    const secretMessage = document.getElementById('secret-message');
    const konamiTrigger = document.querySelector('.konami-code');
    const devConsole = document.getElementById('dev-console');

    document.addEventListener('keydown', function(e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                triggerKonamiEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // Click easter egg
    if (konamiTrigger) {
        konamiTrigger.addEventListener('click', function() {
            triggerKonamiEasterEgg();
        });
    }

    // Developer Console Easter Egg
    let devConsoleToggle = false;
    document.addEventListener('keydown', function(e) {
        // Press F12 or Ctrl+Shift+I to toggle dev console
        if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && e.keyCode === 73)) {
            e.preventDefault();
            toggleDevConsole();
        }
    });

    // Console close button
    const consoleClose = document.querySelector('.console-close');
    if (consoleClose) {
        consoleClose.addEventListener('click', function() {
            toggleDevConsole();
        });
    }

    function toggleDevConsole() {
        if (devConsole) {
            devConsoleToggle = !devConsoleToggle;
            devConsole.classList.toggle('active', devConsoleToggle);
            
            if (devConsoleToggle) {
                showTemporaryMessage('Developer console activated! 👨‍💻');
                typeInConsole();
            }
        }
    }

    function typeInConsole() {
        const consoleContent = document.querySelector('.console-content');
        if (consoleContent) {
            consoleContent.innerHTML = '';
            const commands = [
                { type: 'line', text: '$ whoami' },
                { type: 'output', text: 'ajitesh_sharma' },
                { type: 'line', text: '$ skills --list' },
                { type: 'output', text: 'JavaScript, Python, Java, React, Node.js, DevOps...' },
                { type: 'line', text: '$ echo "Welcome to my portfolio!" 🚀' },
                { type: 'output', text: 'Welcome to my portfolio! 🚀' },
                { type: 'line', text: '$ easteregg --activate' },
                { type: 'output', text: 'Easter egg mode: ENABLED ✨' }
            ];
            
            let index = 0;
            const typeCommand = () => {
                if (index < commands.length) {
                    const command = commands[index];
                    const line = document.createElement('div');
                    line.className = command.type === 'line' ? 'console-line' : 'console-output';
                    line.textContent = command.text;
                    consoleContent.appendChild(line);
                    consoleContent.scrollTop = consoleContent.scrollHeight;
                    index++;
                    setTimeout(typeCommand, 800);
                }
            };
            
            setTimeout(typeCommand, 500);
        }
    }

    function createCodeRain() {
        const characters = '01{}[]();=+-*/<>!@#$%^&*';
        const container = document.body;
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const char = document.createElement('div');
                char.textContent = characters[Math.floor(Math.random() * characters.length)];
                char.style.cssText = `
                    position: fixed;
                    top: -50px;
                    left: ${Math.random() * window.innerWidth}px;
                    color: #00ff00;
                    font-family: 'Courier New', monospace;
                    font-size: 1.2rem;
                    pointer-events: none;
                    z-index: 9999;
                    animation: codeRainFall 3s ease-in forwards;
                `;
                container.appendChild(char);
                setTimeout(() => char.remove(), 3000);
            }, i * 100);
        }
    }

    function createPortalEffect() {
        const portal = document.createElement('div');
        portal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: radial-gradient(circle, transparent 30%, #c52424 70%);
            transform: translate(-50%, -50%) scale(0);
            pointer-events: none;
            z-index: 9999;
            animation: portalExpand 2s ease-out forwards;
        `;
        
        document.body.appendChild(portal);
        setTimeout(() => portal.remove(), 2000);
    }

    function triggerKonamiEasterEgg() {
        // Show secret message
        if (secretMessage) {
            secretMessage.classList.add('show');
            setTimeout(() => {
                secretMessage.classList.remove('show');
            }, 3000);
        }

        // Add special effects
        document.body.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);

        // Create falling emojis
        createFallingEmojis();
        
        // Activate matrix rain
        const matrixRain = document.querySelector('.matrix-rain');
        if (matrixRain) {
            matrixRain.style.opacity = '1';
            setTimeout(() => {
                matrixRain.style.opacity = '0';
            }, 3000);
        }
    }

    function createFallingEmojis() {
        const emojis = ['🎉', '🚀', '💻', '🎮', '⭐', '🔥'];
        const container = document.body;

        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                emoji.style.cssText = `
                    position: fixed;
                    top: -50px;
                    left: ${Math.random() * window.innerWidth}px;
                    font-size: 2rem;
                    pointer-events: none;
                    z-index: 9999;
                    animation: fall 3s ease-in forwards;
                `;
                container.appendChild(emoji);

                setTimeout(() => emoji.remove(), 3000);
            }, i * 100);
        }
    }

    // Double-click anywhere for surprise
    let clickCount = 0;
    document.addEventListener('click', function() {
        clickCount++;
        setTimeout(() => { clickCount = 0; }, 500);
        
        if (clickCount === 3) {
            // Triple click easter egg
            const messages = [
                "You're persistent! 😄",
                "Keep clicking, you'll find more! 🔍",
                "Developer mode activated! 💻",
                "You found another secret! 🎯"
            ];
            
            const message = messages[Math.floor(Math.random() * messages.length)];
            showTemporaryMessage(message);
        }
    });

    function showTemporaryMessage(text) {
        const popup = document.createElement('div');
        popup.textContent = text;
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #c52424;
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            font-size: 1.1rem;
            z-index: 9999;
            animation: popupShow 0.3s ease-out;
        `;
        
        document.body.appendChild(popup);
        setTimeout(() => {
            popup.style.animation = 'popupHide 0.3s ease-in forwards';
            setTimeout(() => popup.remove(), 300);
        }, 2000);
    }

    // Contact form handling (if exists)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            if (!name || !email || !subject || !message) {
                showTemporaryMessage('Please fill in all fields.');
                return;
            }
            
            showTemporaryMessage('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
        });
    }
});

// Add CSS animations dynamically
const additionalStyles = `
    @keyframes ripple {
        to { transform: scale(2); opacity: 0; }
    }
    
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    @keyframes fall {
        to { 
            transform: translateY(${window.innerHeight + 100}px) rotate(720deg); 
            opacity: 0; 
        }
    }
    
    @keyframes codeRainFall {
        to { 
            transform: translateY(${window.innerHeight + 100}px); 
            opacity: 0; 
        }
    }
    
    @keyframes portalExpand {
        0% { 
            transform: translate(-50%, -50%) scale(0) rotate(0deg); 
            opacity: 1; 
        }
        50% { 
            transform: translate(-50%, -50%) scale(2) rotate(180deg); 
            opacity: 0.8; 
        }
        100% { 
            transform: translate(-50%, -50%) scale(5) rotate(360deg); 
            opacity: 0; 
        }
    }
    
    @keyframes popupShow {
        from { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(0.8); 
        }
        to { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1); 
        }
    }
    
    @keyframes popupHide {
        from { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1); 
        }
        to { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(0.8); 
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Particle background effect (optional)
function createParticleBackground() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.1;
    `;
    
    document.body.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#c52424';
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Initialize particle background on home page
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    setTimeout(createParticleBackground, 2500);
}
