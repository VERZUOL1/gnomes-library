import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import './library.scss';

const Library = () => (
  <div className='gl-container'>
    <Grid>
      <Row>
        <Col>
          Hello gnomes!
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Library;
