// src/components/homeTextLogo.tsx
import React, { useEffect, useState } from 'react';

interface TextLogoProps {
    color: string;
}

const TextLogo: React.FC<TextLogoProps> = ({ color }) => {
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => setOpacity(1), 500);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: color,
                fontSize: '6rem',
                fontFamily: 'Orbitron, sans-serif',
                zIndex: 2,
                pointerEvents: 'none',
                opacity,
                transition: 'opacity 2s ease, color 1.5s ease',
            }}
        >
            {`DexStudioApp`.toUpperCase()}
        </div>
    );
};

export default TextLogo;
