
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  fetchResumeRequest,
  updateResumeRequest,
  updateResumeField,
} from './resumeEditorSlice';
import PersonalInfo from './sections/PersonalInfo';
import ResumePreview from './ResumePreview';
import HeaderBar from './HeaderBar';
import { toast } from 'react-toastify';
// import { SketchPicker } from 'react-color';

const ResumeEditor = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { resume } = useSelector((state) => state.resumeEditor);
  const token = useSelector((state) => state.login.token);

  const [themeColor, setThemeColor] = useState('#0d6efd');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const [selectedTemplate, setSelectedTemplate] = useState('template1');

  useEffect(() => {
    if (id) {
      dispatch(fetchResumeRequest(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (resume?.themeColor) {
      setThemeColor(resume.themeColor);
    }
    if (resume?.template) {
      setSelectedTemplate(resume.template);
    }
  }, [resume]);

  const handleSave = () => {
    if (id) {
      dispatch(updateResumeRequest({
        id,
        data: {
          ...resume,
          themeColor,
          template: selectedTemplate,
        },
        token
      }));
      toast.success('Resume saved successfully!', {
        position: 'top-right',
        autoClose: 1000,
      });
    }
  };

  const handleThemeColorChange = (color) => {
    setThemeColor(color.hex);
    dispatch(updateResumeField({ field: 'themeColor', value: color.hex }));
  };

  // const handleTemplateChange = (e) => {
  //   const template = e.target.value;
  //   setSelectedTemplate(template);
  //   dispatch(updateResumeField({ field: 'template', value: template }));
  // };

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-vh-100 bg-light bg-gradient">
      <div className="container-fluid py-4 px-3 px-md-5">
        <HeaderBar
          resume={resume}
          themeColor={themeColor}
          setThemeColor={handleThemeColorChange}
          showColorPicker={showColorPicker}
          setShowColorPicker={setShowColorPicker}
        />

        {/* <div className="row mb-3">
          <div className="col-md-6 mb-2">
            <label className="form-label fw-bold">Choose Template:</label>
            <select
              className="form-select"
              value={selectedTemplate}
              onChange={handleTemplateChange}
            >
              <option value="template1">Template 1</option>
              <option value="template2">Template 2</option>
              <option value="template3">Template 3</option> */}
              {/* Add more templates here */}
            {/* </select>
          </div> */}

          {/* <div className="col-md-6 mb-2">
            <label className="form-label fw-bold">Theme Color:</label>
            <div className="d-flex align-items-center gap-3">
              <div
                onClick={() => setShowColorPicker(!showColorPicker)}
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: themeColor,
                  cursor: 'pointer',
                  border: '1px solid #ccc',
                }}
              />
              {showColorPicker && (
                <div style={{ position: 'absolute', zIndex: 10 }}>
                  <SketchPicker
                    color={themeColor}
                    onChange={handleThemeColorChange}
                  />
                </div>
              )}
            </div>
          </div> */}
        {/* </div> */}

        <div className="row">
          <div className="col-lg-6">
            <PersonalInfo
              resume={resume}
              resumeId={id}
              token={token}
              themeColor={themeColor}
              onBack={handleBackClick}
              onSave={handleSave}
            />
          </div>
          <div className="col-lg-6">
            <div className="sticky-top" style={{ top: '100px' }}>
              <ResumePreview
                resume={{ ...resume, template: selectedTemplate }}
                themeColor={themeColor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;
