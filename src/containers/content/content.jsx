import React from 'react';
import { FixedSizeGrid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useSelector } from 'react-redux';

// Components
import CharacterCard from '../../components/character-card';
import Loader from '../../components/loader';

// Helpers
import { getFilteredData } from '../../selectors/library';
import { useResizableGrid } from '../../helpers/hooks';
import { getCharacterData } from '../../helpers/common';

const Content = () => {
  const data = useSelector(getFilteredData);
  const isLoading = useSelector(state => state.library.loading) || false;
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
              if (!characterData) return null;

              return (
                <CharacterCard data={characterData} style={style} />
              );
            }}
          </FixedSizeGrid>
        )}
      </AutoSizer>
      <Loader show={isLoading} />
    </div>
  );
};

export default Content;
