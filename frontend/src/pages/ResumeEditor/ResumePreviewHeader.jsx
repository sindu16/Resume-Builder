import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchResumeRequest } from '../ResumeEditor/resumeEditorSlice';
import ResumePreview from '../ResumeEditor/ResumePreview';
import HeaderBar from './HeaderBar';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ResumePreviewHeader = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const token = useSelector((state) => state.login.token);
  const resume = useSelector((state) => state.resumeEditor.resume);
  const [themeColor, setThemeColor] = useState('#0d6efd');
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const resumeRef = useRef(null);

  useEffect(() => {
    if (id && token) {
      dispatch(fetchResumeRequest({ id, token }));
    }
  }, [id, token, dispatch]);

  useEffect(() => {
    if (resume) {
      setThemeColor(resume.themeColor || '#0d6efd');
      setSelectedTemplate(resume.template || 'template1');
    }
  }, [resume]);

  const handleDownload = async () => {
    const input = resumeRef.current;
    const canvas = await html2canvas(input, {
      scale: 4,
      useCORS: true,
      backgroundColor: '#ffffff',
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'a4');
    pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    pdf.save('resume.pdf');
  };

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const templates = [
    { id: 'template1', name: 'Template 1' },
    { id: 'template2', name: 'Template 2' },
    { id: 'template3', name: 'Template 3' },
  ];

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
          {/* Left column - Templates */}
          <div className="col-md-4 col-lg-3">
            <h5 className="fw-bold mb-4">Choose Your Resume Template</h5>
           
            <div className="d-flex flex-column gap-3">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  style={{
                    border: selectedTemplate === template.id ? `3px solid ${themeColor}` : '2px solid #ccc',
                    borderRadius: '10px',
                    padding: '15px',
                    width: '60%',
                    height: '350px',
                    backgroundColor: '#fff',
                    boxShadow: '0 0 10px rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      transform: 'scale(0.28)',
                      transformOrigin: 'top left',
                      width: '800px', // A4 width
                      height: '1190px', // A4 height
                      pointerEvents: 'none',
                    }}
                  >
                    <ResumePreview
                      resume={resume}
                      themeColor={themeColor}
                      textColor={resume?.textColor || '#ffffff'}
                      selectedTemplate={template.id}
                    />
                  </div>
                  <small className="d-block mt-2 fw-semibold">{template.name}</small>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Resume Preview */}
          <div className="col-md-8 col-lg-9">
            <div className="text-end mb-3">
              <button
                onClick={handleDownload}
                className="btn btn-success rounded-pill fw-semibold"
              >
                <i className="bi bi-download me-1"></i> Download PDF
              </button>
            </div>

            <div
              ref={resumeRef}
              style={{
                width: '800px',
                minHeight: '1190px',
                backgroundColor: '#fff',
                margin: '0 auto',
                padding: '20px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              }}
            >
              <ResumePreview
                resume={resume}
                themeColor={themeColor}
                textColor={resume?.textColor || '#ffffff'}
                selectedTemplate={selectedTemplate}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumePreviewHeader;
