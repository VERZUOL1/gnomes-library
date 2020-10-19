import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import ResponsiveImage from '../responsive-image';

import './character-card.scss';

const CharacterCard = ({
  data: {
    name,
    age,
    weight,
    height,
    hair_color,
    friends,
    professions,
    thumbnail,
    gender
  },
  style
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className='gl-character-card__container' style={style}>
      <div
        className={clsx('gl-character-card', { open })}
        onClick={() => setOpen(!open)}>
        <div className='gl-character-card__front'>
          <ResponsiveImage
            src={thumbnail}
            thumbSrc={thumbnail}
            className='gl-character__avatar'
            visible />
          <div className={clsx('gl-character__name', gender)}>{name}</div>
          <div className='gl-character__info'>
            {professions.map(item => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </div>
        <div className='gl-character-card__back'>
          <div className='gl-inline-block'>
            <span className='gl-label'>Age</span>
            <span className='gl-value'>{age}</span>
          </div>
          <div className='gl-inline-block'>
            <span className='gl-label'>Weight</span>
            <span className='gl-value'>{weight?.toFixed(2)}</span>
          </div>
          <div className='gl-inline-block'>
            <span className='gl-label'>Height</span>
            <span className='gl-value'>{height?.toFixed(2)}</span>
          </div>
          <div className='gl-inline-block'>
            <span className='gl-label'>Hair color</span>
            <span className='gl-value'>{hair_color}</span>
          </div>
          <div className='gl-inline-block align-start'>
            <span className='gl-label'>Friends</span>
            <ul>
              {friends.length
                ? friends.map(item => (
                  <li key={item}>{item}</li>
                ))
                : 'None'}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

CharacterCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    thumbnail: PropTypes.string,
    age: PropTypes.number,
    weight: PropTypes.number,
    height: PropTypes.number,
    hair_color: PropTypes.string,
    professions: PropTypes.arrayOf(PropTypes.string),
    friends: PropTypes.arrayOf(PropTypes.string),
    gender: PropTypes.string
  }).isRequired,
  style: PropTypes.shape({}).isRequired
};

export default React.memo(CharacterCard);
