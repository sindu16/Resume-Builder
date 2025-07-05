import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateResumeField, updateResumeRequest } from '../resumeEditorSlice';
import ResumePreview from '../ResumePreview';
import HeaderBar from '../HeaderBar';
import { toast } from 'react-toastify';

const SkillsForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { resume } = useSelector((state) => state.resumeEditor);
  const token = useSelector((state) => state.login.token);

  const [themeColor, setThemeColor] = useState(resume.themeColor || '');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const defaultSkill = { name: '', proficiency: 0 };

  const [skills, setSkills] = useState(
    resume.skills?.length ? resume.skills : [defaultSkill]
  );

  useEffect(() => {
    dispatch(updateResumeField({ field: 'skills', value: skills }));
  }, [skills, dispatch]);

  const handleSkillChange = (index, field, value) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], [field]: value };
    setSkills(updated);
  };

  const handleAddSkill = () => {
    setSkills([...skills, { name: '', proficiency: 0 }]);
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleBack = () => {
    navigate(-1);
  };

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
    navigate(`/projectform/${resume._id}/edit`);
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
            <div className="bg-white p-4 rounded shadow-sm">
              <h5 className="fw-bold text-primary mb-3">Skills</h5>

              {skills.map((skill, index) => (
                <div key={index} className="border rounded p-3 mb-3 position-relative">
                  {skills.length > 1 && (
                    <button
                      className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                      onClick={() => handleRemoveSkill(index)}
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  )}

                  <div className="row align-items-center mb-2">
                    <div className="col-6">
                      <label className="form-label">Skill Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={skill.name}
                        onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label">Proficiency (0–5)</label>
                      <input
                        type="number"
                        className="form-control"
                        min={0}
                        max={5}
                        value={skill.proficiency}
                        onChange={(e) =>
                          handleSkillChange(index, 'proficiency', parseInt(e.target.value, 10))
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button className="btn btn-outline-primary w-100 mb-4" onClick={handleAddSkill}>
                <i className="bi bi-plus-circle me-1"></i> Add Skill
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

          {/* === RIGHT: Live Preview === */}
          <div className="col-lg-6">
            <div className="sticky-top" style={{ top: '100px' }}>
              <ResumePreview resume={{ ...resume, skills }} themeColor={themeColor} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillsForm;
