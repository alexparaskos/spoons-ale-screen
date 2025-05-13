import React, { useEffect, useRef, useState } from 'react';
import { IonFooter, IonIcon, IonItem, IonText, IonToolbar } from '@ionic/react';
import './Footer.css';

const sections = [
  { title: 'Legal', items: ['Privacy Policy', 'Terms of Service'] },
  { title: 'Support', items: ['Contact', 'Help Center'] },
  { title: 'Company', items: ['About', 'Careers'] }, 
   { title: 'Leg232al', items: ['Privacy Policy', 'Terms of Service'] },
  { title: 'Sup23port', items: ['Contact', 'Help Center'] },
  { title: 'Comp232any', items: ['About', 'Careers'] },
];

const HorizontalStickyFooter = () => {
  const scrollRef = useRef(null);

  // Simple auto-scroll effect
  useEffect(() => {
    const scrollEl = scrollRef.current;
    let reqId;
    let scrollLeft = 0;

    const step = () => {
      if (!scrollEl) return;
      scrollLeft += 0.5;
      if (scrollLeft >= scrollEl.scrollWidth / 2) {
        scrollLeft = 0;
      }
      scrollEl.scrollLeft = scrollLeft;
      reqId = requestAnimationFrame(step);
    };

    step();
    return () => cancelAnimationFrame(reqId);
  }, []);

  const repeatedSections = [...sections, ...sections]; // For infinite loop

  return (
    <IonFooter>
      <IonToolbar className="footer-toolbar">
        <div className="scroll-container" ref={scrollRef}>
          {sections.map((section, index) => (
            <div className="scroll-section" key={index}>
              <div className="section-header">{section.title}</div>
              <div className="section-items">
                {section.items.map((item, i) => (
                  <span className="scroll-item" key={i}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </IonToolbar>
    </IonFooter>
  );
};

export default HorizontalStickyFooter;