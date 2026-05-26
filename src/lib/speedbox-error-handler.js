/**
 * Speedbox Error Handler & Auto-Recovery
 * Handles server errors and attempts automatic recovery
 */

class SpeedboxErrorHandler {
    constructor() {
        this.errorCount = 0;
        this.maxRetries = 3;
        this.retryDelay = 2000;
        this.isRecovering = false;
    }

    init() {
        this.setupGlobalErrorHandlers();
        this.monitorServerHealth();
        this.setupImageErrorHandling();
        console.log('✓ Speedbox Error Handler initialized');
    }

    setupGlobalErrorHandlers() {
        window.addEventListener('error', (event) => {
            this.handleError(event.error || event.message);
        });

        window.addEventListener('unhandledrejection', (event) => {
            this.handleError(event.reason);
        });

        window.addEventListener('offline', () => {
            this.handleNetworkError();
        });

        window.addEventListener('online', () => {
            this.attemptRecovery();
        });
    }

    monitorServerHealth() {
        setInterval(() => {
            this.checkServerHealth();
        }, 10000);
    }

    async checkServerHealth() {
        try {
            const response = await fetch('/health-check', { 
                method: 'HEAD'
            });
            
            if (!response.ok) {
                this.handleServerError();
            } else {
                this.errorCount = 0;
            }
        } catch (error) {
            this.handleServerError();
        }
    }

    handleServerError() {
        this.errorCount++;
        
        if (this.errorCount === 1) {
            console.warn('⚠️ Server error detected. Attempting recovery...');
            this.attemptRecovery();
        } else if (this.errorCount > this.maxRetries) {
            this.showErrorUI();
        }
    }

    handleNetworkError() {
        console.error('❌ Network disconnected');
        this.showNetworkError();
    }

    async attemptRecovery() {
        if (this.isRecovering) return;
        
        this.isRecovering = true;
        console.log('🔄 Attempting automatic recovery...');

        for (let i = 1; i <= this.maxRetries; i++) {
            await this.delay(this.retryDelay);
            
            try {
                const response = await fetch('/health-check', { 
                    method: 'HEAD'
                });
                
                if (response.ok) {
                    console.log('✓ Recovery successful!');
                    this.hideErrorUI();
                    this.errorCount = 0;
                    this.isRecovering = false;
                    location.reload();
                    return;
                }
            } catch (error) {
                console.warn(`Recovery attempt ${i}/${this.maxRetries} failed`);
            }
        }

        this.showErrorUI();
        this.isRecovering = false;
    }

    setupImageErrorHandling() {
        document.addEventListener('error', (event) => {
            if (event.target.tagName === 'IMG') {
                this.handleImageError(event.target);
            }
        }, true);
    }

    handleImageError(imgElement) {
        console.warn(`Image failed to load: ${imgElement.src}`);
        const errorSVG = this.createErrorImage();
        imgElement.src = errorSVG;
        imgElement.alt = ':( Image Error';
        imgElement.style.opacity = '0.7';
    }

    createErrorImage() {
        const svg = `
            <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="200" fill="#FFE6E6"/>
                <circle cx="100" cy="100" r="95" fill="none" stroke="#DC143C" stroke-width="2"/>
                <circle cx="80" cy="80" r="8" fill="#DC143C"/>
                <circle cx="120" cy="80" r="8" fill="#DC143C"/>
                <path d="M 75 120 Q 100 105 125 120" stroke="#DC143C" stroke-width="3" fill="none" stroke-linecap="round"/>
                <text x="100" y="160" font-size="14" fill="#DC143C" text-anchor="middle" font-weight="bold">:( ERROR</text>
            </svg>
        `;
        return `data:image/svg+xml;base64,${btoa(svg)}`;
    }

    showErrorUI() {
        if (document.getElementById('speedbox-error-overlay')) {
            return;
        }

        const overlay = document.createElement('div');
        overlay.id = 'speedbox-error-overlay';
        overlay.innerHTML = `
            <div class="speedbox-error-container">
                <div class="speedbox-error-content">
                    <svg class="speedbox-error-icon" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <rect width="200" height="200" fill="#FFE6E6"/>
                        <circle cx="100" cy="100" r="95" fill="none" stroke="#DC143C" stroke-width="2"/>
                        <circle cx="80" cy="80" r="8" fill="#DC143C"/>
                        <circle cx="120" cy="80" r="8" fill="#DC143C"/>
                        <path d="M 75 120 Q 100 105 125 120" stroke="#DC143C" stroke-width="3" fill="none" stroke-linecap="round"/>
                        <text x="100" y="160" font-size="14" fill="#DC143C" text-anchor="middle" font-weight="bold">:( ERROR</text>
                    </svg>
                    <h1>:( Sunucu Hatası</h1>
                    <p>Speedbox sunucusu şu anda kullanılamıyor.</p>
                    <p class="speedbox-error-status">Otomatik kurtarma deneniyor...</p>
                    <div class="speedbox-error-actions">
                        <button onclick="location.reload()" class="speedbox-btn-retry">Sayfayı Yenile</button>
                        <button onclick="document.getElementById('speedbox-error-overlay').remove()" class="speedbox-btn-dismiss">Kapat</button>
                    </div>
                    <div class="speedbox-error-details">
                        <small>Sonraki kontrol: <span id="speedbox-countdown">10</span>s</small>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        this.startCountdown();
    }

    hideErrorUI() {
        const overlay = document.getElementById('speedbox-error-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        }
    }

    showNetworkError() {
        if (document.getElementById('speedbox-network-error')) {
            return;
        }

        const banner = document.createElement('div');
        banner.id = 'speedbox-network-error';
        banner.innerHTML = `
            <div class="speedbox-network-error-banner">
                <span class="speedbox-network-error-icon">📡</span>
                <span class="speedbox-network-error-text">İnternet Bağlantısı Kesildi</span>
            </div>
        `;

        document.body.insertBefore(banner, document.body.firstChild);
    }

    handleError(error) {
        console.error('Speedbox Error:', error);
        
        if (error && error.message && error.message.includes('Failed to fetch')) {
            this.handleServerError();
        }
    }

    startCountdown() {
        let countdown = 10;
        const countdownEl = document.getElementById('speedbox-countdown');
        
        const interval = setInterval(() => {
            countdown--;
            if (countdownEl) {
                countdownEl.textContent = countdown;
            }
            
            if (countdown <= 0) {
                clearInterval(interval);
                this.attemptRecovery();
            }
        }, 1000);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

const speedboxErrorHandler = new SpeedboxErrorHandler();
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => speedboxErrorHandler.init());
} else {
    speedboxErrorHandler.init();
}

export default speedboxErrorHandler;
