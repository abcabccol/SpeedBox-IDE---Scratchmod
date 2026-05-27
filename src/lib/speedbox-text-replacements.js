/**
 * Speedbox Text Replacements
 * Complete UI text replacements for Speedbox branding
 */

export const SPEEDBOX_TEXT_REPLACEMENTS = {
    // Homepage
    'Welcome to Scratch': 'Welcome to Speedbox',
    'The easiest way to learn to code': 'The fastest way to create amazing projects',
    'Create stories, games, and animations': 'Create stories, games, animations, and more with AI',
    
    // User Status
    'Scratcher': 'SPEEDER',
    'Become a Scratcher': 'Become a SPEEDER',
    'You\'re a Scratcher': 'You\'re a SPEEDER',
    'Scratcher status': 'SPEEDER Status',
    
    // Community
    'Scratch Community': 'Speedbox Community',
    'Scratch Projects': 'Speedbox Projects',
    'Scratch Studios': 'Speedbox Studios',
    'Scratch Users': 'Speedbox Users',
    'Scratch Forums': 'Speedbox Forums',
    
    // Editor
    'Scratch Editor': 'Speedbox Editor',
    'New Project': 'New Speedbox Project',
    'Start': 'Start Project',
    'Stop': 'Stop Project',
    'Fullscreen': 'Fullscreen Mode',
    
    // Sharing
    'Share on Scratch': 'Share on Speedbox',
    'View on Scratch': 'View on Speedbox',
    'Shared by': 'Created by',
    
    // Blocks
    'Motion': 'Motion',
    'Looks': 'Appearance',
    'Sound': 'Audio',
    'Events': 'Events',
    'Control': 'Control',
    'Sensing': 'Sensing',
    'Operators': 'Math',
    'Variables': 'Data',
    'My Blocks': 'Custom Blocks',
    'Pen': 'Pen & Draw',
    
    // Stats
    'Views': 'Views',
    'Loves': 'Favorites',
    'Comments': 'Comments',
    'Favorites': 'Bookmarks',
    'Remixes': 'Remixes',
    
    // Navigation
    'My Stuff': 'My Projects',
    'Explore': 'Discover',
    'About': 'About Speedbox',
    'Help': 'Support',
    'Contact Us': 'Contact Speedbox',
    
    // Brand references
    'MIT': 'Speedbox Team',
    'Scratch Foundation': 'Speedbox Foundation',
    'Massachusetts Institute of Technology': 'Speedbox Technologies',
    
    // Messages
    'Loading project...': 'Loading Speedbox project...',
    'Project loaded': 'Speedbox project ready',
    'Error loading project': 'Error loading Speedbox project',
    'Saving project...': 'Saving to Speedbox...',
    'Project saved': 'Speedbox project saved',
    
    // Buttons
    'Sign in': 'Sign in to Speedbox',
    'Sign out': 'Sign out',
    'Sign up': 'Create Speedbox Account',
    'Save project': 'Save to Speedbox',
    'Download project': 'Download Speedbox Project',
    
    // Settings
    'Settings': 'Speedbox Settings',
    'Profile': 'My SPEEDER Profile',
    'Account': 'Account Settings',
    'Privacy': 'Privacy Settings',
    'Notifications': 'Notifications',
};

/**
 * Deep text replacement function
 */
export function replaceAllText(rootElement = document.body) {
    const walker = document.createTreeWalker(
        rootElement,
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

        Object.entries(SPEEDBOX_TEXT_REPLACEMENTS).forEach(([oldText, newText]) => {
            if (text.includes(oldText)) {
                text = text.replace(new RegExp(oldText, 'g'), newText);
                modified = true;
            }
        });

        if (modified) {
            textNode.textContent = text;
        }
    });

    console.log('✓ Speedbox text replacements applied');
}

/**
 * Replace text in a specific element
 */
export function replaceTextInElement(element, oldText, newText) {
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    const nodesToReplace = [];
    let node;

    while (node = walker.nextNode()) {
        if (node.textContent.includes(oldText)) {
            nodesToReplace.push(node);
        }
    }

    nodesToReplace.forEach(textNode => {
        textNode.textContent = textNode.textContent.replace(new RegExp(oldText, 'g'), newText);
    });
}

/**
 * Listen for dynamic content changes
 */
export function observeTextChanges(rootElement = document.body) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
                        replaceAllText(node);
                    }
                });
            } else if (mutation.type === 'characterData') {
                replaceAllText(mutation.target.parentElement);
            }
        });
    });

    observer.observe(rootElement, {
        childList: true,
        subtree: true,
        characterData: true,
        characterDataOldValue: true
    });

    return observer;
}

export default {
    SPEEDBOX_TEXT_REPLACEMENTS,
    replaceAllText,
    replaceTextInElement,
    observeTextChanges
};
