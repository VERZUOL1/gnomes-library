import React from 'react';

// Components
import Navbar from '../navbar';
import Content from '../content';
import Title from '../../components/title';

// Helpers
import { useIntersect, useDataLoader } from '../../helpers/hooks';

// Styles
import './library.scss';

const Library = () => {
  const [observerEntry, entryRef] = useIntersect({
    threshold: '0.1, 0.11, 1',
    rootMargin: '100px 0px 0px 0px'
  });

  useDataLoader();

  return (
    <div className='gl-container'>
      <Navbar visible={observerEntry.isIntersecting && observerEntry.boundingClientRect.top <= 0} />
      <div className='gl-parallax-wrapper'>
        <Title title='Gnomes library' />
      </div>
      <div className='gl-regular-wrapper' ref={entryRef}>
        <Content />
        <div className='overlay' />
      </div>
    </div>
  );
};

export default Library;
