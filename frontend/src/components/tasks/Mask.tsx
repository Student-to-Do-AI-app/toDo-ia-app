// src/components/LoadingMask.tsx
import React from "react";
import "./Mask.css";

interface LoadingMaskProps {
  active: boolean;
}

const LoadingMask: React.FC<LoadingMaskProps> = ({ active }) => {
  if (!active) return null;

  return (
    <div className="loading-mask">
      <div className="loader"></div>
    </div>
  );
};

export default LoadingMask;
