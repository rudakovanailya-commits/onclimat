const SilkCSSBackground = () => (
  <div
    className="fixed inset-0 -z-10 pointer-events-none"
    style={{
      background: `
        radial-gradient(ellipse 80% 50% at 20% 40%, hsl(263 30% 45% / 0.4) 0%, transparent 70%),
        radial-gradient(ellipse 60% 80% at 80% 60%, hsl(224 40% 35% / 0.35) 0%, transparent 70%),
        radial-gradient(ellipse 90% 60% at 50% 80%, hsl(270 25% 50% / 0.3) 0%, transparent 60%),
        hsl(var(--background))
      `,
      animation: 'silk-drift 12s ease-in-out infinite alternate',
    }}
  />
);

export default SilkCSSBackground;
