import { IonContent } from '@ionic/react';
import './EmptyComponent.css';
import { createRef, ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const AutoScroll: React.FC<ContainerProps> = (props) => {
  const contentRef = createRef<HTMLIonContentElement>();

  function scrollToBottom() {
    // Passing a duration to the method makes it so the scroll slowly
    // goes to the bottom instead of instantly
    contentRef.current?.scrollToBottom(500);
  }

  function scrollToTop() {
    // Passing a duration to the method makes it so the scroll slowly
    // goes to the top instead of instantly
    contentRef.current?.scrollToTop(500);
  }
  contentRef.current?.scrollToBottom(500);
  return (
    <IonContent fullscreen={true} ref={contentRef} className="">
      {props.children}
    </IonContent>
  )
};

export default AutoScroll;
