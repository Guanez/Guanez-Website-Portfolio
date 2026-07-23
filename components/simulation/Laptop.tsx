"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface LaptopProps {
  children: ReactNode;
  openness?: number;
  tilt?: number;
  typing?: boolean;
}

/**
 * CSS-only laptop mockup.
 * - MacBook-style frame with bezels, webcam notch, hinge, and keyboard
 * - `children` render directly inside the screen area — no 3D, no z-fighting
 * - `openness` 0→1 animates the lid open via CSS perspective + rotateX
 * - `typing` adds a subtle glow pulse on the keyboard area
 */
export default function Laptop({ children, openness = 1, tilt = 12, typing = false }: LaptopProps) {
  // Lid rotates from -90deg (closed, flat on base) to 0deg (fully open)
  const lidAngle = -90 + openness * 90;

  return (
    <div
      className="relative"
      style={{ width: "min(86vw, 780px)" }}
    >
      <motion.div
        className="w-full"
        style={{
          perspective: "1200px",
          transform: `rotateX(${tilt}deg)`,
        }}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* === LID (screen housing) === */}
        <motion.div
          style={{
            transformOrigin: "bottom center",
            rotateX: lidAngle,
            transformStyle: "preserve-3d",
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="relative rounded-t-[12px] border border-[#2a2e35]/80 overflow-hidden"
            style={{
              background: "linear-gradient(180deg, #1e2228 0%, #1a1d22 100%)",
              boxShadow:
                "0 -2px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Webcam notch */}
            <div className="flex items-center justify-center py-[5px]">
              <div className="relative flex items-center gap-1">
                <div
                  className="h-[5px] w-[5px] rounded-full"
                  style={{
                    background: "radial-gradient(circle, #1a1d22 40%, #0f1215 100%)",
                    boxShadow: "inset 0 0 1px rgba(255,255,255,0.1)",
                  }}
                />
                <div
                  className="absolute -right-2 top-1/2 -translate-y-1/2 h-[2px] w-[2px] rounded-full"
                  style={{
                    background: "#7cf5c4",
                    boxShadow: "0 0 4px #7cf5c4, 0 0 8px #7cf5c4",
                  }}
                />
              </div>
            </div>

            {/* Screen area — children render here */}
            <div className="mx-[6px] mb-[6px]">
              <div
                className="relative w-full overflow-hidden rounded-[4px]"
                style={{ aspectRatio: "16 / 10" }}
              >
                {children}
              </div>
            </div>
          </div>
        </motion.div>

        {/* === HINGE === */}
        <div
          className="mx-auto h-[4px] rounded-b-sm"
          style={{
            width: "92%",
            background: "linear-gradient(180deg, #333840 0%, #22262b 100%)",
            boxShadow: "0 1px 2px rgba(0,0,0,0.4)",
          }}
        />

        {/* === BASE === */}
        <div
          className="relative rounded-b-[10px] overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #22262b 0%, #1a1d22 100%)",
            boxShadow:
              "0 6px 30px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
            border: "1px solid #2a2e35",
            borderTop: "none",
          }}
        >
          {/* Keyboard area */}
          <div className="px-[10%] pt-[6%] pb-[3%]">
            <div className="relative">
              {/* Key rows */}
              {[0, 1, 2, 3, 4].map((row) => (
                <div key={row} className="flex gap-[2px] mb-[2px] justify-center">
                  {Array.from({ length: row === 4 ? 10 : 13 }).map((_, col) => (
                    <div
                      key={col}
                      className="rounded-[2px] transition-colors duration-100"
                      style={{
                        width: row === 4 && col === 4 ? "18%" : "6.8%",
                        aspectRatio: row === 4 && col === 4 ? "5 / 1" : "1 / 1",
                        background:
                          typing && Math.random() > 0.92
                            ? "linear-gradient(180deg, rgba(124,245,196,0.15) 0%, rgba(124,245,196,0.05) 100%)"
                            : "linear-gradient(180deg, #1e2228 0%, #16191e 100%)",
                        boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.04), 0 1px 1px rgba(0,0,0,0.3)",
                      }}
                    />
                  ))}
                </div>
              ))}

              {/* Typing glow overlay */}
              {typing && (
                <motion.div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  animate={{ opacity: [0, 0.15, 0] }}
                  transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 0.08 }}
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(124,245,196,0.2) 0%, transparent 70%)",
                  }}
                />
              )}
            </div>
          </div>

          {/* Trackpad */}
          <div className="flex justify-center pb-[5%]">
            <div
              className="rounded-[4px]"
              style={{
                width: "30%",
                aspectRatio: "3 / 2",
                background: "linear-gradient(180deg, #1a1d22 0%, #15181c 100%)",
                boxShadow:
                  "inset 0 0.5px 0 rgba(255,255,255,0.04), 0 0 0 0.5px rgba(255,255,255,0.03)",
              }}
            />
          </div>
        </div>

        {/* Front lip edge */}
        <div
          className="mx-auto h-[2px] rounded-b-full"
          style={{
            width: "18%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
          }}
        />
      </motion.div>
    </div>
  );
}
