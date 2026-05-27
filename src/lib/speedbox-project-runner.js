/**
 * Speedbox Project Runner
 * Executes Scratch projects via project ID (Turbowarp-like functionality)
 * Supports loading projects from various sources
 */

export class SpeedboxProjectRunner {
    constructor() {
        this.projectCache = new Map();
        this.isRunning = false;
        this.currentProjectId = null;
    }

    /**
     * Load and run a Scratch project by ID
     * @param {string|number} projectId - Scratch project ID
     * @param {Object} options - Configuration options
     */
    async runProjectById(projectId, options = {}) {
        try {
            console.log(`🚀 Loading Speedbox project: ${projectId}`);
            
            // Check cache first
            if (this.projectCache.has(projectId)) {
                const project = this.projectCache.get(projectId);
                return this._executeProject(project, options);
            }

            // Fetch project data
            const projectData = await this.fetchProject(projectId);
            
            // Cache the project
            this.projectCache.set(projectId, projectData);
            
            // Execute the project
            return this._executeProject(projectData, options);
        } catch (error) {
            console.error(`✗ Failed to run project ${projectId}:`, error);
            throw error;
        }
    }

    /**
     * Fetch project data from Scratch API or local storage
     * @param {string|number} projectId - Project ID
     */
    async fetchProject(projectId) {
        const urls = [
            // Scratch API
            `https://api.scratch.mit.edu/projects/${projectId}`,
            // Alternative: Turbowarp-like endpoint
            `https://projects.scratch.mit.edu/${projectId}`
        ];

        for (const url of urls) {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    return await response.json();
                }
            } catch (error) {
                console.log(`Could not fetch from ${url}, trying next...`);
            }
        }

        throw new Error(`Could not fetch project ${projectId}`);
    }

    /**
     * Execute the project
     * @private
     */
    async _executeProject(projectData, options) {
        this.isRunning = true;
        this.currentProjectId = projectData.id;

        const config = {
            fullscreen: options.fullscreen || false,
            autoPlay: options.autoPlay !== false,
            turbo: options.turbo || false,
            highQualityPen: options.highQualityPen || true,
            renderer: options.renderer || 'canvas',
            ...options
        };

        // Initialize project runner
        const runner = {
            projectData,
            config,
            vm: null,
            canvas: null
        };

        return runner;
    }

    /**
     * Stop the current project
     */
    stopProject() {
        this.isRunning = false;
        this.currentProjectId = null;
        console.log('⏹ Project stopped');
    }

    /**
     * Create shareable link from project ID
     */
    getShareLink(projectId) {
        return `https://speedbox.io/project/${projectId}`;
    }

    /**
     * Get project info
     */
    async getProjectInfo(projectId) {
        try {
            const projectData = await this.fetchProject(projectId);
            return {
                id: projectData.id,
                title: projectData.title || 'Untitled',
                author: projectData.author?.username || 'Unknown',
                description: projectData.description || '',
                image: projectData.image || '',
                created: projectData.created || new Date().toISOString(),
                modified: projectData.modified || new Date().toISOString(),
                stats: {
                    views: projectData.stats?.views || 0,
                    loves: projectData.stats?.loves || 0,
                    comments: projectData.stats?.comments || 0,
                    favorites: projectData.stats?.favorites || 0
                }
            };
        } catch (error) {
            console.error('Failed to get project info:', error);
            return null;
        }
    }

    /**
     * Load project from URL parameters
     * Format: ?project=12345 or ?id=12345
     */
    loadFromUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const projectId = params.get('project') || params.get('id');
        
        if (projectId) {
            return this.runProjectById(projectId, { autoPlay: true });
        }
        
        return null;
    }

    /**
     * Clear project cache
     */
    clearCache(projectId = null) {
        if (projectId) {
            this.projectCache.delete(projectId);
        } else {
            this.projectCache.clear();
        }
    }

    /**
     * Get cache size
     */
    getCacheSize() {
        return this.projectCache.size;
    }
}

export default new SpeedboxProjectRunner();
