import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateResumeField, updateResumeRequest } from '../resumeEditorSlice';
import ResumePreview from '../ResumePreview';
import HeaderBar from '../HeaderBar';
import { toast } from 'react-toastify';

const WorkExperienceForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resume } = useSelector((state) => state.resumeEditor);
  const token = useSelector((state) => state.login.token);
 const experiences = useMemo(() => resume.experience || [], [resume.experience]);
  const [themeColor, setThemeColor] = useState(resume.themeColor || '');
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    if (!experiences.length) {
      const newEntry = {
        company: '',
        role: '',
        startYear: '',
        endYear: '',
        description: '',
      };
      dispatch(updateResumeField({ field: 'experience', value: [newEntry] }));
    }
  }, [experiences,dispatch]);

  const handleChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    dispatch(updateResumeField({ field: 'experience', value: updated }));
  };

  const handleAddExperience = () => {
    const newEntry = {
      company: '',
      role: '',
      startYear: '',
      endYear: '',
      description: '',
    };
    dispatch(updateResumeField({ field: 'experience', value: [...experiences, newEntry] }));
  };

  const handleRemoveExperience = (indexToRemove) => {
    const updated = experiences.filter((_, i) => i !== indexToRemove);
    dispatch(updateResumeField({ field: 'experience', value: updated }));
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
      toast.error('Missing Resume ID');
      return;
    }
    navigate(`/educationform/${resume._id}/edit`);
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
          {/* Left: Form Panel */}
          <div className="col-lg-6 mb-4">
            <div className="bg-white p-4 rounded shadow-sm d-flex flex-column justify-content-between">
              <div>
                <h5 className="fw-bold text-primary mb-3">Work Experience</h5>

                {experiences.map((exp, index) => (
                  <div key={index} className="border rounded p-3 mb-3 position-relative">
                    {experiences.length > 1 && (
                      <button
                        className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                        onClick={() => handleRemoveExperience(index)}
                      >
                        <i className="bi bi-x"></i>
                      </button>
                    )}

                    <div className="mb-2">
                      <label className="form-label">Company</label>
                      <input
                        type="text"
                        className="form-control"
                        value={exp.company}
                        onChange={(e) => handleChange(index, 'company', e.target.value)}
                      />
                    </div>

                    <div className="mb-2">
                      <label className="form-label">Role</label>
                      <input
                        type="text"
                        className="form-control"
                        value={exp.role}
                        onChange={(e) => handleChange(index, 'role', e.target.value)}
                      />
                    </div>

                    <div className="row g-2">
                      <div className="col-md-6">
                        <label className="form-label">Start Year</label>
                        <input
                          type="text"
                          className="form-control"
                          value={exp.startYear}
                          onChange={(e) => handleChange(index, 'startYear', e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">End Year</label>
                        <input
                          type="text"
                          className="form-control"
                          value={exp.endYear}
                          onChange={(e) => handleChange(index, 'endYear', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mt-2">
                      <label className="form-label">Description</label>
                      <textarea
                        rows={3}
                        className="form-control"
                        value={exp.description}
                        onChange={(e) => handleChange(index, 'description', e.target.value)}
                      />
                    </div>
                  </div>
                ))}

                <button className="btn btn-outline-primary w-100" onClick={handleAddExperience}>
                  <i className="bi bi-plus-circle me-1"></i> Add Work Experience
                </button>
              </div>

              {/* Action Buttons */}
              <div className="d-flex justify-content-between align-items-center mt-4 pt-3">
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

          {/* Right: Preview Panel */}
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

export default WorkExperienceForm;
