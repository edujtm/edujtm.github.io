import React, { useState } from 'react';

import AccordionSection from './AccordionSection'; 

import accordionStyles from '../styles/components/Accordion.module.scss';

export type AccordionItem = {
  id: string,
  header: string,
  content: string,
  url?: string,
}

type AccordionProps = {
  items: Array<AccordionItem>,
}

type SectionFlags = { [section: string]: boolean }

const useSections = () : [SectionFlags, (section: string, isOpen: boolean) => void] => {
  const [openSections, setOpenSections] = useState<SectionFlags>({});

  const setSectionOpen = (section: string, isOpen: boolean) => {
    const newSections = { ...openSections, [section]: isOpen };
    setOpenSections(newSections);
  };

  return [openSections, setSectionOpen];
}

const Accordion = (props: AccordionProps) => {
  const { items } = props;
  const [openSections, setSectionOpen] = useSections();

  const onSectionClick = (id: string) => {
    const isOpen = !!openSections[id];
    setSectionOpen(id, !isOpen); 
  }

  return (
    <div className={accordionStyles.accordionContainer}>
      {items.map(item => (
        <AccordionSection
          key={item.id}
          id={item.id}
          label={item.header}
          isOpen={!!openSections[item.id]}
          onClick={onSectionClick}
        >
          <p style={{}}>
            {item.content}
          </p>
          <div style={{ marginTop: '8px', marginBottom: '8px' }}>
            {item.url && <a href={item.url}>Source Code</a>}
          </div>
        </AccordionSection>
      ))}
    </div>
  );
}

export default Accordion;
