// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Check if touch device
const isTouchDevice = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0) || window.matchMedia("(pointer: coarse)").matches);

// Custom Cursor (Only for non-touch devices)
if (!isTouchDevice) {
    const cursor = document.querySelector('.custom-cursor');
    const cursorGlow = document.querySelector('.cursor-glow');
    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    // Smooth follow for cursor glow
    gsap.ticker.add(() => {
        glowX += (mouseX - glowX) * 0.15;
        glowY += (mouseY - glowY) * 0.15;
        cursorGlow.style.left = `${glowX}px`;
        cursorGlow.style.top = `${glowY}px`;
    });

    // Magnetic Buttons and Hover States
    const magneticBtns = document.querySelectorAll('.magnetic-btn, .horizontal-panel');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            cursorGlow.style.width = '80px';
            cursorGlow.style.height = '80px';
            cursorGlow.style.borderColor = 'rgba(255,255,255,0.8)';
        });
        btn.addEventListener('mouseleave', () => {
            cursorGlow.style.width = '40px';
            cursorGlow.style.height = '40px';
            cursorGlow.style.borderColor = 'rgba(255,255,255,0.2)';
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "power2.out" });
        });
        
        if(btn.classList.contains('magnetic-btn')) {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(btn, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
        }
    });
}

// Hero Animation
const tlHero = gsap.timeline();
tlHero.from(".badge", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" })
      .from(".word", { y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.6")
      .from(".subheadline", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .from(".cta-wrapper", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .from(".orb", { scale: 0, opacity: 0, duration: 1.5, ease: "expo.out" }, "-=1");

// Parallax for Orbs
if (!isTouchDevice) {
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        gsap.to(".orb", { x: x * 2, y: y * 2, duration: 1 });
        gsap.to(".orb-ring", { x: x * -1, y: y * -1, duration: 1 });
        gsap.to(".orb-ring-2", { x: x * 1.5, y: y * 1.5, duration: 1 });
    });
}

// Stats Parallax (Enabled globally)
gsap.utils.toArray('.parallax-item').forEach(item => {
    const speed = item.dataset.speed;
    gsap.to(item, {
        y: () => (1 - speed) * -100,
        ease: "none",
        scrollTrigger: {
            trigger: ".stats-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
});

// Horizontal Scroll Wrapper
if(window.innerWidth > 1024) {
    const horizontalContainer = document.querySelector('.horizontal-container');
    const panels = gsap.utils.toArray('.horizontal-panel');
    
    gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: ".horizontal-scroll-wrapper",
            pin: true,
            scrub: 1,
            snap: 1 / (panels.length - 1),
            end: () => "+=" + horizontalContainer.offsetWidth
        }
    });
}

// Fade In Text on scroll
gsap.utils.toArray('.content-block p').forEach(p => {
    gsap.from(p, {
        opacity: 0,
        y: 20,
        duration: 1,
        scrollTrigger: {
            trigger: p,
            start: "top 85%",
        }
    });
});
