import React from 'react';
import { useTranslation } from 'react-i18next';

import { FaChevronRight, FaChevronDown } from 'react-icons/fa';

import accordionStyles from '../styles/components/Accordion.module.scss';

type AccordionSectionProps = {
  isOpen: boolean, 
  id: string,
  label: string,
  onClick: (label: string) => void,
}

type DivStyles = React.CSSProperties;

const AccordionSection : React.FC<AccordionSectionProps> = (props) => {
  const { isOpen, id, label, onClick, children } = props;
  const sectionStyles : DivStyles = isOpen ? { display: 'block' } : {};

  return (
    <div
        style={sectionStyles}
    >
      <div 
        className={accordionStyles.accordionHeader}
        onClick={() => onClick(id)}
      >
        { label }
        <div style={{ float: "right" }}>
          {!isOpen && <FaChevronRight size={18}/>}
          {isOpen && <FaChevronDown size={18} />}
        </div>
      </div>
    {isOpen && (
      <div 
        className={accordionStyles.content}
      >
        {children} 
      </div>
    )}
    </div>
  );
}

export default AccordionSection;
