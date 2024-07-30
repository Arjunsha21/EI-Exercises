// Singleton Pattern: Configuration Manager

class ConfigurationManager {
    private static instance: ConfigurationManager;
    private config: { [key: string]: string } = {};

    private constructor() {}

    static getInstance(): ConfigurationManager {
        if (!ConfigurationManager.instance) {
            ConfigurationManager.instance = new ConfigurationManager();
        }
        return ConfigurationManager.instance;
    }

    setConfig(key: string, value: string): void {
        this.config[key] = value;
    }

    getConfig(key: string): string | undefined {
        return this.config[key];
    }
}

// Client Code
const configManager1 = ConfigurationManager.getInstance();
configManager1.setConfig('apiUrl', 'https://api.example.com');

const configManager2 = ConfigurationManager.getInstance();
console.log(configManager2.getConfig('apiUrl')); // Output: https://api.example.com

console.log(configManager1 === configManager2); // Output: true
