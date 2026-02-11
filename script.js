// Smooth Scroll Animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.scroll-fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Add scroll animation class to sections
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section, .feature-card, .feature-list-item');
    sections.forEach(section => {
        section.classList.add('scroll-fade-in');
    });
    handleScrollAnimations();
}

// Copy command to clipboard
function copyCommand() {
    const command = 'npx create-payload-app';
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(command).then(() => {
            showCopyFeedback();
        }).catch(err => {
            console.error('Failed to copy:', err);
            fallbackCopy(command);
        });
    } else {
        fallbackCopy(command);
    }
}

// Fallback copy method for older browsers
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyFeedback();
    } catch (err) {
        console.error('Fallback copy failed:', err);
    }
    
    document.body.removeChild(textArea);
}

// Show copy feedback
function showCopyFeedback() {
    const button = document.querySelector('.copy-button');
    const originalHTML = button.innerHTML;
    
    button.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 10L8 13L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
    button.style.color = '#4ade80';
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.color = '';
    }, 2000);
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        }
        
        lastScroll = currentScroll;
    });
}

// Add hover effects to code windows
function initCodeWindowEffects() {
    const codeWindows = document.querySelectorAll('.code-window');
    
    codeWindows.forEach(window => {
        window.addEventListener('mouseenter', () => {
            window.style.transform = 'translateY(-5px)';
        });
        
        window.addEventListener('mouseleave', () => {
            window.style.transform = 'translateY(0)';
        });
    });
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#' || !href) {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add typing effect to code snippets (optional enhancement)
function initTypingEffect() {
    const codeElements = document.querySelectorAll('.code-content code');
    
    codeElements.forEach((code, index) => {
        code.style.opacity = '0';
        
        setTimeout(() => {
            code.style.transition = 'opacity 0.6s ease';
            code.style.opacity = '1';
        }, index * 200);
    });
}

// Handle feature cards stagger animation
function initFeatureCardAnimations() {
    const cards = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.2
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });
}

// Initialize all effects
function init() {
    initScrollAnimations();
    handleNavbarScroll();
    initCodeWindowEffects();
    initParallaxEffect();
    initSmoothScroll();
    initTypingEffect();
    initFeatureCardAnimations();
    
    console.log('Payload CMS Replica initialized successfully!');
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reinitialize certain effects on resize if needed
        console.log('Window resized');
    }, 250);
});