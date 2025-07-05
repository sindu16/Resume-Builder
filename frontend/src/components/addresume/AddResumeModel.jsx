import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addResumeRequest } from './addResumeSlice';
import { useNavigate } from 'react-router-dom';

const AddResumeModal = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.login);
  const [title, setTitle] = useState('');
  
  const navigate = useNavigate();
  
  const handleCreate = () => {
    
    
    if (title.trim()) {
     
      dispatch(
        addResumeRequest({
          token,
          title,
          onSuccess: (newResumeId) => {
            setTitle('');
            onClose();
            navigate(`/resume/${newResumeId}/edit`);
          },
          onError: (error) => {
            console.error('Resume creation failed:', error); 
          }
        })
      );
    } else {
      console.log('Title is empty, not creating resume'); 
    }
  };
  
  if (!show) return null;
  
  
  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-3">
          <div className="modal-header border-0">
            <h5 className="modal-title">Create New Resume</h5>
            <button className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">
            <p className="text-muted">Give your resume a title to get started.</p>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: Mike's Resume"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleCreate();
                }
              }}
            />
          </div>
          <div className="modal-footer border-0">
            <button 
              className="btn btn-dark w-100" 
              onClick={handleCreate}
              disabled={!title.trim()}
            >
              Create Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddResumeModal;