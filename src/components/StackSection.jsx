import React, { useLayoutEffect, useRef } from 'react';

export default function StackSection({
  children,
  index = 0,
  id,
  className = '',
  bg = 'bg-white',
  as: Component = 'section'
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const headerH = () =>
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 64;

    // If the panel is taller than the viewport, use a NEGATIVE top so it sticks only
    // when its bottom edge reaches the viewport bottom. Otherwise its lower part gets cut off.
    const update = () => {
      const top = Math.min(headerH(), window.innerHeight - el.offsetHeight);
      el.style.top = `${top}px`;
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <Component
      id={id}
      ref={ref}
      style={{ zIndex: index + 1, top: 'var(--header-h)' }}
      className={[
        'relative [@media(min-height:500px)]:sticky',
        'min-h-[calc(100svh-var(--header-h))] w-full overflow-hidden',
        'rounded-t-3xl shadow-[0_-12px_30px_-14px_rgba(0,0,0,0.18)] first:rounded-t-none first:shadow-none',
        bg,
        className,
      ].join(' ')}
    >
      {children}
    </Component>
  );
}
