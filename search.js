// Advanced Search Functionality

class AnimeSearch {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchSuggestions = document.getElementById('searchSuggestions');
        this.filters = {
            genres: [],
            year: 'all',
            status: 'all',
            type: 'all'
        };
        
        this.animeData = [
            {
                id: 1,
                title: 'Jujutsu Kaisen Season 2',
                type: 'TV',
                genres: ['Action', 'Supernatural', 'Fantasy'],
                year: 2024,
                studio: 'MAPPA',
                status: 'Ongoing',
                rating: 9.2,
                episodes: 24,
                description: 'Follow Yuji Itadori and his allies as they face the most dangerous curses.'
            },
            {
                id: 2,
                title: 'Demon Slayer: Hashira Training',
                type: 'Movie',
                genres: ['Action', 'Fantasy', 'Historical'],
                year: 2024,
                studio: 'ufotable',
                status: 'Completed',
                rating: 9.5,
                episodes: 1,
                description: 'Tanjiro embarks on a new journey to train with the Hashira.'
            },
            {
                id: 3,
                title: 'Attack on Titan: The Final Season',
                type: 'TV',
                genres: ['Action', 'Drama', 'Fantasy'],
                year: 2024,
                studio: 'MAPPA',
                status: 'Ongoing',
                rating: 9.8,
                episodes: 12,
                description: 'The epic conclusion to the legendary series.'
            },
            {
                id: 4,
                title: 'One Piece',
                type: 'TV',
                genres: ['Action', 'Adventure', 'Comedy'],
                year: 2024,
                studio: 'Toei Animation',
                status: 'Ongoing',
                rating: 9.1,
                episodes: 1089,
                description: 'Follow Monkey D. Luffy on his journey to become the Pirate King.'
            }
        ];
        
        this.init();
    }
    
    init() {
        this.initSearchInput();
        this.initFilterListeners();
        this.initKeyboardShortcuts();
    }
    
    initSearchInput() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', debounce((e) => {
                const query = e.target.value.toLowerCase().trim();
                
                if (query.length >= 2) {
                    const results = this.searchAnime(query);
                    this.showSuggestions(results);
                } else {
                    this.hideSuggestions();
                }
            }, 300));
        }
    }
    
    searchAnime(query) {
        return this.animeData.filter(anime => {
            return anime.title.toLowerCase().includes(query) ||
                   anime.genres.some(genre => genre.toLowerCase().includes(query)) ||
                   anime.studio.toLowerCase().includes(query);
        }).slice(0, 5);
    }
    
    showSuggestions(results) {
        if (!this.searchSuggestions) return;
        
        if (results.length > 0) {
            this.searchSuggestions.innerHTML = results.map(anime => `
                <div class="suggestion-item">
                    <img src="https://via.placeholder.com/40x40/1a1a2e/ffffff?text=${anime.title.charAt(0)}" alt="${anime.title}">
                    <div class="suggestion-info">
                        <h4>${anime.title}</h4>
                        <p>${anime.type} • ${anime.year} • ${anime.rating} ⭐</p>
                        <div class="suggestion-genres">
                            ${anime.genres.slice(0, 2).map(genre => `<span class="genre-tag">${genre}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `).join('');
            
            this.searchSuggestions.style.display = 'block';
        } else {
            this.searchSuggestions.innerHTML = '<div class="suggestion-item">No results found</div>';
            this.searchSuggestions.style.display = 'block';
        }
    }
    
    hideSuggestions() {
        if (this.searchSuggestions) {
            this.searchSuggestions.style.display = 'none';
        }
    }
    
    initFilterListeners() {
        // Genre filters
        document.querySelectorAll('.genre-filter').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const genre = e.target.value;
                if (e.target.checked) {
                    this.filters.genres.push(genre);
                } else {
                    this.filters.genres = this.filters.genres.filter(g => g !== genre);
                }
                this.applyFilters();
            });
        });
        
        // Select filters
        document.querySelectorAll('.filter-select').forEach(select => {
            select.addEventListener('change', (e) => {
                this.filters[e.target.name] = e.target.value;
                this.applyFilters();
            });
        });
    }
    
    applyFilters() {
        let results = [...this.animeData];
        
        // Genre filter
        if (this.filters.genres.length > 0) {
            results = results.filter(anime =>
                this.filters.genres.every(genre => anime.genres.includes(genre))
            );
        }
        
        // Year filter
        if (this.filters.year !== 'all') {
            results = results.filter(anime => anime.year == this.filters.year);
        }
        
        // Status filter
        if (this.filters.status !== 'all') {
            results = results.filter(anime => anime.status === this.filters.status);
        }
        
        // Type filter
        if (this.filters.type !== 'all') {
            results = results.filter(anime => anime.type === this.filters.type);
        }
        
        this.displayResults(results);
    }
    
    displayResults(results) {
        const resultsContainer = document.getElementById('searchResults');
        if (!resultsContainer) return;
        
        if (results.length > 0) {
            resultsContainer.innerHTML = results.map(anime => `
                <div class="search-result-card glass-effect">
                    <div class="result-poster">
                        <img src="https://via.placeholder.com/100x150/1a1a2e/ffffff?text=${anime.title.charAt(0)}" alt="${anime.title}">
                        <div class="result-rating">
                            <i class="fas fa-star"></i>
                            <span>${anime.rating}</span>
                        </div>
                    </div>
                    <div class="result-info">
                        <h3 class="result-title">${anime.title}</h3>
                        <div class="result-meta">
                            <span>${anime.type}</span>
                            <span>${anime.year}</span>
                            <span>${anime.studio}</span>
                            <span>${anime.status}</span>
                        </div>
                        <div class="result-genres">
                            ${anime.genres.map(genre => `<span class="genre-tag">${genre}</span>`).join('')}
                        </div>
                        <p class="result-description">${anime.description.substring(0, 100)}...</p>
                        <button class="btn btn-primary btn-small">View Details</button>
                    </div>
                </div>
            `).join('');
        } else {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No results found</h3>
                    <p>Try adjusting your filters or search query</p>
                </div>
            `;
        }
    }
    
    resetFilters() {
        // Reset checkboxes
        document.querySelectorAll('.genre-filter').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Reset selects
        document.querySelectorAll('.filter-select').forEach(select => {
            select.value = 'all';
        });
        
        // Reset filters object
        this.filters = {
            genres: [],
            year: 'all',
            status: 'all',
            type: 'all'
        };
        
        // Show all results
        this.displayResults(this.animeData);
    }
    
    initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                if (this.searchInput) {
                    this.searchInput.focus();
                }
            }
            
            // Escape to clear search
            if (e.key === 'Escape' && document.activeElement === this.searchInput) {
                this.searchInput.value = '';
                this.hideSuggestions();
            }
        });
    }
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

// Initialize search
const search = new AnimeSearch();

// Export for use in other files
window.search = search;