// import React from 'react';
// import templateThumb1 from '../assets/temp1.png';
// import templateThumb2 from '../assets/temp2.png';
// import templateThumb3 from '../assets/temp3.png';
// import './TemplateSelector.css'; 

// const templates = [
//   { id: 'template1', name: 'Professional Sidebar', },
//   { id: 'template2', name: 'Clean Modern',  },
//   { id: 'template3', name: 'Creative Header', },
// ];

// const TemplateSelector = ({ selectedTemplate, onChange }) => {
//   return (
//     <div className="space-y-3">
//       <h4 className="font-semibold text-gray-800">Choose Template</h4>

//       <div className="d-flex gap-3 overflow-auto px-2">
//         {templates.map((template) => (
//           <div
//             key={template.id}
//             className={`template-thumb border rounded shadow-sm p-2 ${
//               selectedTemplate === template.id ? 'border-primary' : 'border-light'
//             }`}
//             onClick={() => onChange(template.id)}
//             style={{ cursor: 'pointer', minWidth: 180 }}
//           >
//             <img
//               src={template.image}
//               alt={template.name}
//               style={{ width: '100%', borderRadius: 6 }}
//             />
//             <p className="text-center small mt-2 mb-0">{template.name}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TemplateSelector;
