/**
 * Speedbox Customization - Updated with Error Handler
 * Applies Speedbox branding, red theme, and error handling
 */

import { SPEEDBOX_THEME, SPEEDBOX_BRANDING } from '../lib/speedbox-branding.js';
import speedboxErrorHandler from '../lib/speedbox-error-handler.js';
import { SpeedboxImagePlaceholder } from '../lib/speedbox-image-placeholder.js';

/**
 * Initialize Speedbox branding and error handling
 */
export const initializeSpeedboxBranding = () => {
    // Set page title
    document.title = SPEEDBOX_BRANDING.description;

    // Update favicon
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
        favicon.href = '/static/assets/speedbox-favicon.png';
    }

    // Add error handler stylesheet
    const errorHandlerCSS = document.createElement('link');
    errorHandlerCSS.rel = 'stylesheet';
    errorHandlerCSS.href = '/static/css/speedbox-error-handler.css';
    document.head.appendChild(errorHandlerCSS);

    // Add theme stylesheet
    const themeLink = document.createElement('link');
    themeLink.rel = 'stylesheet';
    themeLink.href = '/static/css/speedbox-red-theme.css';
    document.head.appendChild(themeLink);

    // Set CSS variables for theme colors
    const root = document.documentElement;
    Object.entries(SPEEDBOX_THEME).forEach(([key, value]) => {
        const cssVarName = `--speedbox-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        root.style.setProperty(cssVarName, value);
    });

    // Replace all "Scratch" text with "Speedbox"
    replaceTextInDocument();

    // Setup image error handling with placeholders
    setupImageErrorHandling();

    console.log('✓ Speedbox IDE Branding & Error Handler Initialized');
};

/**
 * Replace Scratch branding text with Speedbox
 */
const replaceTextInDocument = () => {
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    const nodesToReplace = [];
    let node;

    while (node = walker.nextNode()) {
        nodesToReplace.push(node);
    }

    nodesToReplace.forEach(textNode => {
        let text = textNode.textContent;
        let modified = false;

        Object.entries(SPEEDBOX_BRANDING.textReplacements).forEach(([oldText, newText]) => {
            if (text.includes(oldText)) {
                text = text.replace(new RegExp(oldText, 'g'), newText);
                modified = true;
            }
        });

        if (modified) {
            textNode.textContent = text;
        }
    });
};

/**
 * Setup image error handling with SVG placeholders
 */
const setupImageErrorHandling = () => {
    // Handle existing images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', () => {
            SpeedboxImagePlaceholder.replaceImage(img, 'error');
        });
    });

    // Handle dynamically added images
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.tagName === 'IMG') {
                    node.addEventListener('error', () => {
                        SpeedboxImagePlaceholder.replaceImage(node, 'error');
                    });
                } else if (node.querySelectorAll) {
                    node.querySelectorAll('img').forEach((img) => {
                        img.addEventListener('error', () => {
                            SpeedboxImagePlaceholder.replaceImage(img, 'error');
                        });
                    });
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
};

/**
 * Apply Speedbox color scheme to UI elements
 */
export const applySpeedboxColorScheme = () => {
    const elements = document.querySelectorAll('[class*="category"]');
    elements.forEach(el => {
        const classes = el.className;
        
        if (classes.includes('motion') || classes.includes('events')) {
            el.style.backgroundColor = SPEEDBOX_THEME.primary;
        } else if (classes.includes('looks')) {
            el.style.backgroundColor = SPEEDBOX_THEME.primaryLight;
        } else if (classes.includes('control')) {
            el.style.backgroundColor = SPEEDBOX_THEME.secondary;
        }
    });
};

/**
 * Update branding in meta tags
 */
export const updateMetaTags = () => {
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
    }
    metaDescription.content = SPEEDBOX_BRANDING.description;

    let metaOgTitle = document.querySelector('meta[property="og:title"]');
    if (!metaOgTitle) {
        metaOgTitle = document.createElement('meta');
        metaOgTitle.setAttribute('property', 'og:title');
        document.head.appendChild(metaOgTitle);
    }
    metaOgTitle.content = SPEEDBOX_BRANDING.name;

    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.content = SPEEDBOX_THEME.primary;
};

/**
 * Log client errors to server
 */
export const logClientError = (message, error, stack) => {
    try {
        navigator.sendBeacon('/api/logs/error', JSON.stringify({
            message,
            error,
            stack,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
        }));
    } catch (err) {
        console.error('Failed to log error to server:', err);
    }
};

// Auto-initialize on module load
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        initializeSpeedboxBranding();
        updateMetaTags();
    });
}

export default initializeSpeedboxBranding;
