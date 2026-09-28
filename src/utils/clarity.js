/**
 * Microsoft Clarity Analytics Integration Module
 * Handles session recording, heatmap tracking, and custom event logging.
 */

/**
 * Initializes Microsoft Clarity analytics script.
 * @param {string} [customProjectId] - Optional Project ID to override environment variable.
 */
export function initClarity(customProjectId) {
  const projectId = customProjectId || import.meta.env.VITE_CLARITY_PROJECT_ID;

  if (!projectId) {
    // Info log in development mode when key is absent
    console.info('[Clarity Analytics] Skipping initialization: VITE_CLARITY_PROJECT_ID is not set in environment.');
    return;
  }

  // Prevent duplicate script injection
  if (window.clarity) return;

  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", projectId);

  if (import.meta.env.DEV) {
    console.log('[Clarity Analytics] Initialized with Project ID:', projectId);
  }
}

/**
 * Logs a custom event to Microsoft Clarity.
 * @param {string} eventName - Name of the custom event (e.g. 'resume_download')
 * @param {string|Object} [value] - Optional metadata or value associated with the event
 */
export function trackClarityEvent(eventName, value) {
  if (typeof window.clarity === 'function') {
    window.clarity("event", eventName, value);
  }
}

/**
 * Sets a custom tag (dimension) in Microsoft Clarity.
 * @param {string} key - Tag name (e.g. 'theme', 'viewport')
 * @param {string} value - Tag value
 */
export function setClarityTag(key, value) {
  if (typeof window.clarity === 'function') {
    window.clarity("set", key, value);
  }
}
