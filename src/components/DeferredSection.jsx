import { useEffect, useRef, useState } from "react";

const DeferredSection = ({
  children,
  className,
  id,
  minHeight,
  rootMargin = "300px 0px",
  style,
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || isVisible) return undefined;

    let idleCallbackId;
    let timeoutId;

    const revealSection = () => {
      setIsVisible(true);
    };

    if ("requestIdleCallback" in window) {
      idleCallbackId = window.requestIdleCallback(revealSection, {
        timeout: 1500,
      });
    } else {
      timeoutId = window.setTimeout(revealSection, 500);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealSection();
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (idleCallbackId) {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [isVisible, rootMargin]);

  return (
    <div ref={ref} id={id} className={className} style={{ minHeight, ...style }}>
      {isVisible ? children : null}
    </div>
  );
};

export default DeferredSection;
