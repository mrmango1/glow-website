import React, { useState } from "react";
import { IoRocket, IoFlask, IoCheckmarkCircle, IoChevronForward } from "react-icons/io5";

interface ChangeGroup {
  type: string;
  items: string[];
}

interface Release {
  version: string;
  date: string;
  tag: "upcoming" | "beta" | "stable";
  summary: string;
  changes: ChangeGroup[];
}

const releases: Release[] = [
  {
    version: "1.0.0",
    date: "Coming Soon",
    tag: "upcoming",
    summary: "Initial public release with all core features, Fluid Animations, and Liquid Glass effects.",
    changes: [
      {
        type: "added",
        items: [
          "Initial release of Glow",
          "3-Section menu bar organization",
          "Fluid Animations (Beta)",
          "Liquid Glass visual effects",
          "Drag & drop icon reordering",
          "Multiple reveal methods",
          "Custom keyboard shortcuts",
          "Usage-based suggestions",
          "macOS 26 optimized",
        ],
      },
      {
        type: "feature",
        items: [
          "<16ms response time",
          "Event-driven architecture",
          "Sandboxed for security",
          "Native SwiftUI",
        ],
      },
    ],
  },
  {
    version: "0.9.0",
    date: "November 2025",
    tag: "beta",
    summary: "Beta release for early testers with core functionality and initial Liquid Glass implementation.",
    changes: [
      {
        type: "added",
        items: [
          "Beta release for testers",
          "Core menu bar management",
          "Basic icon hiding/revealing",
          "Initial Liquid Glass effects",
        ],
      },
      {
        type: "improved",
        items: [
          "Apple Silicon optimizations",
          "Reduced memory footprint",
        ],
      },
      {
        type: "fixed",
        items: [
          "Icon spacing consistency",
          "Menu bar overlap issues",
        ],
      },
    ],
  },
  {
    version: "0.8.0",
    date: "October 2025",
    tag: "beta",
    summary: "Internal alpha with foundational architecture and basic menu bar control.",
    changes: [
      {
        type: "added",
        items: [
          "Initial project setup",
          "Basic menu bar detection",
          "Icon enumeration",
          "Simple hide/show toggle",
        ],
      },
    ],
  },
];

const typeConfig: Record<string, { label: string; color: string }> = {
  added: { label: "Added", color: "#22c55e" },
  feature: { label: "Features", color: "#3b82f6" },
  improved: { label: "Improved", color: "#a855f7" },
  fixed: { label: "Fixed", color: "#f97316" },
  removed: { label: "Removed", color: "#ef4444" },
  security: { label: "Security", color: "#eab308" },
};

const tagConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  upcoming: {
    icon: <IoRocket size={16} />,
    color: "#3b82f6",
    bg: "rgba(59, 130, 246, 0.15)",
  },
  beta: {
    icon: <IoFlask size={16} />,
    color: "#a855f7",
    bg: "rgba(168, 85, 247, 0.15)",
  },
  stable: {
    icon: <IoCheckmarkCircle size={16} />,
    color: "#22c55e",
    bg: "rgba(34, 197, 94, 0.15)",
  },
};

