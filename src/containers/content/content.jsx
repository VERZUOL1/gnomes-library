import React from 'react';
// import PropTypes from 'prop-types';
import { FixedSizeGrid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useSelector } from 'react-redux';

// Helpers
import { getDataByCity } from '../../selectors/library';
import { useResizableGrid } from '../../helpers/hooks';

const Content = () => {
  const data = useSelector(getDataByCity);
  const gridProps = useResizableGrid(data.length);

  return (
    <div className='gl-content'>
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeGrid
            {...gridProps}
            columnWidth={width && gridProps.columnCount ? width / gridProps.columnCount : 0}
            height={height}
            width={width || 0}>
            {({ columnIndex, rowIndex, style }) => (
              <div style={{ ...style, padding: 12 }}>
                row {rowIndex}, column {columnIndex}
              </div>
            )}
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
