export async function initDeclarativeTracking(sdk) {
  let combinedEvents = [...(sdk.config.events || [])];

  if (sdk.config.eventConfigUrl) {
    try {
      const response = await fetch(sdk.config.eventConfigUrl);
      if (response.ok) {
        const urlEvents = await response.json();
        if (Array.isArray(urlEvents)) {
          combinedEvents = combinedEvents.concat(urlEvents);
        } else if (urlEvents && Array.isArray(urlEvents.events)) {
          combinedEvents = combinedEvents.concat(urlEvents.events);
        }
      } else {
        console.warn(`EngageSDK: Failed to load event config from ${sdk.config.eventConfigUrl}`);
      }
    } catch (e) {
      console.error("EngageSDK: Error fetching event config:", e);
    }
  }

  if (combinedEvents.length === 0) return;

  const eventsByType = {};

  combinedEvents.forEach(cfg => {
    let eventType = cfg.on || 'click';
    if (eventType === 'hover') eventType = 'mouseenter';
    
    if (!eventsByType[eventType]) {
      eventsByType[eventType] = [];
    }
    eventsByType[eventType].push(cfg);
  });

  Object.keys(eventsByType).forEach(eventType => {
    const useCapture = ['scroll', 'mouseenter', 'mouseleave', 'focus', 'blur'].includes(eventType);
    
    // Throttle scroll slightly to avoid massive event spam
    let scrollTimeout;

    document.addEventListener(eventType, (e) => {
      const target = e.target;
      
      const fireEvent = () => {
        eventsByType[eventType].forEach(cfg => {
          let matches = false;
          if (target && target instanceof Element) {
            matches = target.matches(cfg.selector) || !!target.closest(cfg.selector);
          } else if (target === document || target === window) {
            matches = cfg.selector === 'window' || cfg.selector === 'document' || cfg.selector === 'body';
          }

          if (matches) {
            sdk.track(cfg.name, { ...cfg.metadata, timestamp: new Date().toISOString() });
          }
        });
      };

      if (eventType === 'scroll') {
        if (!scrollTimeout) {
          scrollTimeout = setTimeout(() => {
            fireEvent();
            scrollTimeout = null;
          }, 500); // 500ms throttle for scroll events
        }
      } else {
        fireEvent();
      }
    }, useCapture);
  });
}
