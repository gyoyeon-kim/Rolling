import React, { useEffect, useRef, useState } from "react";

const CursorEffect = () => {
  const [isMobile, setIsMobile] = useState(false); // 모바일 감지 상태
  const trailCount = 3;
  const trailRefs = useRef([...Array(trailCount)].map(() => React.createRef()));
  const positions = useRef(Array(trailCount).fill({ x: 0, y: 0 }));
  const target = useRef({ x: 0, y: 0 });

  const offsetX = 15;
  const offsetY = 10;

  const lerp = (start, end, factor) => start + (end - start) * factor;

  // 📱 모바일 화면 감지
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768); // 768px 이하이면 모바일로 간주
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // 📵 모바일에서는 효과 비활성화

    const handleMouseMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      positions.current = positions.current.map((pos, index) => {
        const prevPos = index === 0 ? target.current : positions.current[index - 1];
        return {
          x: lerp(pos.x, prevPos.x, 0.2),
          y: lerp(pos.y, prevPos.y, 0.2),
        };
      });

      trailRefs.current.forEach((ref, index) => {
        if (ref.current) {
          ref.current.style.transform = `translate(${positions.current[index].x + offsetX}px, ${positions.current[index].y + offsetY}px)`;
          ref.current.style.opacity = `${0.7 - index * 0.1}`;
        }
      });

      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile]);

  if (isMobile) return null; // 📵 모바일일 경우 렌더링하지 않음

  return (
    <>
      {trailRefs.current.map((ref, index) => (
        <div
          key={index}
          ref={ref}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            fontSize: `${24 - index * 2}px`,
            pointerEvents: "none",
            transition: "transform 0.05s ease-out",
            zIndex: 9999,
            opacity: 0.7 - index * 0.1,
          }}
        >
          💌
        </div>
      ))}
    </>
  );
};

export default CursorEffect;
