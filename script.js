// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to navigation items based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });

    // Work Experience headline animation
    const experienceTitle = document.querySelector('#experience h2');
    const experienceTitlePosition = experienceTitle.getBoundingClientRect().top;
    
    if (experienceTitlePosition < window.innerHeight * 0.8 && !experienceTitle.classList.contains('slide-in-right')) {
        experienceTitle.classList.add('slide-in-right');
    } else if (experienceTitlePosition > window.innerHeight) {
        experienceTitle.classList.remove('slide-in-right');
    }

    // About section animations on scroll - only text
    const aboutText = document.querySelector('.about-text');
    const aboutPosition = aboutText.getBoundingClientRect().top;
    
    // Remove animations when scrolled away
    if (aboutPosition > window.innerHeight || aboutPosition < -100) {
        aboutText.classList.remove('slide-in-left');
    }
    // Add animations when scrolled into view
    else if (aboutPosition < window.innerHeight * 0.75) {
        aboutText.classList.add('slide-in-left');
    }

    // Add animations for experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    
    experienceItems.forEach(item => {
        const itemPosition = item.getBoundingClientRect().top;
        
        // Remove animation when scrolled away
        if (itemPosition > window.innerHeight || itemPosition < -100) {
            item.classList.remove('fade-in-up');
        }
        // Add animation when scrolled into view
        else if (itemPosition < window.innerHeight * 0.85) {
            item.classList.add('fade-in-up');
        }
    });

    // Education headline animation
    const educationTitle = document.querySelector('#education h2');
    const educationTitlePosition = educationTitle.getBoundingClientRect().top;
    
    if (educationTitlePosition < window.innerHeight * 0.8 && !educationTitle.classList.contains('slide-in-left')) {
        educationTitle.classList.add('slide-in-left');
    } else if (educationTitlePosition > window.innerHeight) {
        educationTitle.classList.remove('slide-in-left');
    }

    // Get all section headlines
    const headlines = document.querySelectorAll('.section h2');

    // Function to handle headline animations
    const handleHeadlineAnimations = () => {
        headlines.forEach(headline => {
            const headlinePosition = headline.getBoundingClientRect().top;
            const sectionId = headline.closest('.section').id;
            
            // Determine slide direction
            const slideClass = ['experience', 'skills', 'contact'].includes(sectionId) 
                ? 'slide-in-right' 
                : 'slide-in-left';

            // Add animation when in view
            if (headlinePosition < window.innerHeight * 0.8) {
                headline.classList.add(slideClass);
            }
            // Remove animation when out of view
            else if (headlinePosition > window.innerHeight) {
                headline.classList.remove(slideClass);
            }
        });
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleHeadlineAnimations);

    // Initial check on page load
    document.addEventListener('DOMContentLoaded', handleHeadlineAnimations);

    // Add animations for education items
    const educationItems = document.querySelectorAll('.education-item');

    educationItems.forEach(item => {
        const itemPosition = item.getBoundingClientRect().top;
        
        // Remove animation when scrolled away
        if (itemPosition > window.innerHeight || itemPosition < -100) {
            item.classList.remove('fade-in-up');
        }
        // Add animation when scrolled into view
        else if (itemPosition < window.innerHeight * 0.85) {
            item.classList.add('fade-in-up');
        }
    });
});

