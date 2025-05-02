import React, { useContext } from "react";

import styled from "styled-components";

import { Box } from "../ui/box";
import { MotionBox } from "../ui/motion-box";
import { IntersectionContext } from "../ui/intersection-observer";

const Bar = styled(Box)`
  overflow: hidden;
  position: relative;
  border-radius: 16px;
`;

const BarFilling = styled(MotionBox)``;
BarFilling.defaultProps = {
  style: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  }
};

export interface ProgressBarProps {
  percents: number;
  caption?: string;
  duration?: number;
  delay?: number;
  easing?: string | [number, number, number, number];
  barWidth?: number;
  barHeight?: number;
  progressColor?: string;
  baseColor?: string;
}

export const ProgressBar = ({
  percents,
  caption,
  duration = 3,
  delay = 0.5,
  easing = "easeInOut", // [number, number, number, number] | "linear" | "easeIn" | "easeOut" | "easeInOut" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" | "backInOut" | "anticipate" | EasingFunction;
  barWidth = 300,
  barHeight = 24,
  progressColor = "#4F46E5",
  baseColor = "#ffffff"
}: ProgressBarProps ) => {
  const { inView } = useContext(IntersectionContext);

  const percentsOffset = (percents - 100) * (barWidth / 100);

  const transition = {
    duration: duration,
    delay: delay,
    ease: easing
  };

  const variants = {
    enter: {
      // opacity: 0,
      x: -barWidth
    },
    animate: {
      // opacity: 1,
      x: [-barWidth, percentsOffset],
      transition
    }
  };

  return (
    <div className="flex my-1">
      <Bar style={{ width: barWidth, height: barHeight, backgroundColor: baseColor }}>
        <BarFilling
          variants={variants}
          initial="enter"
          animate={inView ? "animate" : "enter"}
          exit="enter"
          style={{ backgroundColor: progressColor }}
        />
      </Bar>
    </div>
  );
};
