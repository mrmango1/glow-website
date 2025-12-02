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
    </div>
  );
};

export default ChangelogTimeline;
