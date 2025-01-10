document.addEventListener('DOMContentLoaded', () => {
    const userTypeSelector = document.querySelector('.user-type-selector');
    const testimonialTabs = document.querySelectorAll('[role="tab"]');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const videoButton = document.querySelector('.play-button');
    let currentTestimonial = 0;

    const handleUserTypeSelection = () => {
        const expanded = userTypeSelector.getAttribute('aria-expanded') === 'true';
        userTypeSelector.setAttribute('aria-expanded', !expanded);
        
        if (!expanded) {
            const menu = document.createElement('ul');
            menu.className = 'user-type-menu';
            menu.setAttribute('role', 'menu');
            
            ['Teacher', 'Student', 'Family', 'Administrator'].forEach(type => {
                const item = document.createElement('li');
                item.setAttribute('role', 'menuitem');
                item.textContent = type;
                item.tabIndex = -1;
                menu.appendChild(item);
            });

            userTypeSelector.after(menu);
            menu.querySelector('li').focus();
        } else {
            document.querySelector('.user-type-menu')?.remove();
        }
    };

    const handleTestimonialNavigation = (index) => {
        testimonialTabs.forEach((tab, i) => {
            const selected = i === index;
            tab.setAttribute('aria-selected', selected);
            testimonialCards[i].setAttribute('aria-hidden', !selected);
            testimonialCards[i].style.display = selected ? 'block' : 'none';
        });
        currentTestimonial = index;
    };

    const handleVideoPlayback = () => {
        const videoContainer = document.querySelector('.video-container');
        const video = document.createElement('video');
        video.setAttribute('controls', '');
        video.setAttribute('autoplay', '');
        video.setAttribute('playsinline', '');
        
        const source = document.createElement('source');
        source.src = 'path-to-your-video.mp4';
        source.type = 'video/mp4';
        
        video.appendChild(source);
        videoContainer.innerHTML = '';
        videoContainer.appendChild(video);
        
        video.focus();
    };

    userTypeSelector.addEventListener('click', handleUserTypeSelection);
    
    testimonialTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => handleTestimonialNavigation(index));
        tab.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                handleTestimonialNavigation((index + 1) % testimonialTabs.length);
                testimonialTabs[(index + 1) % testimonialTabs.length].focus();
            } else if (e.key === 'ArrowLeft') {
                handleTestimonialNavigation((index - 1 + testimonialTabs.length) % testimonialTabs.length);
                testimonialTabs[(index - 1 + testimonialTabs.length) % testimonialTabs.length].focus();
            }
        });
    });

    videoButton.addEventListener('click', handleVideoPlayback);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelector('.user-type-menu')?.remove();
            userTypeSelector.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.user-type-selector') && !e.target.closest('.user-type-menu')) {
            document.querySelector('.user-type-menu')?.remove();
            userTypeSelector.setAttribute('aria-expanded', 'false');
        }
    });

    setInterval(() => {
        handleTestimonialNavigation((currentTestimonial + 1) % testimonialTabs.length);
    }, 5000);

    const handleIntersection = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    document.querySelectorAll('.user-type-card, .testimonial-card').forEach(card => {
        observer.observe(card);
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        clearInterval(testimonialInterval);
    }
});
