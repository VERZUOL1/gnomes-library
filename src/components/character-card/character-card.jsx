import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import ResponsiveImage from '../responsive-image';

import './character-card.scss';

const CharacterCard = ({
  data,
  style
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className='gl-character-card__container' style={style}>
      <div
        className={clsx('gl-character-card', { open })}
        onClick={() => setOpen(true)}>
        <div className='gl-character-card__front'>
          <ResponsiveImage src={data.thumbnail} thumbSrc={''} className='gl-character__avatar' />
          <div className='gl-character__name'>{data.name}</div>
          <div className='gl-character__info'>
            {data.professions.map(item => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </div>
        <div className='gl-character-card__back'>
          hello
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
    friends: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  style: PropTypes.shape({}).isRequired
};

export default CharacterCard;
