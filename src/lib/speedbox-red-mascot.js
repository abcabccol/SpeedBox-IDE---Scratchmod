/**
 * Speedbox Red Cat Mascot Component
 * Transforms default Scratch cat into a red smiling box mascot
 */

export class SpeedboxRedCatMascot {
    static createRedSmilingBox(width = 100, height = 100) {
        const svg = `
            <svg width="${width}" height="${height}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#FF4444;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#DC143C;stop-opacity:1" />
                    </linearGradient>
                    <filter id="shadow">
                        <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.3"/>
                    </filter>
                </defs>
                
                <!-- Main red box body -->
                <rect x="10" y="15" width="80" height="70" rx="8" fill="url(#redGradient)" filter="url(#shadow)" stroke="#8B0000" stroke-width="2"/>
                
                <!-- Left eye -->
                <circle cx="30" cy="35" r="8" fill="white" stroke="#000" stroke-width="1"/>
                <circle cx="30" cy="35" r="5" fill="#000"/>
                <circle cx="32" cy="33" r="2" fill="white"/>
                
                <!-- Right eye -->
                <circle cx="70" cy="35" r="8" fill="white" stroke="#000" stroke-width="1"/>
                <circle cx="70" cy="35" r="5" fill="#000"/>
                <circle cx="72" cy="33" r="2" fill="white"/>
                
                <!-- Happy mouth (big smile) -->
                <path d="M 35 55 Q 50 68 65 55" stroke="#000" stroke-width="3" fill="none" stroke-linecap="round"/>
                
                <!-- Cheek blush left -->
                <circle cx="18" cy="50" r="6" fill="#FF6B6B" opacity="0.6"/>
                
                <!-- Cheek blush right -->
                <circle cx="82" cy="50" r="6" fill="#FF6B6B" opacity="0.6"/>
                
                <!-- Speedbox label on chest -->
                <text x="50" y="75" font-size="12" font-weight="bold" fill="white" text-anchor="middle" font-family="Arial">SPEEDBOX</text>
            </svg>
        `;
        
        return `data:image/svg+xml;base64,${btoa(svg)}`;
    }

    static createMascotElement() {
        const img = document.createElement('img');
        img.src = this.createRedSmilingBox(120, 120);
        img.alt = 'Speedbox Mascot';
        img.style.maxWidth = '120px';
        img.style.maxHeight = '120px';
        img.style.margin = '10px auto';
        img.className = 'speedbox-mascot';
        return img;
    }

    static replaceScratchCat() {
        // Look for default Scratch cat images
        const patterns = [
            'img[alt="Scratch cat"]',
            'img[src*="cat"]',
            '.sprite-selector img',
            '[class*="cat-sprite"]'
        ];

        patterns.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                const mascotImg = document.createElement('img');
                mascotImg.src = this.createRedSmilingBox(el.width || 100, el.height || 100);
                mascotImg.alt = 'Speedbox Red Smiling Box';
                mascotImg.className = 'speedbox-mascot-replacement';
                mascotImg.style.width = el.style.width || 'auto';
                mascotImg.style.height = el.style.height || 'auto';
                el.parentNode.replaceChild(mascotImg, el);
            });
        });
    }
}

export default SpeedboxRedCatMascot;