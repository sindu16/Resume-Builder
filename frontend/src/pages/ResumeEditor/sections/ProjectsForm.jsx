import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateResumeField, updateResumeRequest } from '../resumeEditorSlice';
import ResumePreview from '../ResumePreview';
import HeaderBar from '../HeaderBar';
import { toast } from 'react-toastify';

const ProjectForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resume } = useSelector((state) => state.resumeEditor);
  const token = useSelector((state) => state.login.token);

  const [themeColor, setThemeColor] = useState(resume.themeColor || '');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const defaultProject = {
    title: '',
    description: '',
    github: '',
    demo: ''
  };

  const [projects, setProjects] = useState(resume.projects?.length ? resume.projects : [defaultProject]);


  useEffect(() => {
    dispatch(updateResumeField({ field: 'projects', value: projects }));
  }, [projects, dispatch]);

  const handleChange = (index, field, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  const handleAddProject = () => {
    setProjects([...projects, { ...defaultProject }]);
  };

  const handleRemoveProject = (indexToRemove) => {
    setProjects(projects.filter((_, index) => index !== indexToRemove));
  };

  const handleBack = () => navigate(-1);

  const handleSave = () => {
    if (resume._id) {
      dispatch(updateResumeRequest({ id: resume._id, data: { ...resume, projects }, token }));
      toast.success('Projects saved successfully!');
    }
  };

  const handleNext = () => {
    if (!resume._id) {
      toast.error("Missing Resume ID");
      return;
    }
    navigate(`/additionalinfo/${resume._id}/edit`);
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
              <h5 className="fw-bold text-primary mb-3">Projects</h5>

              {projects.map((project, index) => (
                <div key={index} className="border rounded p-3 mb-3 position-relative">
                  {projects.length > 1 && (
                    <button
                      className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                      onClick={() => handleRemoveProject(index)}
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  )}

                  <div className="mb-2">
                    <label className="form-label">Project Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={project.title}
                      onChange={(e) => handleChange(index, 'title', e.target.value)}
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Description</label>
                    <textarea
                      rows={2}
                      className="form-control"
                      value={project.description}
                      onChange={(e) => handleChange(index, 'description', e.target.value)}
                    ></textarea>
                  </div>

                  <div className="mb-2">
                    <label className="form-label">GitHub Link</label>
                    <input
                      type="url"
                      className="form-control"
                      value={project.github}
                      onChange={(e) => handleChange(index, 'github', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="form-label">Live Demo URL</label>
                    <input
                      type="url"
                      className="form-control"
                      value={project.demo}
                      onChange={(e) => handleChange(index, 'demo', e.target.value)}
                    />
                  </div>
                </div>
              ))}

              <button className="btn btn-outline-primary w-100 mb-4" onClick={handleAddProject}>
                <i className="bi bi-plus-circle me-1"></i> Add Project
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

          {/* === RIGHT: Preview === */}
          <div className="col-lg-6">
            <div className="sticky-top" style={{ top: '100px' }}>
              <ResumePreview resume={{ ...resume, projects }} themeColor={themeColor} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectForm;
