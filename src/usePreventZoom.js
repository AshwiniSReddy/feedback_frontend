import { useEffect } from 'react';

function UsePreventZoom(scrollCheck = true, keyboardCheck = true, touchCheck = true) {
  useEffect(() => {
    const handleKeydown = (e) => {
      if (keyboardCheck && e.ctrlKey && [61, 107, 173, 109, 187, 189].includes(e.keyCode)) {
        e.preventDefault();
      }
    };

    const handleWheel = (e) => {
      if (scrollCheck && e.ctrlKey) {
        e.preventDefault();
      }
    };

    const handleTouchMove = (e) => {
      if (touchCheck && e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e) => {
      if (touchCheck) {
        const timeBetweenTaps = e.timeStamp - this.lastTap;
        if (timeBetweenTaps < 500 && timeBetweenTaps > 0) {
          e.preventDefault();
        }
        this.lastTap = e.timeStamp;
      }
    };

    // Add event listeners with capture: true
    document.addEventListener('keydown', handleKeydown, { passive: false, capture: true });
    document.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: false, capture: true });

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeydown, { capture: true });
      document.removeEventListener('wheel', handleWheel, { capture: true });
      document.removeEventListener('touchmove', handleTouchMove, { capture: true });
      document.removeEventListener('touchend', handleTouchEnd, { capture: true });
    };
  }, [scrollCheck, keyboardCheck, touchCheck]);

  return null;
}

export default UsePreventZoom;
