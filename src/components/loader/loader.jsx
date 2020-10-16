import React from 'react';
import PropTypes from 'prop-types';
import { Animate } from 'react-move';
import { easeQuadOut } from 'd3-ease';
import clsx from 'clsx';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { Icons } from '../icon';

import { interpolation } from '../../helpers/common';

import './loader.scss';

const Loader = ({ show, startOpacity, showProgress }) => (
  <div style={{
    // display: show ? 'block' : 'none',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    backdropFilter: show ? 'blur(3px)' : 'none',
    pointerEvents: show ? 'all' : 'none'
  }}>
    <Animate
      show={show}
      start={{ opacity: startOpacity }}
      enter={{
        opacity: [0.68],
        timing: { duration: 750, delay: 0, ease: easeQuadOut }
      }}
      update={{
        opacity: [0.68],
        timing: { duration: 750, ease: easeQuadOut, delay: 0 }
      }}
      leave={[
        {
          opacity: [0],
          timing: { delay: 0, duration: 500, ease: easeQuadOut }
        }
      ]}
      interpolation={interpolation}>
      {({ opacity }) => (
        <div
          className={clsx('gl-loader__container')}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
          }}
          style={{ opacity }}>
          <div className={clsx('gl-loader__logo')}>Gnomes</div>
          {!!showProgress && (
            <div style={{ width: '100%' }}>
              <Grid>
                <Row center='xs'>
                  <Col xs={10} md={4} lg={4}>
                    <div className='gl-loader__progress'>
                      <div className='gl-loader__progress-bar' style={{ width: `${showProgress}%` }} />
                    </div>
                  </Col>
                </Row>
              </Grid>
            </div>
          )}
        </div>
      )}
    </Animate>
  </div>
);

Loader.defaultProps = {
  startOpacity: 0,
  showProgress: 0
};

Loader.propTypes = {
  show: PropTypes.bool.isRequired,
  startOpacity: PropTypes.number,
  showProgress: PropTypes.number
};

export default Loader;
