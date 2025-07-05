import  { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateResumeField, updateResumeRequest } from '../resumeEditorSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PersonalInfo = ({ resume, resumeId, token, themeColor, onBack }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const personal = resume?.personal || {};
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    dispatch(updateResumeField({ section: 'personal', field, value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();<input class="form-control" required type="password" value name="password"></input>
      reader.onloadend = () => handleChange('profileImage', reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (resumeId) {
      dispatch(updateResumeRequest({ id: resumeId, data: resume, token }));
      toast.success('Resume saved successfully!');
    }
  };

  const handleNext = () => {
    if (!resume._id) {
      toast.error("Missing Resume ID");
      return;
    }
    navigate(`/contact/${resume._id}/edit`);
  };

  return (
    <div className="card shadow-sm p-4">
      <h5 className="text-primary mb-4">Personal Information</h5>

      {/* Profile Image Upload */}
      <div className="d-flex align-items-center mb-4">
        <div className="position-relative d-inline-block">
          <div
            className="rounded-circle bg-light border d-flex justify-content-center align-items-center overflow-hidden"
            style={{ width: '100px', height: '100px' }}
          >
            {personal.profileImage ? (
              <img
                src={personal.profileImage}
                alt="Profile"
                className="img-fluid rounded-circle"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <i className="bi bi-person-fill fs-1 text-muted"></i>
            )}
          </div>

          <button
            type="button"
            className="btn position-absolute"
            style={{
              bottom: 0,
              right: 0,
              backgroundColor: '#000', 
              color: '#fff',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => fileInputRef.current.click()}
          >
            <i className="bi bi-upload"></i>
          </button>

          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>
      </div>

      {/* Full Name, Designation, Summary */}
      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <input
            className="form-control"
            placeholder="Full Name"
            value={personal.fullName || ''}
            onChange={(e) => handleChange('fullName', e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-2">
          <input
            className="form-control"
            placeholder="Designation"
            value={personal.designation || ''}
            onChange={(e) => handleChange('designation', e.target.value)}
          />
        </div>
      </div>

      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Professional Summary"
          rows={4}
          value={personal.summary || ''}
          onChange={(e) => handleChange('summary', e.target.value)}
        />
      </div>

      {/* Action Buttons */}
      <div className="d-flex justify-content-between align-items-center mt-3 pt-4">
        <button
          className="btn btn-secondary text-white px-4 py-2 rounded-pill fw-semibold shadow-sm"
          onClick={onBack}
        >
          <i className="bi bi-arrow-left me-2"></i> Back
        </button>
        <div className="d-flex gap-2">
          <button
            className="btn btn-success text-white px-4 py-2 rounded-pill fw-semibold shadow-sm"
            onClick={handleSave}
          >
            <i className="bi bi-check-circle me-2"></i> Save
          </button>
          <button
            className="btn btn-primary text-white px-4 py-2 rounded-pill fw-semibold shadow-sm"
            onClick={handleNext}
          >
            Next Step <i className="bi bi-arrow-right ms-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
