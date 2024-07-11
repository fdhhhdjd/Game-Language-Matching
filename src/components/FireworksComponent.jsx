import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

const FireworksComponent = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3, // Tăng số lượng hạt
        angle: 60,
        spread: 120, // Tăng góc phân tán
        origin: { x: 0 },
        decay: 0.95, // Thêm giảm dần để kéo dài thời gian tồn tại của hạt
        scalar: 1.2, // Tăng kích thước của hạt
      });
      confetti({
        particleCount: 2, // Tăng số lượng hạt
        angle: 120,
        spread: 120, // Tăng góc phân tán
        origin: { x: 1 },
        decay: 0.95, // Thêm giảm dần để kéo dài thời gian tồn tại của hạt
        scalar: 1.2, // Tăng kích thước của hạt
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default FireworksComponent;
