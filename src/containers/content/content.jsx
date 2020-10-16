import React from 'react';
// import PropTypes from 'prop-types';
import { FixedSizeGrid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useSelector } from 'react-redux';

// Components
import CharacterCard from '../../components/character-card';

// Helpers
import { getDataByCity } from '../../selectors/library';
import { useResizableGrid } from '../../helpers/hooks';
import { getCharacterData } from '../../helpers/common';

const Content = () => {
  const data = useSelector(getDataByCity);
  const gridProps = useResizableGrid(data.length);

  return (
    <div className='gl-content'>
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeGrid
            columnWidth={width && gridProps.columnCount ? width / gridProps.columnCount : 0}
            height={height}
            width={width || 0}
            {...gridProps}>
            {({ columnIndex, rowIndex, style }) => {
              const characterData = getCharacterData(
                data,
                columnIndex,
                rowIndex,
                gridProps.columnCount
              );
              return (
                <CharacterCard data={characterData} style={style} />
              );
            }}
          </FixedSizeGrid>
        )}
      </AutoSizer>
    </div>
  );
};

// Content.propTypes = {
//
// };

export default Content;
