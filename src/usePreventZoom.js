import React, { useEffect, useState ,useRef} from 'react';

function UsePreventZoom(scrollCheck = true, keyboardCheck = true, touchCheck = true) {
  const [lastTapTime, setLastTapTime] = useState(0);

  useEffect(() => {
    const handleKeydown = (e) => {
      if (
        keyboardCheck &&
        e.ctrlKey &&
        (e.keyCode === 61 ||
          e.keyCode === 107 ||
          e.keyCode === 173 ||
          e.keyCode === 109 ||
          e.keyCode === 187 ||
          e.keyCode === 189)
      ) {
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
        // Prevent default action if more than one finger is used (pinch gesture)
        e.preventDefault();
      }
    };

    const lastTapTimeRef = useRef(new Date().getTime());

    const handleTouchEnd = (e) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTapTimeRef.current;
      if (touchCheck && tapLength < 500 && tapLength > 0) {
        e.preventDefault();
      }
      lastTapTimeRef.current = currentTime;
    };
    

    // Add event listeners
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollCheck, keyboardCheck, touchCheck, lastTapTime]);

  return null;
}

export default UsePreventZoom;
