import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResumeActionModal = ({ show, resume, onClose, onDelete }) => {
  const navigate = useNavigate();

  if (!show || !resume) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow">
          <div className="modal-header">
            <h5 className="modal-title">Resume Options</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body text-center">
            <h6>{resume.title}</h6>
            <p className="text-muted">Choose an action:</p>
            <div className="d-flex justify-content-around mt-4">
              <button
                className="btn btn-outline-dark px-4 rounded-pill fw-semibold"
                onClick={() => {
                  navigate(`/resume/${resume._id}/edit`);
                  onClose();
                }}
              >
                <i className="bi bi-eye me-1"></i> Preview
              </button>
              <button
                className="btn btn-outline-danger px-4 rounded-pill fw-semibold"
                onClick={() => {
                  onDelete(resume._id);
                }}
              >
                <i className="bi bi-trash me-1"></i> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeActionModal;
