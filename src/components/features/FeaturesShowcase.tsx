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
                src={activeFeature.video}
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
    </div>
  );
};

export default FeaturesShowcase;
