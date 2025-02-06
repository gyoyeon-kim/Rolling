import React, { useEffect, useRef } from "react";

const CursorEffect = () => {
  const trailCount = 3; 
  const trailRefs = useRef([...Array(trailCount)].map(() => React.createRef()));
  const positions = useRef(Array(trailCount).fill({ x: 0, y: 0 }));
  const target = useRef({ x: 0, y: 0 });

  const offsetX = 15; // 👉 마우스와 X축 간격
  const offsetY = 10; // 👉 마우스와 Y축 간격

  const lerp = (start, end, factor) => start + (end - start) * factor;

  useEffect(() => {
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
          ref.current.style.transform = `translate(${positions.current[index].x + offsetX}px, ${positions.current[index].y + offsetY}px)`; // 💡 오프셋 추가
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
  }, []);

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
