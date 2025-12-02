import React from 'react';

// SVG Filters for Advanced Glass Distortion Effects
// These filters create liquid-like distortions similar to the reference code
const GlassFiltersSVG: React.FC = () => {
  return (
    <svg
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden'
      }}
      aria-hidden="true"
    >
      <defs>
        {/* Primary glass distortion filter */}
        <filter id="glass-distortion" primitiveUnits="objectBoundingBox">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02"
            numOctaves="3"
            result="turbulence"
            seed="5"
          />
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.01" result="blur" />
          <feDisplacementMap
            in="blur"
            in2="turbulence"
            scale="0.002"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Subtle glass distortion for smaller elements */}
        <filter id="glass-distortion-subtle" primitiveUnits="objectBoundingBox">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015"
            numOctaves="2"
            result="turbulence"
            seed="3"
          />
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.005" result="blur" />
          <feDisplacementMap
            in="blur"
            in2="turbulence"
            scale="0.001"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Liquid glass effect with color matrix */}
        <filter id="glass-liquid" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.025"
            numOctaves="4"
            result="turbulence"
          />
          <feColorMatrix
            in="turbulence"
            type="saturate"
            values="0.1"
            result="desaturatedTurbulence"
          />
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.02" result="blur" />
          <feDisplacementMap
            in="blur"
            in2="desaturatedTurbulence"
            scale="0.004"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feComposite
            in="displaced"
            in2="SourceGraphic"
            operator="over"
          />
        </filter>

        {/* Glass refraction effect */}
        <filter id="glass-refraction">
          <feMorphology operator="dilate" radius="1" result="dilated" />
          <feGaussianBlur in="dilated" stdDeviation="3" result="blurred" />
          <feConvolveMatrix
            kernelMatrix="1 0 0 0 0 0 0 0 -1"
            order="3"
            result="convolved"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="convolved"
            scale="5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Frosted glass effect */}
        <filter id="glass-frosted" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            baseFrequency="0.9"
            numOctaves="4"
            seed="5"
            result="noise"
          />
          <feDiffuseLighting
            in="noise"
            lightingColor="white"
            surfaceScale="1"
            result="diffLight"
          >
            <feDistantLight azimuth="45" elevation="60" />
          </feDiffuseLighting>
          <feComposite
            in="diffLight"
            in2="SourceGraphic"
            operator="multiply"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default GlassFiltersSVG;