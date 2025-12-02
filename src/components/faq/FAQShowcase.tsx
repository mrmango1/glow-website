import React, { useState } from "react";
import { IoHelpCircle, IoChevronForward } from "react-icons/io5";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What's included in the price?",
    answer: "The $5.99 launch price includes the full version of Glow with all features, lifetime updates for version 1.x, and a license for up to 3 devices."
  },
  {
    question: "Is this a subscription?",
    answer: "No! Glow is a one-time purchase. Pay once and use it forever. No recurring charges, no hidden fees."
  },
  {
    question: "What about future updates?",
    answer: "All updates for version 1.x are included free. When version 2.0 is released (if ever), upgrade pricing will be offered at a significant discount."
  },
  {
    question: "What are Fluid Animations?",
    answer: "Fluid Animations are our ultra-smooth animation system that makes your menu bar feel incredibly responsive and alive. We're calling it Beta because we're continuously improving and refining the experience based on user feedback. It works great on all Macs running macOS 26+."
  },
  {
    question: "Can I use Glow on multiple Macs?",
    answer: "Yes! Your license allows installation on up to 3 Macs that you personally own and use."
  },
  {
    question: "What's your refund policy?",
    answer: "We offer a 30-day money-back guarantee. If Glow doesn't meet your expectations, contact us for a full refund within 30 days of purchase."
  },
  {
    question: "How does Glow compare to Bartender?",
    answer: "Glow features exclusive Fluid Animations and Liquid Glass effects that you won't find anywhere else. We also offer a one-time purchase instead of a subscription, better performance (<16ms latency), and modern architecture built with Swift 6.2."
  },
  {
    question: "Is Glow on the Mac App Store?",
    answer: "Currently, Glow is only available as a direct download from our website. This allows us to offer better pricing and faster updates."
  }
];

const FAQShowcase: React.FC = () => {
  const [activeFAQ, setActiveFAQ] = useState<FAQ>(faqs[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleFAQHover = (faq: FAQ) => {
    if (faq.question !== activeFAQ.question) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveFAQ(faq);
        setIsTransitioning(false);
      }, 120);
    }
  };

  return (
    <div className="faq-showcase">
      {/* Questions List */}
      <div className="questions-panel">
        {faqs.map((faq, index) => (
          <button
            key={index}
            className={`question-item ${activeFAQ.question === faq.question ? "active" : ""}`}
            onMouseEnter={() => handleFAQHover(faq)}
            onClick={() => handleFAQHover(faq)}
            style={{ "--item-index": index } as React.CSSProperties}
          >
            <div className="question-icon-wrapper">
              <IoHelpCircle className="question-icon" size={20} />
              <div className="icon-glow" />
            </div>
            <span className="question-text">{faq.question}</span>
            <IoChevronForward className="arrow-icon" size={16} />
          </button>
        ))}
      </div>

      {/* Answer Panel */}
      <div className="answer-panel">
        <div className="panel-glow" />
        <div className={`answer-content ${isTransitioning ? "transitioning" : ""}`}>
          <h3 className="answer-question">{activeFAQ.question}</h3>
          <p className="answer-text">{activeFAQ.answer}</p>
        </div>
      </div>

      <style>{`
        .faq-showcase {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        /* Questions Panel */
        .questions-panel {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .question-item {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 1rem 1.25rem;
          background: var(--vp-glass-secondary, rgba(44, 44, 46, 0.45));
          border: 1px solid var(--vp-border-subtle, rgba(255, 255, 255, 0.08));
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: left;
          position: relative;
          overflow: hidden;
          transform: translateX(0);
        }

        .question-item::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.03) 0%,
            transparent 50%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .question-item:hover {
          background: var(--vp-glass-tertiary, rgba(58, 58, 60, 0.5));
          border-color: var(--vp-border-regular, rgba(255, 255, 255, 0.15));
          transform: translateX(4px);
        }

        .question-item:hover::before {
          opacity: 1;
        }

        .question-item.active {
          background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.12) 0%,
            rgba(59, 130, 246, 0.06) 100%
          );
          border-color: rgba(59, 130, 246, 0.35);
          box-shadow: 
            0 0 24px rgba(59, 130, 246, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          transform: translateX(8px);
        }

        .question-icon-wrapper {
          position: relative;
          flex-shrink: 0;
        }

        .question-icon {
          color: var(--vp-text-tertiary, rgba(255, 255, 255, 0.5));
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 1;
        }

        .icon-glow {
          position: absolute;
          inset: -4px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%);
          border-radius: 50%;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          filter: blur(4px);
        }

        .question-item:hover .question-icon,
        .question-item.active .question-icon {
          color: #3b82f6;
          transform: scale(1.1);
        }

        .question-item.active .icon-glow {
          opacity: 1;
          transform: scale(1);
        }

        .question-text {
          flex: 1;
          font-size: 0.9375rem;
          font-weight: 500;
          color: var(--vp-text-secondary, rgba(255, 255, 255, 0.7));
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          line-height: 1.4;
        }

        .question-item:hover .question-text,
        .question-item.active .question-text {
          color: var(--vp-text-primary, rgba(255, 255, 255, 0.95));
        }

        .arrow-icon {
          color: var(--vp-text-tertiary, rgba(255, 255, 255, 0.3));
          flex-shrink: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          transform: translateX(-8px);
        }

        .question-item:hover .arrow-icon {
          opacity: 0.7;
          transform: translateX(0);
          color: var(--vp-text-secondary, rgba(255, 255, 255, 0.7));
        }

        .question-item.active .arrow-icon {
          opacity: 1;
          transform: translateX(2px);
          color: #3b82f6;
        }

        /* Answer Panel */
        .answer-panel {
          background: var(--vp-glass-secondary, rgba(44, 44, 46, 0.45));
          backdrop-filter: blur(40px);
          border: 1px solid var(--vp-border-subtle, rgba(255, 255, 255, 0.08));
          border-radius: 24px;
          padding: 2rem;
          display: flex;
          align-items: center;
          min-height: 340px;
          position: relative;
          overflow: hidden;
        }

        .answer-panel::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 50%,
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
            rgba(59, 130, 246, 0.2) 0%,
            transparent 70%
          );
          pointer-events: none;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          filter: blur(20px);
        }

        .answer-content {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          width: 100%;
        }

        .answer-content.transitioning {
          opacity: 0.4;
          transform: translateY(4px);
        }

        .answer-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.2) 0%,
            rgba(139, 92, 246, 0.15) 100%
          );
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 10px;
          margin-bottom: 1rem;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #3b82f6;
          font-variant-numeric: tabular-nums;
        }

        .answer-number span {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .answer-question {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--vp-text-primary, rgba(255, 255, 255, 0.95));
          margin: 0 0 1rem;
          line-height: 1.3;
          letter-spacing: -0.01em;
        }

        .answer-text {
          font-size: 1.0625rem;
          color: var(--vp-text-secondary, rgba(255, 255, 255, 0.7));
          line-height: 1.75;
          margin: 0;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .faq-showcase {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .answer-panel {
            padding: 1.5rem;
            min-height: auto;
          }

          .answer-question {
            font-size: 1.25rem;
          }

          .question-item {
            padding: 0.875rem 1rem;
          }

          .question-item:hover,
          .question-item.active {
            transform: translateX(0);
          }

          .question-text {
            font-size: 0.875rem;
          }

          .panel-glow {
            display: none;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .question-item,
          .question-icon,
          .arrow-icon,
          .answer-content,
          .icon-glow,
          .panel-glow {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
};

export default FAQShowcase;