// Add scroll to top button functionality
const createScrollTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-top';
    document.body.appendChild(button);

    const aboutSection = document.getElementById('about');
    const aboutArrows = aboutSection.querySelector('.scroll-indicator');

    window.addEventListener('scroll', () => {
        // Get the position of the arrows in the about section
        const arrowsPosition = aboutArrows.offsetTop + aboutSection.offsetTop;
        
        // Show button when reaching the arrows
        if (window.pageYOffset >= arrowsPosition - 100) { // -100 to show slightly earlier
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

createScrollTopButton();

// Add initial animation on page load
document.addEventListener('DOMContentLoaded', () => {
    // Fade in header
    const header = document.querySelector('.header-container');
    header.classList.add('fade-in');
    
    // Trigger about section text animation on load
    const aboutText = document.querySelector('.about-text');
    
    // Remove class first to ensure animation plays
    aboutText.classList.remove('slide-in-left');
    
    // Add small delay before adding class to ensure animation plays
    setTimeout(() => {
        aboutText.classList.add('slide-in-left');
    }, 100);

    handleScrollIndicators();

    // Check education title on load
    const educationTitle = document.querySelector('#education h2');
    if (educationTitle) {
        const educationTitlePosition = educationTitle.getBoundingClientRect().top;
        if (educationTitlePosition < window.innerHeight * 0.75) {
            educationTitle.classList.add('slide-in-left');
        }
    }

    handleHeadlineAnimations();
});

// Handle scroll indicator visibility
const handleScrollIndicators = () => {
    const indicators = document.querySelectorAll('.scroll-indicator');
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;

    indicators.forEach(indicator => {
        const section = indicator.closest('.section');
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        // Show indicator only when in the top 70% of the section
        if (scrollPosition >= sectionTop && 
            scrollPosition < (sectionTop + sectionHeight * 0.7)) {
            indicator.style.opacity = '1';
        } else {
            indicator.style.opacity = '0';
        }
    });
};

// Add scroll event listener for indicators
window.addEventListener('scroll', handleScrollIndicators);

// Handle section title animations
function handleTitleAnimations() {
    const titles = document.querySelectorAll('.section h2');
    
    titles.forEach(title => {
        const titlePosition = title.getBoundingClientRect().top;
        
        if (titlePosition < window.innerHeight * 0.8) {
            title.classList.add('active');
        } else {
            title.classList.remove('active');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', handleTitleAnimations);

// Initial check on page load
document.addEventListener('DOMContentLoaded', handleTitleAnimations);

// Handle skill items interaction
document.querySelectorAll('.skill-item').forEach(item => {
    const details = item.querySelector('.skill-details');
    
    // Handle click
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        details.classList.toggle('active');
    });

    // Prevent closing when clicking inside details
    details.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

// Close all skill details when clicking outside
document.addEventListener('click', () => {
    document.querySelectorAll('.skill-details.active').forEach(detail => {
        detail.classList.remove('active');
    });
});

// Debounce scroll handler to improve performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle scroll events more efficiently
const handleScroll = debounce(() => {
    handleTitleAnimations();
    handleScrollIndicators();
}, 10);

window.addEventListener('scroll', handleScroll);

// Language switcher functionality
document.addEventListener('DOMContentLoaded', function() {
    const langBtn = document.querySelector('.language-btn');
    const langOptions = document.querySelector('.language-options');
    const langLinks = document.querySelectorAll('.language-options a');

    // Toggle dropdown on button click
    langBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        langOptions.classList.toggle('show');
    });

    // Handle language selection
    langLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const href = this.getAttribute('href');
            window.location.href = href;  // Navigate to the selected language version
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.language-switcher')) {
            langOptions.classList.remove('show');
        }
    });
});

// Mobile menu functionality
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close menu when clicking a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && !e.target.closest('.menu-toggle')) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Handle skill details on mobile
if (window.innerWidth <= 768) {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const details = item.querySelector('.skill-details');
            details.style.display = details.style.display === 'block' ? 'none' : 'block';
            e.stopPropagation();
        });
    });

    document.addEventListener('click', () => {
        document.querySelectorAll('.skill-details').forEach(detail => {
            detail.style.display = 'none';
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const langSwitcher = document.querySelector('.language-switcher');
    const langOptions = document.querySelector('.language-options');

    langSwitcher.addEventListener('click', function(e) {
        e.stopPropagation();
        langOptions.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        langOptions.classList.remove('show');
    });

    // Prevent dropdown from closing when clicking inside it
    langOptions.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

// Handle contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = encodeURIComponent(document.getElementById('name').value);
    const email = encodeURIComponent(document.getElementById('email').value);
    const subject = encodeURIComponent(document.getElementById('subject').value);
    const message = encodeURIComponent(document.getElementById('message').value);
    
    // Format the email body with line breaks
    const body = `Name: ${name}%0D%0A%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    
    // Create and open mailto link
    window.location.href = `mailto:coufalova.nikol@outlook.com?subject=${subject}&body=${body}`;
    
    // Reset form
    this.reset();
}); 