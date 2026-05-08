import React, { useState, useEffect } from 'react';

/**
 * Animated Background Gradient
 */
export const AnimatedGradientBg = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
    cool: 'linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #4facfe)',
    warm: 'linear-gradient(-45deg, #fa709a, #fee140, #30b56d, #ff6b9d)',
    ocean: 'linear-gradient(-45deg, #667eea, #764ba2, #1e90ff, #00ced1)'
  };

  return (
    <div style={{
      background: variants[variant],
      backgroundSize: '400% 400%',
      animation: 'gradient 15s ease infinite',
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      {children}
    </div>
  );
};

/**
 * Floating Animation Wrapper
 */
export const FloatingWrapper = ({ children, delay = 0, intensity = 'normal' }) => {
  const intensityMap = {
    light: { duration: '6s', distance: '20px' },
    normal: { duration: '4s', distance: '30px' },
    intense: { duration: '2s', distance: '40px' }
  };

  const settings = intensityMap[intensity];

  return (
    <div style={{
      animation: `float ${settings.duration} ease-in-out infinite`,
      animationDelay: `${delay}s`,
      display: 'inline-block'
    }}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-${settings.distance}); }
        }
      `}</style>
      {children}
    </div>
  );
};

/**
 * Pulse Animation
 */
export const PulseWrapper = ({ children, color = '#3b82f6' }) => {
  return (
    <div style={{
      animation: 'pulse-animation 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
    }}>
      <style>{`
        @keyframes pulse-animation {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
      {children}
    </div>
  );
};

/**
 * Fade In Animation
 */
export const FadeInWrapper = ({ children, duration = '1s', delay = '0s' }) => {
  return (
    <div style={{
      animation: `fadeIn ${duration} ease-in`,
      animationDelay: delay,
      animationFillMode: 'both'
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      {children}
    </div>
  );
};

/**
 * Slide In Animation
 */
export const SlideInWrapper = ({ 
  children, 
  direction = 'left', // left, right, up, down
  duration = '0.5s',
  delay = '0s'
}) => {
  const directionMap = {
    left: 'slideInLeft',
    right: 'slideInRight',
    up: 'slideInUp',
    down: 'slideInDown'
  };

  const animationName = directionMap[direction];

  const animations = {
    slideInLeft: `@keyframes slideInLeft {
      from { transform: translateX(-100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }`,
    slideInRight: `@keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }`,
    slideInUp: `@keyframes slideInUp {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }`,
    slideInDown: `@keyframes slideInDown {
      from { transform: translateY(-100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }`
  };

  return (
    <div style={{
      animation: `${animationName} ${duration} ease-out`,
      animationDelay: delay,
      animationFillMode: 'both'
    }}>
      <style>{animations[animationName]}</style>
      {children}
    </div>
  );
};

/**
 * Scale Bounce Animation
 */
export const ScaleBounceWrapper = ({ children, delay = '0s' }) => {
  return (
    <div style={{
      animation: 'scaleBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      animationDelay: delay
    }}>
      <style>{`
        @keyframes scaleBounce {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
      {children}
    </div>
  );
};

/**
 * Shimmer Loading Animation
 */
export const ShimmerLoading = ({ width = '100%', height = '20px' }) => {
  return (
    <div style={{
      width,
      height,
      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite',
      borderRadius: '4px'
    }}>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

/**
 * Bounce Animation
 */
export const BounceWrapper = ({ children, delay = '0s' }) => {
  return (
    <div style={{
      animation: 'bounce 2s infinite',
      animationDelay: delay
    }}>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
      {children}
    </div>
  );
};

/**
 * Spin Animation
 */
export const SpinWrapper = ({ children, duration = '1s' }) => {
  return (
    <div style={{
      animation: `spin ${duration} linear infinite`
    }}>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      {children}
    </div>
  );
};

/**
 * Glow Effect
 */
export const GlowEffect = ({ children, color = '#3b82f6', intensity = 'normal' }) => {
  const intensityMap = {
    light: { blur: '8px', spread: '2px' },
    normal: { blur: '12px', spread: '4px' },
    intense: { blur: '20px', spread: '8px' }
  };

  const settings = intensityMap[intensity];

  return (
    <div style={{
      filter: `drop-shadow(0 0 ${settings.blur} ${color}${intensity === 'light' ? '60' : intensity === 'normal' ? '80' : 'ff'})`,
      animation: 'glow 2s ease-in-out infinite',
      display: 'inline-block'
    }}>
      <style>{`
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 ${settings.blur} ${color}60); }
          50% { filter: drop-shadow(0 0 ${parseInt(settings.blur) * 1.5}px ${color}); }
        }
      `}</style>
      {children}
    </div>
  );
};

/**
 * Flip Animation
 */
export const FlipWrapper = ({ children, duration = '0.6s' }) => {
  return (
    <div style={{
      animation: `flip ${duration} cubic-bezier(0.68, -0.55, 0.265, 1.55)`
    }}>
      <style>{`
        @keyframes flip {
          from { transform: perspective(400px) rotateY(0); }
          to { transform: perspective(400px) rotateY(360deg); }
        }
      `}</style>
      {children}
    </div>
  );
};

/**
 * Combined Effect: Fade + Slide + Scale
 */
export const EntranceAnimation = ({ 
  children, 
  type = 'fadeSlide', // fadeSlide, scaleFade, bounceIn
  duration = '0.6s',
  delay = '0s'
}) => {
  const animations = {
    fadeSlide: `@keyframes fadeSlide {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }`,
    scaleFade: `@keyframes scaleFade {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }`,
    bounceIn: `@keyframes bounceIn {
      from { opacity: 0; transform: scale(0.3); }
      50% { opacity: 1; transform: scale(1.05); }
      to { transform: scale(1); }
    }`
  };

  return (
    <div style={{
      animation: `${type} ${duration} ease-out`,
      animationDelay: delay,
      animationFillMode: 'both'
    }}>
      <style>{animations[type]}</style>
      {children}
    </div>
  );
};
