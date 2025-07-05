import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateResumeField, updateResumeRequest } from '../resumeEditorSlice';
import ResumePreview from '../ResumePreview';
import HeaderBar from '../HeaderBar';
import { toast } from 'react-toastify';

const EducationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { resume } = useSelector((state) => state.resumeEditor);
  const education = useMemo(() => resume.education || [], [resume.education]);
  const token = useSelector((state) => state.login.token);

  const [themeColor, setThemeColor] = useState(resume.themeColor || '');
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    if (education.length === 0) {
      handleAddEducation();
    }
   
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    dispatch(updateResumeField({ field: 'education', value: updated }));
  };

  const handleAddEducation = () => {
    const newEntry = {
      degree: '',
      institution: '',
      startYear: '',
      endYear: '',
    };
    const updated = [...education, newEntry];
    dispatch(updateResumeField({ field: 'education', value: updated }));
  };

  const handleRemoveEducation = (index) => {
    const updated = [...education];
    updated.splice(index, 1);
    dispatch(updateResumeField({ field: 'education', value: updated }));
  };

  const handleBack = () => navigate(-1);

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
    navigate(`/skillsform/${resume._id}/edit`);
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
          {/* === LEFT FORM PANEL === */}
          <div className="col-lg-6 mb-4">
            <div className="bg-white p-4 rounded shadow-sm">
              <h5 className="fw-bold text-primary mb-3">Education</h5>

              {education.map((edu, index) => (
                <div key={index} className="border rounded p-3 mb-3 position-relative">
                  {education.length > 1 && (
                    <button
                      className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                      onClick={() => handleRemoveEducation(index)}
                    >
                      <i className="bi bi-x-lg" />
                    </button>
                  )}

                  <div className="mb-2">
                    <label className="form-label">Degree</label>
                    <input
                      type="text"
                      className="form-control"
                      value={edu.degree}
                      onChange={(e) => handleChange(index, 'degree', e.target.value)}
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Institution</label>
                    <input
                      type="text"
                      className="form-control"
                      value={edu.institution}
                      onChange={(e) => handleChange(index, 'institution', e.target.value)}
                    />
                  </div>

                  <div className="row g-2">
                    <div className="col-md-6">
                      <label className="form-label">Start Year</label>
                      <input
                        type="text"
                        className="form-control"
                        value={edu.startYear}
                        onChange={(e) => handleChange(index, 'startYear', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">End Year</label>
                      <input
                        type="text"
                        className="form-control"
                        value={edu.endYear}
                        onChange={(e) => handleChange(index, 'endYear', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button className="btn btn-outline-primary w-100 mb-3" onClick={handleAddEducation}>
                <i className="bi bi-plus-circle me-1"></i> Add Education
              </button>

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

          {/* === RIGHT PREVIEW PANEL === */}
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

export default EducationForm;
