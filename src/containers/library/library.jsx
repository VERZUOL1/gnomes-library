import React from 'react';

// Components
import Navbar from '../navbar';
import Content from '../content';
import Title from '../../components/title';

// Helpers
import { useIntersect } from '../../helpers/hooks';

// Styles
import './library.scss';

const Library = () => {
  const [observerEntry, entryRef] = useIntersect({
    threshold: '0.1, 0.11, 1',
    rootMargin: '100px 0px 0px 0px'
  });

  return (
    <div className='gl-container'>
      <Navbar visible={observerEntry.isIntersecting && observerEntry.intersectionRatio === 1} />
      <div className='gl-parallax-wrapper'>
        <Title title='Gnomes library' />
      </div>
      <div className='gl-regular-wrapper' ref={entryRef}>
        <Content />
      </div>
    </div>
  );
};

export default Library;
