// Safe patch for iframe environments to solve "Cannot set property fetch of #<Window> which has only a getter"
(function() {
  try {
    const target = typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : null);
    if (target) {
      let currentFetch = target.fetch;
      const patch = (obj: any) => {
        try {
          Object.defineProperty(obj, 'fetch', {
            get() {
              return currentFetch;
            },
            set(val) {
              currentFetch = val;
            },
            configurable: true,
            enumerable: true
          });
          return true;
        } catch (e) {
          return false;
        }
      };
      
      patch(target);
      if (typeof Window !== 'undefined' && Window.prototype) {
        patch(Window.prototype);
      }
      const proto = Object.getPrototypeOf(target);
      if (proto) {
        patch(proto);
        const nextProto = Object.getPrototypeOf(proto);
        if (nextProto) {
          patch(nextProto);
        }
      }
    }
  } catch (error) {
    console.warn('Failed to define customizable fetch getter/setter:', error);
  }
})();

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

