import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from './errorBoundary'
import { Decision } from './decision'

// Render your React component instead
const domContainer = createRoot(document.querySelector('#decision_container')!)

// @ts-ignore
domContainer.render(<ErrorBoundary><Decision decision={window.decision} onUpdate={x => window.updateDecision(x)} /></ErrorBoundary>);

