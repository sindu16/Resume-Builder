import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateResumeField, updateResumeRequest } from '../resumeEditorSlice';
import HeaderBar from '../HeaderBar';
import ResumePreview from '../ResumePreview';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdditionalInfoForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resume } = useSelector((state) => state.resumeEditor);
  const token = useSelector((state) => state.login.token);

  const [themeColor, setThemeColor] = useState(resume.themeColor || '');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const defaultLanguage = { name: '', proficiency: 0 };

  const [languages, setLanguages] = useState(
    resume.personal?.languages?.length ? resume.personal.languages : [defaultLanguage]
  );

  const [interests, setInterests] = useState(
    resume.personal?.interests?.length ? resume.personal.interests : ['']
  );

  useEffect(() => {
    dispatch(updateResumeField({ section: 'personal', field: 'languages', value: languages }));
    dispatch(updateResumeField({ section: 'personal', field: 'interests', value: interests }));
  }, [languages, interests, dispatch]);

  const handleLanguageChange = (index, field, value) => {
    const updated = [...languages];
    updated[index] = { ...updated[index], [field]: value };
    setLanguages(updated);
  };

  const handleAddLanguage = () => {
    setLanguages([...languages, { name: '', proficiency: 0 }]);
  };

  const handleRemoveLanguage = (index) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const handleInterestChange = (index, value) => {
    const updated = [...interests];
    updated[index] = value;
    setInterests(updated);
  };

  const handleAddInterest = () => {
    setInterests([...interests, '']);
  };

  const handleRemoveInterest = (index) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (resume._id) {
      dispatch(updateResumeRequest({ id: resume._id, data: resume, token }));
      toast.success('Resume saved successfully!');
    }
  };


const handlePreviewClick = () => {
  if (resume?._id) {
    navigate(`/resumepreviewHeader/${resume._id}/edit`);
  } else {
    console.warn('Resume ID is undefined, cannot navigate to preview.');
  }
};  


  const handleBack = () => navigate(-1);

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
              <h5 className="fw-bold text-primary mb-3">Additional Info</h5>

              {/* Languages Section */}
              <h6 className="fw-semibold">Languages</h6>
              {languages.map((lang, index) => (
                <div key={index} className="border rounded p-3 mb-3 position-relative">
                  {languages.length > 1 && (
                    <button
                      className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                      onClick={() => handleRemoveLanguage(index)}
                    >
                      <i className="bi bi-x" />
                    </button>
                  )}
                  <div className="mb-2">
                    <label className="form-label">Language Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={lang.name}
                      onChange={(e) => handleLanguageChange(index, 'name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label">Proficiency (0–5)</label>
                    <input
                      type="number"
                      className="form-control"
                      min={0}
                      max={5}
                      value={lang.proficiency}
                      onChange={(e) =>
                        handleLanguageChange(index, 'proficiency', parseInt(e.target.value, 10))
                      }
                    />
                  </div>
                </div>
              ))}

              <button className="btn btn-outline-primary w-100 mb-4" onClick={handleAddLanguage}>
                <i className="bi bi-plus-circle me-1" /> Add Language
              </button>

              {/* Interests Section */}
              <h6 className="fw-semibold">Interests</h6>
              {interests.map((interest, index) => (
                <div key={index} className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    value={interest}
                    onChange={(e) => handleInterestChange(index, e.target.value)}
                  />
                  {interests.length > 1 && (
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleRemoveInterest(index)}
                    >
                      <i className="bi bi-x" />
                    </button>
                  )}
                </div>
              ))}

              <button className="btn btn-outline-primary w-100" onClick={handleAddInterest}>
                <i className="bi bi-plus-circle me-1" /> Add Interest
              </button>

              {/* === ACTION BUTTONS === */}
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
                  <button className="btn btn-outline-dark px-4 rounded-pill fw-semibold" onClick={handlePreviewClick}>
                    <i className="bi bi-eye me-1"></i> Preview
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* === RIGHT PREVIEW PANEL === */}
          <div className="col-lg-6">
            <div className="sticky-top" style={{ top: '100px' }}>
              <ResumePreview
                resume={{ ...resume, personal: { ...resume.personal, languages, interests } }}
                themeColor={themeColor}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditionalInfoForm;
