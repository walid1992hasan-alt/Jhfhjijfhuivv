// Main JavaScript File

// DOM Elements
const header = document.getElementById('header');
const loadingScreen = document.getElementById('loadingScreen');
const searchInput = document.getElementById('searchInput');
const searchSuggestions = document.getElementById('searchSuggestions');
const userAvatar = document.getElementById('userAvatar');
const userDropdown = document.getElementById('userDropdown');
const scrollProgress = document.getElementById('scrollProgress');

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initHeaderScroll();
    initHeroSlider();
    initTrendingSlider();
    initScrollReveal();
    initSearch();
    initUserMenu();
    initCountdowns();
    initProgressBar();
    initSmoothScroll();
});

// Loading Screen
function initLoadingScreen() {
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 2000);
    }
}

// Header Scroll Effect
function initHeaderScroll() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Hero Slider
function initHeroSlider() {
    const heroSwiper = new Swiper('.hero-swiper', {
        effect: 'fade',
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    });
}

// Trending Slider
function initTrendingSlider() {
    const trendingSwiper = new Swiper('.trending-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1.5,
                spaceBetween: 10
            },
            480: {
                slidesPerView: 2.5,
                spaceBetween: 15
            },
            768: {
                slidesPerView: 3.5,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 5.5,
                spaceBetween: 20
            }
        }
    });

    // Hover pause autoplay
    const swiperContainer = document.querySelector('.trending-swiper');
    if (swiperContainer) {
        swiperContainer.addEventListener('mouseenter', () => {
            trendingSwiper.autoplay.stop();
        });
        
        swiperContainer.addEventListener('mouseleave', () => {
            trendingSwiper.autoplay.start();
        });
    }
}

// Scroll Reveal Animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.section, .anime-card, .episode-card, .upcoming-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        element.classList.add('reveal');
        observer.observe(element);
    });
}

// Search Functionality
function initSearch() {
    if (!searchInput) return;
    
    const searchData = [
        { title: 'Jujutsu Kaisen', type: 'Anime', year: 2024 },
        { title: 'Demon Slayer', type: 'Anime', year: 2024 },
        { title: 'Attack on Titan', type: 'Anime', year: 2024 },
        { title: 'One Piece', type: 'Anime', year: 2024 },
        { title: 'Chainsaw Man', type: 'Anime', year: 2023 },
        { title: 'Spy x Family', type: 'Anime', year: 2024 },
        { title: 'My Hero Academia', type: 'Anime', year: 2024 },
        { title: 'Vinland Saga', type: 'Anime', year: 2023 }
    ];
    
    searchInput.addEventListener('input', debounce((e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            if (searchSuggestions) searchSuggestions.style.display = 'none';
            return;
        }
        
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query)
        ).slice(0, 5);
        
        if (searchSuggestions) {
            if (results.length > 0) {
                searchSuggestions.innerHTML = results.map(item => `
                    <div class="suggestion-item">
                        <img src="https://via.placeholder.com/40x40/1a1a2e/ffffff?text=${item.title.charAt(0)}" alt="${item.title}">
                        <div class="suggestion-info">
                            <h4>${item.title}</h4>
                            <p>${item.type} • ${item.year}</p>
                        </div>
                    </div>
                `).join('');
                searchSuggestions.style.display = 'block';
            } else {
                searchSuggestions.innerHTML = '<div class="suggestion-item">No results found</div>';
                searchSuggestions.style.display = 'block';
            }
        }
    }, 300));
    
    // Close suggestions on click outside
    document.addEventListener('click', (e) => {
        if (searchSuggestions && !searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
            searchSuggestions.style.display = 'none';
        }
    });
}

// Debounce function
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

// User Menu
function initUserMenu() {
    if (!userAvatar || !userDropdown) return;
    
    userAvatar.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('active');
    });
    
    document.addEventListener('click', (e) => {
        if (!userAvatar.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.classList.remove('active');
        }
    });
}

// Countdown Timers
function initCountdowns() {
    const countdowns = document.querySelectorAll('.upcoming-countdown');
    
    countdowns.forEach(countdown => {
        const targetDate = new Date(countdown.dataset.date).getTime();
        
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            
            const daysElement = countdown.querySelector('.days');
            const hoursElement = countdown.querySelector('.hours');
            const minutesElement = countdown.querySelector('.minutes');
            
            if (daysElement) daysElement.textContent = days;
            if (hoursElement) hoursElement.textContent = hours;
            if (minutesElement) minutesElement.textContent = minutes;
            
            if (distance < 0) {
                clearInterval(timer);
                countdown.innerHTML = '<span class="released">Now Available</span>';
            }
        }, 1000);
    });
}

// Progress Bar
function initProgressBar() {
    if (!scrollProgress) return;
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        scrollProgress.style.width = scrolled + '%';
    });
}

// Smooth Scroll
function initSmoothScroll() {
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
}

// Watchlist Class
class Watchlist {
    constructor() {
        this.watchlist = JSON.parse(localStorage.getItem('watchlist')) || {
            watching: [],
            completed: [],
            planToWatch: [],
            dropped: []
        };
    }
    
    addToWatchlist(anime, category = 'planToWatch') {
        if (!this.watchlist[category].find(item => item.id === anime.id)) {
            this.watchlist[category].push(anime);
            this.save();
            this.showNotification(`${anime.title} added to ${category}`);
        }
    }
    
    removeFromWatchlist(animeId, category) {
        this.watchlist[category] = this.watchlist[category].filter(item => item.id !== animeId);
        this.save();
    }
    
    save() {
        localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
    }
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification glass-effect';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Initialize Watchlist
const watchlist = new Watchlist();

// Add to watchlist buttons
document.querySelectorAll('.add-to-watchlist').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const animeCard = button.closest('.anime-card');
        if (animeCard) {
            const anime = {
                id: Math.random().toString(36).substr(2, 9),
                title: animeCard.querySelector('.card-title')?.textContent || 'Unknown',
                image: animeCard.querySelector('img')?.src || '',
                rating: animeCard.querySelector('.card-rating span')?.textContent || 'N/A'
            };
            
            watchlist.addToWatchlist(anime);
        }
    });
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // Left/Right arrow for sliders
    if (e.key === 'ArrowLeft') {
        const activeSlide = document.querySelector('.swiper-slide-active');
        if (activeSlide) {
            const activeSlider = activeSlide.closest('.swiper');
            if (activeSlider && activeSlider.swiper) {
                activeSlider.swiper.slidePrev();
            }
        }
    }
    
    if (e.key === 'ArrowRight') {
        const activeSlide = document.querySelector('.swiper-slide-active');
        if (activeSlide) {
            const activeSlider = activeSlide.closest('.swiper');
            if (activeSlider && activeSlider.swiper) {
                activeSlider.swiper.slideNext();
            }
        }
    }
});

// Export for use in other files
window.watchlist = watchlist;