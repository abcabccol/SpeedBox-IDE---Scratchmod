/**
 * Image Error Placeholder Generator
 * Creates fallback SVG images with error messages
 */

export class SpeedboxImagePlaceholder {
    static createErrorPlaceholder(width = 200, height = 200, message = ':( ERROR') {
        const svg = `
            <svg width="${width}" height="${height}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="errorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#FFE6E6;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFD6D6;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="200" height="200" fill="url(#errorGradient)"/>
                <rect width="200" height="200" fill="none" stroke="#DC143C" stroke-width="2"/>
                <circle cx="70" cy="80" r="10" fill="#DC143C"/>
                <circle cx="130" cy="80" r="10" fill="#DC143C"/>
                <path d="M 60 130 Q 100 110 140 130" stroke="#DC143C" stroke-width="4" fill="none" stroke-linecap="round"/>
                <text x="100" y="170" font-size="16" font-weight="bold" fill="#8B0000" text-anchor="middle" font-family="Arial">${message}</text>
            </svg>
        `;
        
        return `data:image/svg+xml;base64,${btoa(svg)}`;
    }

    static replaceImage(imgElement, type = 'error') {
        const width = imgElement.width || 200;
        const height = imgElement.height || 200;
        const placeholder = this.createErrorPlaceholder(width, height);
        
        imgElement.src = placeholder;
        imgElement.alt = ':( Resim Yükleme Hatası';
        imgElement.style.opacity = '0.85';
    }
}

export default SpeedboxImagePlaceholder;
