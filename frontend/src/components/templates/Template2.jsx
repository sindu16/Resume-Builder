import React from 'react';
const Template2 = ({ resume, themeColor, textColor }) => {
  const personal = resume.personal || {};
  const {
    fullName,
    designation,
    summary,
    phone,
    email,
    location,
    linkedin,
    github,
    website,
  } = personal;

  const education = resume.education || [];
  const experience = resume.experience || [];
  const projects = resume.projects || [];
  const skills = resume.skills || [];

  return (
    <div className="bg-white w-100 h-100 p-3 g-0">
      {/* Header */}
      <div className="text-center mb-2 pb-3" style={{ borderColor: themeColor, borderBottomWidth: '2px' }}>
        <h1 className="h2 fw-bold text-dark mb-2">{fullName || 'Your Name'}</h1>
        <h2 className="h5  mb-3">{designation || 'Your Title'}</h2>
        <div className="d-flex justify-content-center gap-2 small  flex-wrap">
          {phone && <span>📞 {phone}</span>}
          {email && <span>✉️ {email}</span>}
          {location && <span>📍 {location}</span>}
        </div>
        <div className="d-flex justify-content-center gap-2 small  flex-wrap mt-2">
          {linkedin && <span>💼 {linkedin}</span>}
          {github && <span>🔗 {github}</span>}
          {website && <span>🌐 {website}</span>}
        </div>
      </div>

      <div className="row gx-3">
        {/* Left Column */}
        <div>
          {/* Summary */}
          <div className="mb-3">
            <h5 className="fw-bold border-bottom pb-1">PROFESSIONAL SUMMARY</h5>
            <p  style={{ textAlign: 'justify' }}>{summary || 'Your summary goes here...'}</p>
          </div>

          {/* Experience */}
          <div className="mb-2">
            <h5 className="fw-bold border-bottom pb-1">WORK EXPERIENCE</h5>
            {experience.length > 0 ? (
              <div className="d-flex flex-column gap-2">
                {experience.map((exp, i) => (
                  <div key={i}>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h6 className="fw-semibold text-dark mb-0">{exp.role}</h6>
                      <span className="text-muted small">{exp.startYear} - {exp.endYear}</span>
                    </div>
                    <p className="text-muted fw-medium mb-1">{exp.company}</p>
                    <p  style={{ textAlign: 'justify' }}>{exp.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">No work experience added yet.</p>
            )}
          </div>

          {/* Projects */}
          {projects.length > 0 && (
            <div className="mb-4">
              <h5 className="fw-bold border-bottom pb-2">PROJECTS</h5>
              <div className="d-flex flex-column gap-2">
                {projects.map((project, i) => (
                  <div key={i}>
                    {project.title && <h6 className="fw-semibold text-dark">{project.title}</h6>}
                    {project.description && <p className=" mb-2" style={{ textAlign: 'justify' }}>{project.description}</p>}
                    <div className="d-flex gap-4 small  flex-wrap">
                      {project.github && <span><strong>GitHub:</strong> {project.github}</span>}
                      {project.demo && <span><strong>Demo:</strong> {project.demo}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        
          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-4">
              <h5 className="fw-bold border-bottom pb-2 mt-2">SKILLS</h5>
              <div className="d-flex flex-column gap-1">
                {skills.map((skill, i) => (
                  <div key={i}>
                    <div className="d-flex justify-content-between mb-1">
                      <span className="small fw-medium">{skill.name}</span>
                    </div>
                    
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h5 className="fw-bold border-bottom pb-2 mt-1">EDUCATION</h5>
              <div className="d-flex flex-column gap-2 mt-2">
                {education.map((edu, i) => (
                  <div key={i} className="small">
                    <div className="fw-semibold text-dark">{edu.degree}</div>
                    <div >{edu.institution}</div>
                    <div>{edu.startYear} - {edu.endYear}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

  );
};

export default Template2;
