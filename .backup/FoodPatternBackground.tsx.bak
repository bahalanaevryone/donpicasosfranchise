import { useEffect, useMemo, useRef, type CSSProperties } from 'react';

const STROKE = '#FFD700';
const STROKE_WIDTH = 2.5;

type FoodIcon = {
  id: string;
  path: JSX.Element;
};

type IconInstance = {
  id: string;
  iconIndex: number;
  x: number;
  y: number;
  size: number;
  baseRotation: number;
  floatDuration: number;
  floatDelay: number;
  scaleDuration: number;
  scaleDelay: number;
  floatXAmp: number;
  floatYAmp: number;
  layer: number;
};

const foodIcons: FoodIcon[] = [
  {
    id: 'burger',
    path: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 26c0-11.046 9.85-18 22-18s22 6.954 22 18" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
        <rect x="8" y="26" width="48" height="8" rx="4" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
        <path d="M8 38h48" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
        <rect x="10" y="38" width="44" height="8" rx="4" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
        <path d="M12 46c0 5 4 8 8 8h24c4 0 8-3 8-8" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
        <path d="M20 30 Q32 27 44 30" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'pizza',
    path: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 6 L6 56 Q32 62 58 56 Z" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinejoin="round" strokeLinecap="round" />
        <path d="M6 56 Q32 62 58 56" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
        <circle cx="32" cy="28" r="3.5" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
        <circle cx="22" cy="42" r="2.5" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
        <circle cx="42" cy="40" r="2.5" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
        <path d="M10 50 Q20 47 30 50" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: 'fries',
    path: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 28 L14 56 h36 L46 28" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinejoin="round" strokeLinecap="round" />
        <path d="M14 56 h36" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
        <rect x="18" y="28" width="28" height="4" rx="2" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
        <path d="M24 28 L22 10 Q24 7 26 10 L26 28" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 28 L30 8 Q32 5 34 8 L34 28" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M40 28 L38 12 Q40 9 42 12 L42 28" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'hotdog',
    path: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="24" width="48" height="16" rx="8" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
        <ellipse cx="16" cy="32" rx="6" ry="8" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
        <ellipse cx="48" cy="32" rx="6" ry="8" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
        <path d="M16 32 Q32 26 48 32" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
        <path d="M16 32 Q32 38 48 32" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'taco',
    path: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 48 Q8 20 32 10 Q56 20 56 48 Q44 42 32 42 Q20 42 8 48Z" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinejoin="round" />
        <path d="M14 42 Q32 36 50 42" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
        <path d="M20 38 Q26 30 32 28 Q38 30 44 38" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
        <circle cx="28" cy="34" r="2" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
        <circle cx="36" cy="32" r="1.5" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      </svg>
    ),
  },
  {
    id: 'donut',
    path: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="24" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
        <circle cx="32" cy="32" r="9" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
        <path d="M14 22 Q20 10 32 8 Q44 10 50 22" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
        <circle cx="20" cy="24" r="2" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
        <circle cx="44" cy="24" r="2" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
        <circle cx="32" cy="14" r="1.5" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      </svg>
    ),
  },
  {
    id: 'icecream',
    path: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 34 L32 58 L44 34" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinejoin="round" strokeLinecap="round" />
        <path d="M22 34 L32 54 L42 34" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinejoin="round" strokeLinecap="round" opacity="0.4" />
        <ellipse cx="32" cy="24" rx="16" ry="14" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
        <path d="M16 26 Q32 16 48 26" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
        <circle cx="26" cy="20" r="2.5" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
        <circle cx="38" cy="18" r="2" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      </svg>
    ),
  },
  {
    id: 'drumstick',
    path: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="42" cy="20" rx="14" ry="12" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
        <path d="M30 26 L16 46" stroke={STROKE} strokeWidth={STROKE_WIDTH + 1} strokeLinecap="round" />
        <circle cx="14" cy="50" r="6" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
        <path d="M36 16 Q44 8 50 14" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'coffee',
    path: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22 L16 54 h28 L48 22 Z" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinejoin="round" />
        <path d="M48 28 Q58 28 58 36 Q58 44 48 44" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
        <path d="M12 30 h36" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
        <path d="M22 12 Q22 6 26 10 Q26 4 30 8" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
        <path d="M32 14 Q32 8 36 12 Q36 6 40 10" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'soda',
    path: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 20 L20 58 h24 L48 20 Z" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinejoin="round" />
        <rect x="14" y="14" width="36" height="8" rx="3" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
        <path d="M28 14 L28 6 Q32 4 36 6 L36 14" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 36 h24" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" opacity="0.5" />
        <path d="M21 46 h22" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" opacity="0.3" />
      </svg>
    ),
  },
  {
    id: 'sandwich',
    path: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 18 Q32 10 56 18 L54 26 Q32 20 10 26 Z" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinejoin="round" />
        <path d="M10 26 h44 v6 h-44 Z" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinejoin="round" />
        <path d="M10 32 h44 v6 h-44 Z" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinejoin="round" />
        <path d="M10 38 Q32 46 54 38 L52 46 Q32 54 12 46 Z" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinejoin="round" />
        <path d="M16 30 Q32 27 48 30" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: 'cupcake',
    path: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 36 L20 58 h24 L48 36 Z" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinejoin="round" />
        <path d="M12 36 Q12 26 22 26 Q24 18 32 16 Q40 18 42 26 Q52 26 52 36 Z" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinejoin="round" />
        <path d="M24 24 Q32 20 40 24" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
        <path d="M32 16 L32 8" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
        <circle cx="32" cy="6" r="3" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
        <path d="M20 44 h24" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" opacity="0.4" />
        <path d="M21 50 h22" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" opacity="0.3" />
      </svg>
    ),
  },
];

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function buildGrid(isMobile = false): IconInstance[] {
  const instances: IconInstance[] = [];
  const cols = isMobile ? 4 : 7;
  const rows = isMobile ? 7 : 9;
  let seed = 0;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const r = (s: number) => seededRandom(seed++ + s * 37);
      const jitterX = (r(1) - 0.5) * 10;
      const jitterY = (r(2) - 0.5) * 10;

      instances.push({
        id: `${row}-${col}`,
        iconIndex: Math.floor(r(3) * foodIcons.length),
        x: (col / (cols - 1)) * 110 - 5 + jitterX,
        y: (row / (rows - 1)) * 110 - 5 + jitterY,
        size: (isMobile ? 46 : 56) + r(4) * (isMobile ? 26 : 40),
        baseRotation: (r(5) - 0.5) * 50,
        floatDuration: 6 + r(6) * 10,
        floatDelay: r(7) * -12,
        scaleDuration: 5 + r(10) * 8,
        scaleDelay: r(11) * -10,
        floatXAmp: (r(12) - 0.5) * 30,
        floatYAmp: (r(13) - 0.5) * 30,
        layer: Math.floor(r(14) * 3),
      });
    }
  }

  return instances;
}

