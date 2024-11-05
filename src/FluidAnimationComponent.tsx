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
    // Проверим, доступен ли какой-либо API, если требуется добавление сплэшей
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <FluidAnimation ref={animationRef} config={config} />
    </div>
  );
};

export default FluidAnimationComponent;
