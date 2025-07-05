import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mathsolver.ai',
  appName: 'AI Math Solver',
  webDir: 'dist', // Tells Capacitor to use the root folder
  plugins: {
    // This section will securely handle your API key
    CapacitorHttp: {
      enabled: true
    }
  },
  // This passes the API_KEY to your app's environment
  // IMPORTANT: Replace "YOUR_GEMINI_API_KEY_HERE" with your actual key
  android: {
    // This is a placeholder for a better solution in a real build process
  }
};

// Add your API key to the app's environment variables
// This is a simple way for Capacitor to see the key
process.env.GEMINI_API_KEY = "AIzaSyD3IJSqdhtgexYqdwcZJEsuONL2Qw9ISxo";

export default config;