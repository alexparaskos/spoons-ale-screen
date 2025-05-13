import { IonFooter, IonIcon, IonItem, IonText, IonToolbar } from '@ionic/react';
import './Footer.css';

const items = [
  '© 2025 Your Company',
  'Privacy Policy',
  'Terms of Service',
  'Contact',
  'Support',
];

const Footer: React.FC<{}> = ({ }) => {
  return (
    <IonFooter>
      <IonToolbar className="scrolling-toolbar">
        <div className="scrolling-wrapper">
          <div className="scrolling-track">
            {[...items, ...items].map((text, index) => (
              <span key={index} className="scrolling-item">
                {text}
              </span>
            ))}
          </div>
        </div>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;