export default function FoodPatternBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 700;
  const instances = useMemo(() => buildGrid(isMobile), [isMobile]);
  const parallaxFactors = [8, 16, 26];

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return undefined;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMove = (event: PointerEvent) => {
      if (media.matches) return;

      const mouseX = event.clientX / window.innerWidth - 0.5;
      const mouseY = event.clientY / window.innerHeight - 0.5;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        background.style.setProperty('--mouse-x', String(mouseX));
        background.style.setProperty('--mouse-y', String(mouseY));
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div ref={backgroundRef} className="food-pattern-background" aria-hidden="true">
      <div className="food-pattern-vignette" />
      <div className="food-pattern-layer">
        {instances.map((instance) => {
          const icon = foodIcons[instance.iconIndex];
          const parallax = parallaxFactors[instance.layer];

          return (
            <div
              key={instance.id}
              className="food-pattern-icon"
              style={
                {
                  '--x': `${instance.x}%`,
                  '--y': `${instance.y}%`,
                  '--size': `${instance.size}px`,
                  '--rotation': `${instance.baseRotation}deg`,
                  '--float-duration': `${instance.floatDuration}s`,
                  '--float-delay': `${instance.floatDelay}s`,
                  '--scale-duration': `${instance.scaleDuration}s`,
                  '--scale-delay': `${instance.scaleDelay}s`,
                  '--float-x': `${instance.floatXAmp}px`,
                  '--float-y': `${instance.floatYAmp}px`,
                  '--parallax': parallax,
                } as CSSProperties
              }
            >
              <div className="food-pattern-icon-inner">{icon.path}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
