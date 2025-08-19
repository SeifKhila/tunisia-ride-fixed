import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
import './index.css'

// Simple test component
const TestApp = () => {
  return <div style={{padding: '20px', color: 'black', backgroundColor: 'white'}}>
    <h1>Test App - If you see this, React is working!</h1>
    <p>This is a test to see if React is loading properly.</p>
  </div>;
};

console.log('Starting app...');
const rootElement = document.getElementById("root");
console.log('Root element:', rootElement);

if (rootElement) {
  try {
    console.log('Creating root and rendering TestApp...');
    createRoot(rootElement).render(<TestApp />);
    console.log('TestApp rendered successfully');
  } catch (error) {
    console.error('Error rendering app:', error);
  }
} else {
  console.error('Root element not found!');
}
