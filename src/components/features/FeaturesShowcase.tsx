import React, { useState } from "react";
import {
  IoGrid,
  IoEye,
  IoColorPalette,
  IoSparkles,
  IoTime,
  IoSettings,
  IoDesktop,
  IoKeypad,
  IoChevronForward,
} from "react-icons/io5";

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  badge: string;
  badgeType: "core" | "flexible" | "exclusive" | "beta" | "smart" | "design" | "pro" | "power";
  video?: string;
}

const features: Feature[] = [
  {
    id: "organization",
    icon: <IoGrid size={28} />,
    title: "3-Section Organization",
    description:
      "Divide your menu bar into Visible, Hidden, and Always-Hidden sections. Drag & drop icons between sections effortlessly.",
    details: [
      "Visible Section - Always displayed icons",
      "Hidden Section - Revealed on demand",
      "Always Hidden - Apps you never need",
      "Fluid drag & drop reorganization",
    ],
    badge: "Core",
    badgeType: "core",
    video: "/features/core.mp4",
  },
  {
    id: "reveal",
    icon: <IoEye size={28} />,
    title: "Reveal Methods",
    description:
      "Access hidden icons your way: keyboard shortcuts, mouse hover, click, scroll gestures, or menu toggle.",
    details: [
      "Customizable keyboard shortcuts",
      "Hover with configurable delay",
      "Click empty area to toggle",
      "Scroll gestures support",
    ],
    badge: "Flexible",
    badgeType: "flexible",
  },
  {
    id: "glass",
    icon: <IoColorPalette size={28} />,
    title: "Liquid Glass Effects",
    description:
      "Stunning translucent materials that adapt to your wallpaper. 10+ color variants with full customization.",
    details: [
      "Wallpaper-adaptive colors",
      "Separate light/dark configs",
      "Custom radius, borders, shadows",
      "Smooth state transitions",
    ],
    badge: "Exclusive",
    badgeType: "exclusive",
  },
  {
    id: "animations",
    icon: <IoSparkles size={28} />,
    title: "Fluid Animations",
    description:
      "Ultra-smooth, buttery animations with <16ms latency. Adaptive performance that optimizes for your display.",
    details: [
      "Incredibly fluid transitions",
      "Adaptive performance",
      "Intelligent rendering",
      "<16ms guaranteed latency",
    ],
    badge: "Beta",
    badgeType: "beta",
  },
  {
    id: "autohide",
    icon: <IoTime size={28} />,
    title: "Smart Auto-Hide",
    description:
      "Context-aware auto-hiding that adapts to your workflow. Choose between smart, timed, or manual strategies.",
    details: [
      "Smart context-aware behavior",
      "Configurable timers (0-30s)",
      "Manual on-demand control",
      "Intelligent activity detection",
    ],
    badge: "Smart",
    badgeType: "smart",
  },
  {
    id: "customization",
    icon: <IoSettings size={28} />,
    title: "Visual Customization",
    description:
      "Full-width or split design, gradients, borders, shadows, and opacity. Real-time preview as you customize.",
    details: [
      "Full-width or split layout",
      "Real-time preview",
      "Multiple material options",
      "Border & shadow control",
    ],
    badge: "Design",
    badgeType: "design",
  },
  {
    id: "multimonitor",
    icon: <IoDesktop size={28} />,
    title: "Multi-Monitor Support",
    description:
      "Per-monitor configuration, space-aware behavior, and MacBook notch support for professional setups.",
    details: [
      "Per-display settings",
      "Space-aware behavior",
      "MacBook notch optimized",
      "Seamless transitions",
    ],
    badge: "Pro",
    badgeType: "pro",
  },
  {
    id: "automation",
    icon: <IoKeypad size={28} />,
    title: "Workflow Automation",
    description:
      "Custom hotkeys, Command-drag reveal, context menus, and quick toggles for maximum productivity.",
    details: [
      "Any keyboard combination",
      "Command-drag reveal",
      "Right-click quick actions",
      "Instant toggle access",
    ],
    badge: "Power",
    badgeType: "power",
  },
];

