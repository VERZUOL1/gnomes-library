import React from 'react';
import { useSelector } from 'react-redux';

import Modal from '../../components/modal';

const Errors = () => {
  const { internalServer, notFound, badRequest } = useSelector(state => state.errors);
  return (
    <div>
      {internalServer && (
        <Modal show>
          <h3>{internalServer}</h3>
        </Modal>
      )}
      {notFound && (
        <Modal show>
          <h3>{internalServer}</h3>
        </Modal>
      )}
      {badRequest && (
        <Modal show>
          <h3>{internalServer}</h3>
        </Modal>
      )}
    </div>
  );
};

export default Errors;
