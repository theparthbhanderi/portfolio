// Theme utility functions for enhanced theme switching

// Update meta theme-color for mobile browsers
function updateMetaThemeColor(theme) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    
    if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        document.head.appendChild(metaThemeColor);
    }
    
    const themeColors = {
        dark: '#1a1a2e',
        light: '#ffffff'
    };
    
    metaThemeColor.content = themeColors[theme] || themeColors.dark;
}

// Preload theme resources for faster switching
function preloadThemeResources() {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = 'css/style.css';
    document.head.appendChild(link);
}

// Detect system theme preference
function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// Listen for system theme changes
function watchSystemTheme(callback) {
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            const newTheme = e.matches ? 'dark' : 'light';
            callback(newTheme);
        });
    }
}

// Smooth theme transition with reduced motion support
function applyThemeTransition() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        document.body.style.transition = 'background 0.4s cubic-bezier(0.23, 1, 0.32, 1), color 0.4s ease';
        
        // Reset transition after completion
        setTimeout(() => {
            document.body.style.transition = '';
        }, 400);
    }
}

// Export functions for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateMetaThemeColor,
        preloadThemeResources,
        getSystemTheme,
        watchSystemTheme,
        applyThemeTransition
    };
}
