/**
 * Speedbox Branding Configuration
 * Red theme colors, branding strings, and text replacements
 */

export const SPEEDBOX_THEME = {
    primary: '#DC143C', // Crimson Red
    primaryLight: '#FF6B7A', // Light Red
    primaryDark: '#8B0000', // Dark Red
    secondary: '#FF4444', // Bright Red
    accent: '#FF6666', // Accent Red
    background: '#FFEBEE', // Very Light Red
    success: '#FF5555',
    error: '#8B0000',
    warning: '#FF7777',
    info: '#FF6B6B',
};

export const SPEEDBOX_BRANDING = {
    name: 'Speedbox IDE',
    description: 'Speedbox IDE - Advanced Visual Programming Platform',
    baseUrl: 'https://speedbox.io',
    textReplacements: {
        'Scratch': 'Speedbox',
        'scratch': 'speedbox',
        'Scratcher': 'SPEEDER',
        'scratcher': 'speeder',
        'MIT': 'Speedbox',
        'Scratch Foundation': 'Speedbox Team',
    },
    brandColor: '#DC143C',
    brandName: 'Speedbox',
};

/**
 * Advanced text replacement map for UI consistency
 */
export const ADVANCED_TEXT_REPLACEMENTS = {
    'Become a Scratcher': 'Become a SPEEDER',
    'You\'re a Scratcher': 'You\'re a SPEEDER',
    'Scratcher status': 'SPEEDER status',
    'Scratch Community': 'Speedbox Community',
    'Scratch Project': 'Speedbox Project',
    'Share on Scratch': 'Share on Speedbox',
    'View on Scratch': 'View on Speedbox',
    'Scratch Stats': 'Speedbox Stats',
};

export default {
    SPEEDBOX_THEME,
    SPEEDBOX_BRANDING,
    ADVANCED_TEXT_REPLACEMENTS,
};
