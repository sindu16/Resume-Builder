// import React, { useState } from 'react';
// import TemplateSelector from './TemplateSelector';
// import ColorPaletteSelector from './ColorPaletteSelector';
// import ResumeRenderer from './ResumeRenderer';

// const ResumePreviewModal = ({ resume, onClose, onApply }) => {
//   const [tab, setTab] = useState('templates');
//   const [selectedTemplate, setSelectedTemplate] = useState('template1');
//   const [selectedPalette, setSelectedPalette] = useState({
//     id: 'blue',
//     themeColor: '#0d6efd',
//     textColor: '#ffffff',
//   });

//   const handleDone = () => {
//     onApply({ template: selectedTemplate, colors: selectedPalette });
//     onClose();
//   };

//   return (
//     <div className="modal-content p-4">
//       <h5>Change Theme</h5>
//       <div className="d-flex gap-4 mb-3">
//         <button className={`btn btn-outline-primary ${tab === 'templates' && 'active'}`} onClick={() => setTab('templates')}>Templates</button>
//         <button className={`btn btn-outline-primary ${tab === 'colors' && 'active'}`} onClick={() => setTab('colors')}>Color Palettes</button>
//       </div>

//       {tab === 'templates' && (
//         <TemplateSelector selectedTemplate={selectedTemplate} onChange={setSelectedTemplate} />
//       )}

//       {tab === 'colors' && (
//         <ColorPaletteSelector selectedPalette={selectedPalette} onChange={setSelectedPalette} />
//       )}

//       <div className="preview-box mt-4">
//         <ResumeRenderer
//           resume={resume}
//           themeColor={selectedPalette.themeColor}
//           textColor={selectedPalette.textColor}
//           selectedTemplate={selectedTemplate}
//         />
//       </div>

//       <div className="d-flex justify-content-end mt-3">
//         <button className="btn btn-secondary me-2" onClick={onClose}>Cancel</button>
//         <button className="btn btn-primary" onClick={handleDone}>Done</button>
//       </div>
//     </div>
//   );
// };

// export default ResumePreviewModal;

import React, { useState } from 'react';
import TemplateSelector from './TemplateSelector';
import ColorPaletteSelector from './ColorPaletteSelector';
import ResumeRenderer from './ResumeRenderer';

const ResumePreviewModal = ({ resume, onClose, onApply }) => {
  const [tab, setTab] = useState('templates');
  const [selectedTemplate, setSelectedTemplate] = useState(resume?.template || 'template1');
  const [selectedPalette, setSelectedPalette] = useState({
    id: 'blue',
    themeColor: resume?.themeColor || '#0d6efd',
    textColor: resume?.textColor || '#ffffff',
  });

  const handleDone = () => {
    onApply({ template: selectedTemplate, ...selectedPalette });
    onClose();
  };

  return (
    <div className="modal-content p-4" style={{ maxWidth: '1200px', width: '100%' }}>
      <h5 className="mb-3 fw-bold">Change Theme</h5>

      <div className="d-flex gap-3 mb-3">
        <button
          className={`btn btn-outline-primary ${tab === 'templates' && 'active'}`}
          onClick={() => setTab('templates')}
        >
          Templates
        </button>
        <button
          className={`btn btn-outline-primary ${tab === 'colors' && 'active'}`}
          onClick={() => setTab('colors')}
        >
          Color Palettes
        </button>
      </div>

      <div className="row">
        <div className="col-md-4">
          {tab === 'templates' && (
            <TemplateSelector selectedTemplate={selectedTemplate} onChange={setSelectedTemplate} />
          )}
          {tab === 'colors' && (
            <ColorPaletteSelector selectedPalette={selectedPalette} onChange={setSelectedPalette} />
          )}
        </div>

        <div className="col-md-8">
          <ResumeRenderer
            resume={resume}
            selectedTemplate={selectedTemplate}
            themeColor={selectedPalette.themeColor}
            textColor={selectedPalette.textColor}
          />
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-secondary me-2" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleDone}>Done</button>
      </div>
    </div>
  );
};

export default ResumePreviewModal;
