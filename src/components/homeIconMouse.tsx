import React, { useEffect, useState, useRef } from 'react';

interface IconMouseAnimationProps {
    color: string;
}

const IconMouseAnimation: React.FC<IconMouseAnimationProps> = ({ color }) => {
    const [opacity, setOpacity] = useState(0);
    const [firstRender, setFirstRender] = useState(true);
    const prevColorRef = useRef<string | null>(null);

    useEffect(() => {
        const timeout = setTimeout(() => setOpacity(1), 1000);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (firstRender) {
            setFirstRender(false);
        }
    }, [firstRender]);

    // Определяем условия для задержки
    const prevColor = prevColorRef.current;
    const isBlackToWhite = prevColor === 'rgba(0, 0, 0, 1)' && color === 'rgba(255, 255, 255, 1)';

    // Обновляем prevColor для следующего рендера
    prevColorRef.current = color;

    return (
        <div
            style={{
                opacity,
                transition: 'opacity 1.5s ease',
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 2,
            }}
        >
            <div
                style={{
                    width: '20px',
                    height: '40px',
                    border: `1px solid ${color}`,
                    borderRadius: '25px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    transition: 'border-color 1.5s ease',
                    // Задержка применяется только при переходе с чёрного на белый и не на первый рендер
                    transitionDelay: (!firstRender && isBlackToWhite) ? '1s' : '0s',
                }}
            >
                <div
                    style={{
                        width: '6px',
                        height: '10px',
                        borderRadius: '2px',
                        backgroundColor: color,
                        animation: 'scrollWheel 2s infinite',
                        transition: 'background-color 1.5s ease',
                        transitionDelay: (!firstRender && isBlackToWhite) ? '1s' : '0s',
                    }}
                ></div>
            </div>

            <style>
                {`
                @keyframes scrollWheel {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(10px);
                    }
                }
                `}
            </style>
        </div>
    );
};

export default IconMouseAnimation;
