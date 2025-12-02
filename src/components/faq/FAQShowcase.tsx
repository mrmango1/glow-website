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
    </div>
  );
};

export default FAQShowcase;
