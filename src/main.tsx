import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { sprig } from '@sprig-technologies/sprig-browser';
import mixpanel from "mixpanel-browser";
import { createLDReactProvider, type LDContext } from '@launchdarkly/react-sdk';

sprig.configure({
  environmentId: window.location.host === 'localhost:5173' ? 'LLL0hxW9pJRs' : 'KNdk_fZsAYt0'
})

// Position Sprig in-product surveys at the bottom center of the page
const sprigSurveyPositionStyle = document.createElement('style');
sprigSurveyPositionStyle.textContent = `
  /* #ul-frame is the selector for the survey iframe */
  #ul-frame {
    right: auto !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    bottom: 0 !important;
    margin: 0 !important;
  }
`;
document.head.appendChild(sprigSurveyPositionStyle);

mixpanel.init("5caba7a1ad87fb58cde05d9945f6d433", {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
  record_sessions_percent: 0, //records 0% of all sessions
  record_heatmap_data: true,
});

// Initialize LaunchDarkly
const context: LDContext = {
  kind: 'user',
  key: 'EXAMPLE_CONTEXT_KEY',
  email: 'biz@face.dev',
};

const LDReactProvider = createLDReactProvider('6a960e98773f1b0a7dd10a26', context);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LDReactProvider>
      <App />
    </LDReactProvider>
  </StrictMode>,
)
