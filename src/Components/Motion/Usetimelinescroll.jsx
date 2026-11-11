import { useEffect, useRef, useState } from 'react';

/* Content */

export const timelineIntro = {
  label: 'MY WORKFLOW',
  title: 'A simple process, done with Care.'
};

export const timelineSteps = [
  {
    icon: '',
    title: 'Understand',
    text: 'I take time to understand the task, its purpose, and what needs to be accomplished.',
    tagLabel: 'FOCUS',
    tagValue: 'Clarity and Preparation'
  },
  {
    icon: '',
    title: 'Prepare',
    text: 'I organize my tasks, set priorities, and make sure I have a clear direction before getting started.',
    tagLabel: 'FOCUS',
    tagValue: 'Organization and Planning'
  },
  {
    icon: '',
    title: 'Work with Purpose',
    text: 'I approach each task carefully, paying attention to the details and keeping the goal in mind.',
    tagLabel: 'FOCUS',
    tagValue: 'Care and Consistency'
  },
  {
    icon: '',
    title: 'Review',
    text: 'I check my work, identify mistakes, and make the necessary adjustments before considering it complete.',
    tagLabel: 'FOCUS',
    tagValue: 'Accuracy and Responsibility'
  },
  {
    icon: '',
    title: 'Improve',
    text: 'I learn from the process, build on what I know, and work on becoming more consistent over time.',
    tagLabel: 'FOCUS',
    tagValue: 'Learning and steady Improvement'
  }
];

export const timelineDescription =
  'I believe good work comes from understanding the task, paying attention to details, and consistently improving along the way.';

/* Constants */

const TRIGGER_RATIO = 0.5;

/* Scroll logic: returns { containerRef, iconRefs, line: { top, height, fill }, activeCount } */

export function useTimelineScroll() {
  /* Refs & state */

  const containerRef = useRef(null);
  const iconRefs = useRef([]);

  const [line, setLine] = useState({ top: 0, height: 0, fill: 0 });
  const [activeCount, setActiveCount] = useState(0);

  /* Effects */

  useEffect(() => {
    function update() {
      const container = containerRef.current;
      const icons = iconRefs.current.filter(Boolean);
      if (!container || icons.length === 0) return;

      const containerTop = container.getBoundingClientRect().top;

      const centers = icons.map(icon => {
        const r = icon.getBoundingClientRect();
        return r.top + r.height / 2 - containerTop;
      });

      const firstCenter = centers[0];
      const lastCenter = centers[centers.length - 1];
      const triggerY = window.innerHeight * TRIGGER_RATIO - containerTop;

      const fill = Math.min(Math.max(triggerY - firstCenter, 0), lastCenter - firstCenter);

      let count = 0;
      centers.forEach(c => {
        if (triggerY >= c) count += 1;
      });

      setLine({ top: firstCenter, height: lastCenter - firstCenter, fill });
      setActiveCount(count);
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return { containerRef, iconRefs, line, activeCount };
}