import React from 'react';
import Spline from '@splinetool/react-spline';

const HeroSpline = () => {
  return (
    <section className="relative w-full h-[320px] sm:h-[420px] md:h-[520px] overflow-hidden" style={{ backgroundColor: '#25252b' }}>
      <Spline scene="https://prod.spline.design/cEecEwR6Ehj4iT8T/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#25252b]" />
      <div className="absolute inset-0 flex items-end justify-start max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Welcome back, <span style={{ color: '#ff2770' }}>Alex</span>
          </h1>
          <p className="text-gray-300 mt-2 max-w-xl">Capture thoughts, track moods, and shape ideas in your personal space. Your notes are synced and autosaved.</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSpline;