const ChangelogTimeline: React.FC = () => {
  const [activeRelease, setActiveRelease] = useState<Release>(releases[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const reversedReleases = [...releases].reverse();

  const handleReleaseHover = (release: Release, index: number) => {
    if (release.version !== activeRelease.version) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveRelease(release);
        setActiveIndex(index);
        setIsTransitioning(false);
      }, 120);
    }
  };

  return (
    <div className="changelog-showcase">
      {/* Detail Panel */}
      <div className="detail-panel">
        <div className="panel-glow" style={{ "--glow-color": tagConfig[activeRelease.tag].color } as React.CSSProperties} />
        <div className={`detail-content ${isTransitioning ? "transitioning" : ""}`}>
          <div className="detail-header">
            <div className="version-info">
              <h2 className="version-number">v{activeRelease.version}</h2>
              <span
                className="version-tag"
                style={{
                  "--tag-color": tagConfig[activeRelease.tag].color,
                  "--tag-bg": tagConfig[activeRelease.tag].bg,
                } as React.CSSProperties}
              >
                <span className="tag-icon">{tagConfig[activeRelease.tag].icon}</span>
                {activeRelease.tag}
              </span>
            </div>
            <span className="version-date">{activeRelease.date}</span>
          </div>

          <p className="version-summary">{activeRelease.summary}</p>

          <div className="changes-wrapper">
            <div className="changes-grid">
              {activeRelease.changes.map((group, idx) => (
                <div 
                  key={idx} 
                  className="change-group"
                  style={{ 
                    "--group-color": typeConfig[group.type]?.color,
                    "--group-index": idx 
                  } as React.CSSProperties}
                >
                  <h4 className="change-type">
                    <span className="type-dot" />
                    {typeConfig[group.type]?.label || group.type}
                  </h4>
                  <ul className="change-list">
                    {group.items.map((item, i) => (
                      <li key={i} style={{ "--item-index": i } as React.CSSProperties}>
                        <IoChevronForward size={12} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="timeline-container">
        <div className="timeline-track">
          <div className="track-line" />
          <div 
            className="track-progress" 
            style={{ "--progress": `${(activeIndex / (reversedReleases.length - 1)) * 100}%` } as React.CSSProperties} 
          />
          {reversedReleases.map((release, index) => (
            <button
              key={release.version}
              className={`timeline-node ${activeRelease.version === release.version ? "active" : ""}`}
              onMouseEnter={() => handleReleaseHover(release, index)}
              onClick={() => handleReleaseHover(release, index)}
              style={{
                "--node-color": tagConfig[release.tag].color,
              } as React.CSSProperties}
            >
              <div className="node-dot">
                <div className="dot-inner">
                  {tagConfig[release.tag].icon}
                </div>
                <div className="dot-ring" />
                <div className="dot-pulse" />
              </div>
              <div className="node-info">
                <span className="node-version">v{release.version}</span>
                <span className="node-date">{release.date}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .changelog-showcase {
          display: flex;
          flex-direction: column;
          max-width: 900px;
          margin: 0 auto;
        }

        .detail-panel {
          background: var(--vp-glass-secondary, rgba(44, 44, 46, 0.45));
          backdrop-filter: blur(40px);
          border: 1px solid var(--vp-border-subtle, rgba(255, 255, 255, 0.08));
          border-radius: 24px;
          padding: 2rem;
          height: 460px;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .detail-panel::before {
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

        .panel-glow {
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 150px;
          background: radial-gradient(
            ellipse at center,
            color-mix(in srgb, var(--glow-color) 20%, transparent) 0%,
            transparent 70%
          );
          pointer-events: none;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          filter: blur(20px);
        }

        .detail-content {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
        }

        .changes-wrapper {
          flex: 1;
          overflow: hidden;
          margin-top: 1rem;
        }

        .detail-content.transitioning {
          opacity: 0.4;
          transform: translateY(4px);
        }

        .detail-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .version-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .version-number {
          font-size: 2.25rem;
          font-weight: 700;
          color: var(--vp-text-primary, rgba(255, 255, 255, 0.95));
          margin: 0;
          letter-spacing: -0.02em;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(255, 255, 255, 0.7) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .version-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.4rem 0.875rem;
          border-radius: 10px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          border: 1px solid var(--tag-color);
          background: var(--tag-bg);
          color: var(--tag-color);
          box-shadow: 0 2px 8px color-mix(in srgb, var(--tag-color) 20%, transparent);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
        }

        .version-tag:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px color-mix(in srgb, var(--tag-color) 30%, transparent);
        }

        .tag-icon {
          display: flex;
          align-items: center;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .version-tag:hover .tag-icon {
          transform: scale(1.2) rotate(5deg);
        }

        .version-date {
          font-size: 0.9375rem;
          color: var(--vp-text-tertiary, rgba(255, 255, 255, 0.5));
          font-weight: 500;
        }

        .version-summary {
          font-size: 1.0625rem;
          color: var(--vp-text-secondary, rgba(255, 255, 255, 0.7));
          line-height: 1.7;
          margin: 0 0 1.5rem;
        }

        .changes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.25rem;
          height: 100%;
        }

        .change-group {
          background: var(--vp-glass-tertiary, rgba(58, 58, 60, 0.4));
          border-radius: 14px;
          padding: 1.25rem 1.5rem;
          border: 1px solid var(--vp-border-subtle, rgba(255, 255, 255, 0.06));
          opacity: 0;
          transform: translateY(8px);
          animation: groupSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: calc(var(--group-index) * 0.1s);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          max-height: 100%;
          overflow: hidden;
        }

        @keyframes groupSlideIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .detail-content.transitioning .change-group {
          opacity: 0.5;
          transform: translateY(0);
          animation: none;
        }

        .change-group:hover {
          background: var(--vp-glass-tertiary, rgba(58, 58, 60, 0.5));
          border-color: color-mix(in srgb, var(--group-color) 30%, transparent);
          box-shadow: 0 4px 16px color-mix(in srgb, var(--group-color) 10%, transparent);
        }

        .change-type {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin: 0 0 0.875rem;
          padding-bottom: 0.625rem;
          border-bottom: 1px solid var(--vp-border-subtle, rgba(255, 255, 255, 0.08));
          color: var(--group-color);
        }

        .type-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--group-color);
          box-shadow: 0 0 8px var(--group-color);
        }

        .change-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
          overflow-y: auto;
          padding-right: 0.5rem;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
        }

        .change-list::-webkit-scrollbar {
          width: 4px;
        }

        .change-list::-webkit-scrollbar-track {
          background: transparent;
        }

        .change-list::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 2px;
        }

        .change-list::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        .change-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.8125rem;
          color: var(--vp-text-secondary, rgba(255, 255, 255, 0.7));
          line-height: 1.5;
          opacity: 0;
          transform: translateX(-6px);
          animation: itemSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: calc(var(--item-index) * 0.03s + 0.2s);
        }

        @keyframes itemSlideIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .detail-content.transitioning .change-list li {
          opacity: 0.5;
          transform: translateX(0);
          animation: none;
        }

        .change-list li svg {
          color: var(--group-color, var(--vp-text-tertiary));
          margin-top: 0.25rem;
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        .change-list li:hover svg {
          transform: translateX(3px);
        }

        /* Timeline */
        .timeline-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .timeline-label {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 100%;
          max-width: 500px;
        }

        .label-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--vp-border-subtle, rgba(255, 255, 255, 0.1)),
            transparent
          );
        }

        .label-text {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--vp-text-tertiary, rgba(255, 255, 255, 0.4));
        }

        .timeline-track {
          display: flex;
          align-items: center;
          gap: 0;
          position: relative;
          padding: 0.5rem 0;
        }

        .track-line {
          position: absolute;
          top: 50%;
          left: 60px;
          right: 60px;
          height: 2px;
          background: var(--vp-border-subtle, rgba(255, 255, 255, 0.08));
          transform: translateY(-50%);
          z-index: 0;
          border-radius: 1px;
        }

        .track-progress {
          position: absolute;
          top: 50%;
          left: 60px;
          width: calc(var(--progress, 0%) * 0.85);
          height: 2px;
          background: linear-gradient(
            90deg,
            rgba(168, 85, 247, 0.6),
            rgba(59, 130, 246, 0.8)
          );
          transform: translateY(-50%);
          z-index: 1;
          border-radius: 1px;
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 12px rgba(59, 130, 246, 0.4);
        }

        .timeline-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: transparent;
          border: none;
          cursor: pointer;
          position: relative;
          z-index: 2;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .timeline-node:hover {
          transform: translateY(-4px);
        }

        .node-dot {
          position: relative;
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dot-inner {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--vp-glass-secondary, rgba(44, 44, 46, 0.6));
          border: 2px solid var(--vp-border-subtle, rgba(255, 255, 255, 0.12));
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--vp-text-tertiary, rgba(255, 255, 255, 0.5));
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 2;
        }

        .dot-ring {
          position: absolute;
          inset: -4px;
          border: 2px solid var(--node-color);
          border-radius: 50%;
          opacity: 0;
          transform: scale(0.9);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .dot-pulse {
          position: absolute;
          inset: -8px;
          border: 1px solid var(--node-color);
          border-radius: 50%;
          opacity: 0;
          animation: dotPulse 2s ease-in-out infinite;
          animation-play-state: paused;
        }

        @keyframes dotPulse {
          0%, 100% { transform: scale(0.95); opacity: 0; }
          50% { transform: scale(1.1); opacity: 0.6; }
        }

        .timeline-node:hover .dot-inner {
          border-color: var(--node-color);
          color: var(--node-color);
          background: color-mix(in srgb, var(--node-color) 10%, rgba(44, 44, 46, 0.6));
        }

        .timeline-node:hover .dot-ring {
          opacity: 0.5;
          transform: scale(1);
        }

        .timeline-node.active .dot-inner {
          background: var(--node-color);
          border-color: var(--node-color);
          color: white;
          box-shadow: 
            0 0 24px color-mix(in srgb, var(--node-color) 50%, transparent),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
        }

        .timeline-node.active .dot-ring {
          opacity: 1;
          transform: scale(1);
        }

        .timeline-node.active .dot-pulse {
          animation-play-state: running;
        }

        .node-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.125rem;
        }

        .node-version {
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--vp-text-secondary, rgba(255, 255, 255, 0.7));
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .timeline-node:hover .node-version,
        .timeline-node.active .node-version {
          color: var(--vp-text-primary, rgba(255, 255, 255, 0.95));
        }

        .timeline-node.active .node-version {
          background: linear-gradient(135deg, var(--node-color), color-mix(in srgb, var(--node-color) 70%, white));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .node-date {
          font-size: 0.75rem;
          color: var(--vp-text-tertiary, rgba(255, 255, 255, 0.5));
          transition: color 0.3s ease;
        }

        .timeline-node:hover .node-date {
          color: var(--vp-text-secondary, rgba(255, 255, 255, 0.6));
        }

        /* Responsive */
        @media (max-width: 768px) {
          .detail-panel {
            padding: 1.5rem;
            height: auto;
            max-height: 400px;
          }

          .version-number {
            font-size: 1.75rem;
          }

          .changes-grid {
            grid-template-columns: 1fr;
          }

          .timeline-track {
            flex-direction: column;
            gap: 0.5rem;
          }

          .track-line,
          .track-progress {
            top: 40px;
            bottom: 40px;
            left: 50%;
            right: auto;
            width: 2px;
            height: auto;
            transform: translateX(-50%);
          }

          .track-progress {
            width: 2px;
            height: calc(var(--progress, 0%) * 0.85);
          }

          .timeline-node {
            flex-direction: row;
            padding: 0.75rem 1rem;
            width: 100%;
            justify-content: flex-start;
            gap: 1rem;
          }

          .timeline-node:hover {
            transform: translateX(4px);
          }

          .node-dot {
            width: 44px;
            height: 44px;
          }

          .dot-inner {
            width: 40px;
            height: 40px;
          }

          .node-info {
            align-items: flex-start;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .detail-content,
          .change-group,
          .change-list li,
          .timeline-node,
          .dot-inner,
          .dot-ring,
          .dot-pulse,
          .track-progress,
          .panel-glow,
          .version-tag,
          .tag-icon {
            transition: none;
            animation: none;
          }

          .change-group,
          .change-list li {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ChangelogTimeline;
