import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateResumeField, updateResumeRequest } from '../resumeEditorSlice';
import ResumePreview from '../ResumePreview';
import HeaderBar from '../HeaderBar';
import { toast } from 'react-toastify';

const ContactInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { resume } = useSelector((state) => state.resumeEditor);
    const personal = resume.personal || {};
    const [themeColor, setThemeColor] = useState(resume.themeColor || '');
  const [showColorPicker, setShowColorPicker] = useState(false);
const token = useSelector((state) => state.auth?.token);

    const handleChange = (field, value) => {
        dispatch(updateResumeField({ section: 'personal', field, value }));
    };



 const handleSave = () => {
    if (resume._id) {
      dispatch(updateResumeRequest({ id: resume._id, data: resume, token }));
      toast.success('Resume saved successfully!');
    }
  };


   
       const handleNext = () => {
  if (!resume._id) {
    toast.error("Missing Resume ID");
    return;
  }
  navigate(`/experience/${resume._id}/edit`);
};

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <>
             <HeaderBar
        resume={resume}
        themeColor={themeColor}
        setThemeColor={setThemeColor}
        showColorPicker={showColorPicker}
        setShowColorPicker={setShowColorPicker}
      />

            <div className="container-fluid mt-4">
                <div className="row">
                    {/* === LEFT: Form Panel === */}
                    <div className="col-lg-6 mb-4">
                        <div className="bg-white p-4 rounded-3 shadow-sm d-flex flex-column justify-content-between">
                            <div>
                                <h5 className="fw-bold text-primary mb-4">Contact Information</h5>

                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Short Address"
                                        value={personal.address || ''}
                                        onChange={(e) => handleChange('address', e.target.value)}
                                    />
                                </div>

                                <div className="row g-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="john@example.com"
                                            value={personal.email || ''}
                                            onChange={(e) => handleChange('email', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Phone</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="9876543210"
                                            value={personal.phone || ''}
                                            onChange={(e) => handleChange('phone', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="row g-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">LinkedIn</label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            placeholder="https://linkedin.com/in/username"
                                            value={personal.linkedin || ''}
                                            onChange={(e) => handleChange('linkedin', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">GitHub</label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            placeholder="https://github.com/username"
                                            value={personal.github || ''}
                                            onChange={(e) => handleChange('github', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Website / Portfolio</label>
                                    <input
                                        type="url"
                                        className="form-control"
                                        placeholder="https://yourwebsite.com"
                                        value={personal.website || ''}
                                        onChange={(e) => handleChange('website', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* === Action Buttons === */}
                            <div className="d-flex justify-content-between align-items-center mt-4 pt-2">
                                <button
                                    className="btn btn-secondary text-white px-4 py-2 rounded-pill fw-semibold shadow-sm"
                                    onClick={handleBack}
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
                    </div>

                    {/* === RIGHT: Live Preview Panel === */}
                    <div className="col-lg-6">
                        <div className="sticky-top" style={{ top: '100px' }}>
                            <ResumePreview resume={resume} themeColor={themeColor} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactInfo;
