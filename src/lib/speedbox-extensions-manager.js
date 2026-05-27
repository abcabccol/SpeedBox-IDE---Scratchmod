/**
 * Speedbox Extensions Manager
 * Manages custom extensions: 3D Puppets, JS, TS, Python, AI, HTML, CSS, Vite, etc.
 */

export class SpeedboxExtensionsManager {
    constructor() {
        this.extensions = [];
        this.initializeExtensions();
    }

    initializeExtensions() {
        this.extensions = [
            {
                id: '3d-puppet',
                name: '3D Puppet',
                description: 'Create 3D animated characters and models',
                icon: '🎭',
                category: 'media',
                blocks: [
                    { name: 'Create 3D Model', type: 'command' },
                    { name: 'Rotate 3D', type: 'command' },
                    { name: 'Scale 3D Model', type: 'command' },
                    { name: '3D Position', type: 'reporter' }
                ]
            },
            {
                id: 'javascript',
                name: 'JavaScript',
                description: 'Write JavaScript code blocks',
                icon: '⚡',
                category: 'code',
                blocks: [
                    { name: 'Run JavaScript', type: 'command' },
                    { name: 'JS Function', type: 'reporter' },
                    { name: 'Execute JS', type: 'command' },
                    { name: 'JS Console Log', type: 'command' }
                ]
            },
            {
                id: 'typescript',
                name: 'TypeScript',
                description: 'Typed JavaScript with TypeScript',
                icon: '📘',
                category: 'code',
                blocks: [
                    { name: 'Define Type', type: 'command' },
                    { name: 'Run TypeScript', type: 'command' },
                    { name: 'TS Interface', type: 'command' },
                    { name: 'Type Check', type: 'reporter' }
                ]
            },
            {
                id: 'python',
                name: 'Python',
                description: 'Python code execution blocks',
                icon: '🐍',
                category: 'code',
                blocks: [
                    { name: 'Run Python', type: 'command' },
                    { name: 'Python Function', type: 'reporter' },
                    { name: 'Execute Python Script', type: 'command' },
                    { name: 'Python Output', type: 'reporter' }
                ]
            },
            {
                id: 'ai',
                name: 'AI',
                description: 'Artificial Intelligence blocks (ML, Neural Networks)',
                icon: '🤖',
                category: 'ai',
                blocks: [
                    { name: 'Train Model', type: 'command' },
                    { name: 'Predict', type: 'reporter' },
                    { name: 'Load AI Model', type: 'command' },
                    { name: 'AI Confidence', type: 'reporter' },
                    { name: 'Neural Network Layer', type: 'command' }
                ]
            },
            {
                id: 'html',
                name: 'HTML',
                description: 'Create and manipulate HTML elements',
                icon: '📄',
                category: 'web',
                blocks: [
                    { name: 'Create HTML Element', type: 'command' },
                    { name: 'Set HTML Content', type: 'command' },
                    { name: 'HTML Class', type: 'command' },
                    { name: 'Get HTML Element', type: 'reporter' }
                ]
            },
            {
                id: 'css',
                name: 'CSS',
                description: 'Style elements with CSS',
                icon: '🎨',
                category: 'web',
                blocks: [
                    { name: 'Set CSS Style', type: 'command' },
                    { name: 'Add CSS Class', type: 'command' },
                    { name: 'CSS Animation', type: 'command' },
                    { name: 'Get CSS Property', type: 'reporter' }
                ]
            },
            {
                id: 'vite',
                name: 'Vite (Web)',
                description: 'Build and deploy web projects with Vite',
                icon: '⚡',
                category: 'build',
                blocks: [
                    { name: 'Build Project', type: 'command' },
                    { name: 'Deploy to Web', type: 'command' },
                    { name: 'Vite Config', type: 'command' },
                    { name: 'Preview Project', type: 'command' }
                ]
            },
            {
                id: 'ai-extended',
                name: 'AI Extended',
                description: 'Advanced AI features (Computer Vision, NLP, etc.)',
                icon: '🧠',
                category: 'ai',
                blocks: [
                    { name: 'Detect Objects', type: 'reporter' },
                    { name: 'Text Analysis', type: 'reporter' },
                    { name: 'Image Recognition', type: 'reporter' },
                    { name: 'Speech Recognition', type: 'command' },
                    { name: 'Text to Speech', type: 'command' },
                    { name: 'Face Detection', type: 'reporter' }
                ]
            }
        ];
    }

    getExtensions() {
        return this.extensions;
    }

    getExtension(id) {
        return this.extensions.find(ext => ext.id === id);
    }

    getExtensionsByCategory(category) {
        return this.extensions.filter(ext => ext.category === category);
    }

    loadExtension(id) {
        const extension = this.getExtension(id);
        if (extension) {
            console.log(`✓ Loaded extension: ${extension.name}`);
            return extension;
        } else {
            console.error(`✗ Extension not found: ${id}`);
            return null;
        }
    }

    registerCustomExtension(extensionData) {
        if (!extensionData.id || !extensionData.name) {
            console.error('Extension must have id and name');
            return false;
        }
        this.extensions.push(extensionData);
        console.log(`✓ Custom extension registered: ${extensionData.name}`);
        return true;
    }
}

export default new SpeedboxExtensionsManager();