import React from 'react';
import { useTranslation } from 'react-i18next';

import Accordion, { AccordionItem } from './Accordion';
import projectsStyles from '../styles/components/PersonalProjects.module.scss';

const PersonalProjects = () => {
  const { t } = useTranslation('projects');

  const ids = ["diversify", "tuyo", "personal-website"]; 

  const projects : Array<AccordionItem> = ids.map((id) => {
    const item = t(id, { returnObjects: true }) as AccordionItem;

    return {
      id,
      header: item.header,
      content: item.content,
      url: item.url
    };
  });

  return (
    <div className={projectsStyles.projectsContainer}>
      <h1 className={projectsStyles.projectsHeader}>Personal Projects</h1>
      <Accordion items={projects} />
    </div>
  );
}

export default PersonalProjects;
