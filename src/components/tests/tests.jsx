import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

const Tests = () => (
  <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Grid>
      <Row center='xs'>
        <Col xs={2}>
          Hello
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Tests;