const FeaturesShowcase: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<Feature>(features[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleFeatureHover = (feature: Feature) => {
    if (feature.id !== activeFeature.id) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveFeature(feature);
        setIsTransitioning(false);
      }, 120);
    }
  };

  const getBadgeClass = (type: string) => {
    switch (type) {
      case "exclusive":
        return "badge-exclusive";
      case "beta":
        return "badge-beta";
      case "pro":
        return "badge-pro";
      case "power":
        return "badge-power";
      case "smart":
        return "badge-smart";
      case "design":
        return "badge-design";
      case "flexible":
        return "badge-flexible";
      case "core":
      default:
        return "badge-core";
    }
  };

  return (
    <div className="features-showcase">
      {/* Preview Area */}
      <div className="preview-area">
        <div className="preview-glow" data-badge-type={activeFeature.badgeType} />
        <div className={`preview-content ${isTransitioning ? "transitioning" : ""}`}>
          {/* Video or Placeholder */}
          <div className="preview-media">
            {activeFeature.video ? (
              <video
                key={activeFeature.id}
                className="feature-video"
                src={`${import.meta.env.BASE_URL}${activeFeature.video}`}
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <div className="media-placeholder">
                <div className="placeholder-icon-wrapper">
                  <span className="placeholder-icon">{activeFeature.icon}</span>
                  <div className="icon-ring" />
                  <div className="icon-pulse" />
                </div>
              </div>
            )}
          </div>

          {/* Feature Info */}
          <div className="preview-info">
            <div className="preview-header">
              <h2 className="preview-title">{activeFeature.title}</h2>
              <span className={`preview-badge ${getBadgeClass(activeFeature.badgeType)}`}>
                <span className="preview-badge-icon">{activeFeature.icon}</span>
                {activeFeature.badge}
              </span>
            </div>
            <p className="preview-description">{activeFeature.description}</p>
            <ul className="preview-details" data-badge-type={activeFeature.badgeType}>
              {activeFeature.details.map((detail, index) => (
                <li key={index} style={{ "--detail-index": index } as React.CSSProperties}>
                  <IoChevronForward size={14} />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Feature Label */}
      <span className="features-label">{activeFeature.title}</span>

      {/* Icon Grid */}
      <div className="icon-grid">
        <div className="icon-row">
          {features.slice(0, 4).map((feature) => (
            <button
              key={feature.id}
              className={`icon-button ${activeFeature.id === feature.id ? "active" : ""}`}
              onMouseEnter={() => handleFeatureHover(feature)}
              onClick={() => handleFeatureHover(feature)}
              aria-label={feature.title}
              data-badge-type={feature.badgeType}
            >
              <div className="icon-inner">
                {feature.icon}
                <div className="icon-glow" />
              </div>
              <span className={`icon-badge icon-badge-${feature.badgeType}`}>{feature.badge}</span>
            </button>
          ))}
        </div>
        <div className="icon-row">
          {features.slice(4, 8).map((feature) => (
            <button
              key={feature.id}
              className={`icon-button ${activeFeature.id === feature.id ? "active" : ""}`}
              onMouseEnter={() => handleFeatureHover(feature)}
              onClick={() => handleFeatureHover(feature)}
              aria-label={feature.title}
              data-badge-type={feature.badgeType}
            >
              <div className="icon-inner">
                {feature.icon}
                <div className="icon-glow" />
              </div>
              <span className={`icon-badge icon-badge-${feature.badgeType}`}>{feature.badge}</span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .features-showcase {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .preview-area {
          width: 100%;
          max-width: 900px;
          background: var(--vp-glass-secondary, rgba(44, 44, 46, 0.45));
          backdrop-filter: blur(40px);
          border: 1px solid var(--vp-border-subtle, rgba(255, 255, 255, 0.08));
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          position: relative;
        }

        .preview-area::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.12) 50%,
            transparent 100%
          );
        }

        .preview-glow {
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 150px;
          background: radial-gradient(
            ellipse at center,
            var(--glow-color, rgba(59, 130, 246, 0.2)) 0%,
            transparent 70%
          );
          pointer-events: none;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          filter: blur(20px);
        }

        .preview-glow[data-badge-type="core"] { --glow-color: rgba(59, 130, 246, 0.25); }
        .preview-glow[data-badge-type="flexible"] { --glow-color: rgba(34, 197, 94, 0.25); }
        .preview-glow[data-badge-type="exclusive"] { --glow-color: rgba(168, 85, 247, 0.25); }
        .preview-glow[data-badge-type="beta"] { --glow-color: rgba(234, 179, 8, 0.25); }
        .preview-glow[data-badge-type="smart"] { --glow-color: rgba(14, 165, 233, 0.25); }
        .preview-glow[data-badge-type="design"] { --glow-color: rgba(236, 72, 153, 0.25); }
        .preview-glow[data-badge-type="pro"] { --glow-color: rgba(99, 102, 241, 0.25); }
        .preview-glow[data-badge-type="power"] { --glow-color: rgba(249, 115, 22, 0.25); }

        .preview-content {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 0;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 1;
        }

        .preview-content.transitioning {
          opacity: 0.5;
          transform: scale(0.99);
        }

        .preview-media {
          aspect-ratio: 4/3;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.08),
            rgba(139, 92, 246, 0.08)
          );
          border-right: 1px solid var(--vp-border-subtle, rgba(255, 255, 255, 0.08));
          position: relative;
          overflow: hidden;
        }

        .preview-media::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(255, 255, 255, 0.03) 0%,
            transparent 50%
          );
          pointer-events: none;
          z-index: 1;
        }

        .feature-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .media-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          color: var(--vp-text-tertiary, rgba(255, 255, 255, 0.5));
        }

        .placeholder-icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .placeholder-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 88px;
          height: 88px;
          background: linear-gradient(
            135deg,
            rgba(58, 58, 60, 0.6) 0%,
            rgba(58, 58, 60, 0.4) 100%
          );
          border-radius: 22px;
          color: var(--vp-text-primary, rgba(255, 255, 255, 0.9));
          position: relative;
          z-index: 2;
          box-shadow: 
            0 8px 24px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .placeholder-icon svg {
          width: 44px;
          height: 44px;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .icon-ring {
          position: absolute;
          inset: -12px;
          border: 2px solid rgba(59, 130, 246, 0.3);
          border-radius: 30px;
          opacity: 0;
          transform: scale(0.9);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .icon-pulse {
          position: absolute;
          inset: -20px;
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 36px;
          opacity: 0;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(0.95); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
        }

        .preview-content:not(.transitioning) .icon-ring {
          opacity: 1;
          transform: scale(1);
        }

        .preview-content:not(.transitioning) .icon-pulse {
          opacity: 1;
        }

        .preview-info {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .preview-header {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .preview-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          width: fit-content;
          padding: 0.3rem 0.75rem;
          border-radius: 10px;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
          cursor: default;
        }

        .preview-badge:hover {
          transform: translateY(-1px);
        }

        .preview-badge:hover .preview-badge-icon {
          transform: scale(1.2) rotate(5deg);
        }

        .preview-badge-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .preview-badge-icon svg {
          width: 14px;
          height: 14px;
        }

        .badge-core {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%);
          color: rgba(59, 130, 246, 0.95);
          border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .badge-flexible {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%);
          color: rgba(34, 197, 94, 0.95);
          border: 1px solid rgba(34, 197, 94, 0.3);
        }

        .badge-exclusive {
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(168, 85, 247, 0.1) 100%);
          color: rgba(168, 85, 247, 0.95);
          border: 1px solid rgba(168, 85, 247, 0.3);
        }

        .badge-beta {
          background: linear-gradient(135deg, rgba(234, 179, 8, 0.2) 0%, rgba(234, 179, 8, 0.1) 100%);
          color: rgba(234, 179, 8, 0.95);
          border: 1px solid rgba(234, 179, 8, 0.3);
        }

        .badge-smart {
          background: linear-gradient(135deg, rgba(14, 165, 233, 0.2) 0%, rgba(14, 165, 233, 0.1) 100%);
          color: rgba(14, 165, 233, 0.95);
          border: 1px solid rgba(14, 165, 233, 0.3);
        }

        .badge-design {
          background: linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(236, 72, 153, 0.1) 100%);
          color: rgba(236, 72, 153, 0.95);
          border: 1px solid rgba(236, 72, 153, 0.3);
        }

        .badge-pro {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0.1) 100%);
          color: rgba(99, 102, 241, 0.95);
          border: 1px solid rgba(99, 102, 241, 0.3);
        }

        .badge-power {
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(249, 115, 22, 0.1) 100%);
          color: rgba(249, 115, 22, 0.95);
          border: 1px solid rgba(249, 115, 22, 0.3);
        }

        .preview-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--vp-text-primary, rgba(255, 255, 255, 0.95));
          margin: 0;
          line-height: 1.3;
          letter-spacing: -0.01em;
        }

        .preview-description {
          font-size: 0.9375rem;
          color: var(--vp-text-secondary, rgba(255, 255, 255, 0.7));
          line-height: 1.7;
          margin: 0 0 1.25rem;
        }

        .preview-details {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .preview-details li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--vp-text-secondary, rgba(255, 255, 255, 0.7));
          opacity: 0;
          transform: translateX(-8px);
          animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: calc(var(--detail-index) * 0.05s);
        }

        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .preview-content.transitioning .preview-details li {
          opacity: 0.5;
          transform: translateX(0);
          animation: none;
        }

        .preview-details li svg {
          flex-shrink: 0;
          transition: transform 0.2s ease, color 0.3s ease;
        }

        /* Chevron colors based on badge type */
        .preview-details[data-badge-type="core"] li svg { color: rgba(59, 130, 246, 0.85); }
        .preview-details[data-badge-type="flexible"] li svg { color: rgba(34, 197, 94, 0.85); }
        .preview-details[data-badge-type="exclusive"] li svg { color: rgba(168, 85, 247, 0.85); }
        .preview-details[data-badge-type="beta"] li svg { color: rgba(234, 179, 8, 0.85); }
        .preview-details[data-badge-type="smart"] li svg { color: rgba(14, 165, 233, 0.85); }
        .preview-details[data-badge-type="design"] li svg { color: rgba(236, 72, 153, 0.85); }
        .preview-details[data-badge-type="pro"] li svg { color: rgba(99, 102, 241, 0.85); }
        .preview-details[data-badge-type="power"] li svg { color: rgba(249, 115, 22, 0.85); }

        .preview-details li:hover svg {
          transform: translateX(2px);
        }

        .features-label {
          font-size: 0.9375rem;
          color: var(--vp-text-secondary, rgba(255, 255, 255, 0.6));
          margin: 0;
          margin-left: 0.5rem;
          padding-left: 0.75rem;
        }

        .icon-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .icon-row {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .icon-button {
          width: 76px;
          height: 76px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--vp-glass-secondary, rgba(44, 44, 46, 0.45));
          backdrop-filter: blur(20px);
          border: 1px solid var(--vp-border-subtle, rgba(255, 255, 255, 0.08));
          border-radius: 20px;
          color: var(--vp-text-secondary, rgba(255, 255, 255, 0.7));
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: visible;
        }

        .icon-inner {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .icon-button .icon-glow {
          position: absolute;
          inset: -8px;
          background: radial-gradient(circle, var(--icon-glow, rgba(59, 130, 246, 0.4)) 0%, transparent 70%);
          border-radius: 50%;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          filter: blur(6px);
          pointer-events: none;
        }

        .icon-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          padding: 0.15rem 0.4rem;
          font-size: 0.55rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          border-radius: 6px;
          opacity: 0;
          transform: scale(0.8) translateY(4px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          border: 1px solid;
        }

        .icon-badge-core { background: rgba(59, 130, 246, 0.70); color: rgba(255, 255, 255, 0.95); border-color: rgba(59, 130, 246, 0.5); }
        .icon-badge-flexible { background: rgba(34, 197, 94, 0.70); color: rgba(255, 255, 255, 0.95); border-color: rgba(34, 197, 94, 0.5); }
        .icon-badge-exclusive { background: rgba(168, 85, 247, 0.70); color: rgba(255, 255, 255, 0.95); border-color: rgba(168, 85, 247, 0.5); }
        .icon-badge-beta { background: rgba(234, 179, 8, 0.70); color: rgba(255, 255, 255, 0.95); border-color: rgba(234, 179, 8, 0.5); }
        .icon-badge-smart { background: rgba(14, 165, 233, 0.70); color: rgba(255, 255, 255, 0.95); border-color: rgba(14, 165, 233, 0.5); }
        .icon-badge-design { background: rgba(236, 72, 153, 0.70); color: rgba(255, 255, 255, 0.95); border-color: rgba(236, 72, 153, 0.5); }
        .icon-badge-pro { background: rgba(99, 102, 241, 0.70); color: rgba(255, 255, 255, 0.95); border-color: rgba(99, 102, 241, 0.5); }
        .icon-badge-power { background: rgba(249, 115, 22, 0.70); color: rgba(255, 255, 255, 0.95); border-color: rgba(249, 115, 22, 0.5); }

        /* Icon colors based on badge type */
        .icon-button[data-badge-type="core"] { --icon-color: rgba(59, 130, 246, 0.85); --icon-glow: rgba(59, 130, 246, 0.3); }
        .icon-button[data-badge-type="flexible"] { --icon-color: rgba(34, 197, 94, 0.85); --icon-glow: rgba(34, 197, 94, 0.3); }
        .icon-button[data-badge-type="exclusive"] { --icon-color: rgba(168, 85, 247, 0.85); --icon-glow: rgba(168, 85, 247, 0.3); }
        .icon-button[data-badge-type="beta"] { --icon-color: rgba(234, 179, 8, 0.85); --icon-glow: rgba(234, 179, 8, 0.3); }
        .icon-button[data-badge-type="smart"] { --icon-color: rgba(14, 165, 233, 0.85); --icon-glow: rgba(14, 165, 233, 0.3); }
        .icon-button[data-badge-type="design"] { --icon-color: rgba(236, 72, 153, 0.85); --icon-glow: rgba(236, 72, 153, 0.3); }
        .icon-button[data-badge-type="pro"] { --icon-color: rgba(99, 102, 241, 0.85); --icon-glow: rgba(99, 102, 241, 0.3); }
        .icon-button[data-badge-type="power"] { --icon-color: rgba(249, 115, 22, 0.85); --icon-glow: rgba(249, 115, 22, 0.3); }

        .icon-button:hover {
          background: var(--vp-glass-tertiary, rgba(58, 58, 60, 0.5));
          border-color: var(--vp-border-regular, rgba(255, 255, 255, 0.15));
          color: var(--vp-text-primary, rgba(255, 255, 255, 0.95));
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .icon-button:hover .icon-inner {
          transform: scale(1.1);
        }

        .icon-button:hover .icon-badge {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        .icon-button.active {
          background: linear-gradient(
            135deg,
            color-mix(in srgb, var(--icon-color, rgba(59, 130, 246, 0.95)) 20%, transparent) 0%,
            color-mix(in srgb, var(--icon-color, rgba(59, 130, 246, 0.95)) 10%, transparent) 100%
          );
          border-color: color-mix(in srgb, var(--icon-color, rgba(59, 130, 246, 0.95)) 40%, transparent);
          color: var(--icon-color, rgba(59, 130, 246, 0.95));
          box-shadow: 
            0 0 24px color-mix(in srgb, var(--icon-color, rgba(59, 130, 246, 0.95)) 20%, transparent),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          transform: translateY(-4px);
        }

        .icon-button.active .icon-inner {
          transform: scale(1.1);
        }

        .icon-button.active .icon-glow {
          opacity: 1;
          transform: scale(1);
        }

        .icon-button.active .icon-badge {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .preview-content {
            grid-template-columns: 1fr;
          }

          .preview-media {
            aspect-ratio: 16/9;
            border-right: none;
            border-bottom: 1px solid var(--vp-border-subtle, rgba(255, 255, 255, 0.08));
          }

          .preview-info {
            padding: 1.5rem;
          }

          .preview-title {
            font-size: 1.25rem;
          }

          .icon-button {
            width: 64px;
            height: 64px;
            border-radius: 16px;
          }

          .icon-button svg {
            width: 24px;
            height: 24px;
          }

          .icon-row {
            gap: 0.75rem;
          }

          .icon-button:hover,
          .icon-button.active {
            transform: translateY(-2px);
          }

          .features-label-wrapper {
            flex-wrap: wrap;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .icon-button {
            width: 56px;
            height: 56px;
            border-radius: 14px;
          }

          .icon-row {
            gap: 0.5rem;
          }

          .placeholder-icon {
            width: 72px;
            height: 72px;
            border-radius: 18px;
          }

          .placeholder-icon svg {
            width: 36px;
            height: 36px;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .preview-content,
          .icon-button,
          .icon-inner,
          .icon-glow,
          .icon-badge,
          .preview-badge,
          .placeholder-icon,
          .icon-ring,
          .icon-pulse,
          .preview-details li {
            transition: none;
            animation: none;
          }

          .preview-details li {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturesShowcase;
