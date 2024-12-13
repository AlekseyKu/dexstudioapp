// src/components/homeFluidAnimation.tsx
import React, { useEffect, useRef } from 'react';
import FluidAnimation, { IAnimationConfig } from '@usertive/react-fluid-animation';

const config: IAnimationConfig = {
  textureDownsample: 2,
  densityDissipation: 0.98,
  velocityDissipation: 0.99,
  pressureDissipation: 0.8,
  pressureIterations: 20,
  curl: 30,
  splatRadius: 0.004,
  colorsPool: ['#ff0000', '#00ff00', '#0000ff']
};

const FluidAnimationComponent: React.FC = () => {
  const animationRef = useRef<FluidAnimation | null>(null);

  useEffect(() => {
    // При необходимости можно добавить логику сплэшей или реакций на смену цвета
  }, []);

  return (
    <div style={{ position: 'absolute', top:0, left:0, width: '100%', height: '100%', zIndex:0 }}>
      <FluidAnimation ref={animationRef} config={config} />
    </div>
  );
};

export default FluidAnimationComponent;
