const sidebarData = [
    {
        label: 'Getting Started',
        defaultOpen: true,
        children: [
            { label: 'Quick Setup', active: true },
            { label: 'Sample Config' },
            { label: 'Custom Events' },
        ]
    },
    {
        label: 'REST API',
        children: [
            { label: 'Local Setup' },
            { label: 'Integration with HTML' },
        ]
    },
    {
        label: 'API Endpoints',
        children: [
            { label: 'Register User' },
            { label: 'Login User' },
            { label: 'Register Project' },
            { label: 'List Projects' },
            { label: 'Add Events Batch' },
            { label: 'List Top Events' },
            { label: 'List Pages By Event' },
            { label: 'List Timeline By Event' },
        ]
    }
];


// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    sidebar.classList.toggle('closed');
    mainContent.classList.toggle('expanded');
}

// Create chevron icon SVG
function createChevronIcon(isOpen) {
    return `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${isOpen 
                ? '<polyline points="6 9 12 15 18 9"></polyline>' 
                : '<polyline points="9 18 15 12 9 6"></polyline>'
            }
        </svg>
    `;
}

// Render sidebar navigation
function renderSidebar() {
    const sidebarNav = document.getElementById('sidebarNav');
    
    sidebarData.forEach(item => {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'sidebar-item';
        
        const itemLink = document.createElement('div');
        itemLink.className = `sidebar-link ${item.active ? 'active' : ''}`;
        itemLink.style.paddingLeft = '16px';
        
        if (item.children && item.children.length > 0) {
            const chevron = document.createElement('span');
            chevron.className = 'chevron';
            chevron.innerHTML = createChevronIcon(item.defaultOpen);
            itemLink.appendChild(chevron);
            
            const childrenContainer = document.createElement('div');
            childrenContainer.className = `sidebar-children ${item.defaultOpen ? 'open' : ''}`;
            
            item.children.forEach(child => {
                const childLink = document.createElement('div');
                childLink.className = `sidebar-link ${child.active ? 'active' : ''}`;
                childLink.style.paddingLeft = '32px';
                childLink.innerHTML = `<span>${child.label}</span>`;
                childrenContainer.appendChild(childLink);
            });
            
            itemLink.addEventListener('click', () => {
                const isOpen = childrenContainer.classList.toggle('open');
                chevron.innerHTML = createChevronIcon(isOpen);
            });
            
            itemContainer.appendChild(childrenContainer);
        }
        
        const label = document.createElement('span');
        label.textContent = item.label;
        itemLink.appendChild(label);
        
        itemContainer.insertBefore(itemLink, itemContainer.firstChild);
        sidebarNav.appendChild(itemContainer);
    });
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', () => {
    renderSidebar();
    
    // Add smooth scroll behavior to all anchor links
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
    
    // Highlight active TOC link on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.toc-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-100px 0px -66%' });
    
    document.querySelectorAll('h2[id], h3[id]').forEach(heading => {
        observer.observe(heading);
    });
});