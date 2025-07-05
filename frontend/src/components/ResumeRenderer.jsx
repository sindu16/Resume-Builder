// import React from 'react';
// import templateMap from './templates/TemplateIndex';

// const ResumeRenderer = ({ resume, themeColor, textColor, selectedTemplate }) => {
//   const SelectedTemplate = templateMap[selectedTemplate] || templateMap['template1'];

//   if (!SelectedTemplate) {
//     return <div>Error: Template not found!</div>;
//   }

//   return (
//     <SelectedTemplate
//       resume={resume}
//       themeColor={themeColor}
//       textColor={textColor}
//     />
//   );
// };

// export default ResumeRenderer;


import Template1 from './templates/Template1';
import Template2 from './templates/Template2';
import Template3 from './templates/Template3';

const ResumeRenderer = ({ resume, themeColor, textColor, selectedTemplate }) => {
  const templates = {
    template1: Template1,
    template2: Template2,
    template3: Template3,
  };

  const SelectedTemplate = templates[selectedTemplate] || Template1;

  return (
    <div className="border p-3 bg-white shadow rounded" style={{ minHeight: '600px' }}>
      <SelectedTemplate resume={resume} themeColor={themeColor} textColor={textColor} />
    </div>
  );
};

export default ResumeRenderer;
