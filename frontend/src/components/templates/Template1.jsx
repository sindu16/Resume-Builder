import React from 'react';

const Template1 = ({ resume, themeColor, textColor }) => {
  const personal = resume.personal || {};
  const {
    profileImage,
    fullName,
    designation,
    summary,
    phone,
    email,
    address,
    location,
    linkedin,
    github,
    website,
    languages = [],
    interests = [],
  } = personal;

  const education = resume.education || [];
  const experience = resume.experience || [];
  const projects = resume.projects || [];
  const skills = resume.skills || [];

  const sidebarStyle = {
    backgroundColor: themeColor,
    color: textColor,
    minHeight: '100vh',
  };

  const iconStyle = { color: textColor };
  const textStyle = { color: textColor };

  return (
    <div className="row g-0">
      {/* === LEFT SIDEBAR === */}
      <div className="col-md-4 p-4" style={sidebarStyle}>
        <div className="text-center mb-4">
          <img
            src={profileImage || '/default-avatar.png'}
            alt="Profile"
            className="rounded-circle mb-3"
            style={{ width: 100, height: 100, objectFit: 'cover' }}
            onError={(e) => (e.target.src = '/default-avatar.png')}
          />
          <h5 className="mb-0" style={textStyle}>{fullName || 'Your Name'}</h5>
          <small style={textStyle}>{designation || 'Your Title'}</small>
        </div>

        <hr style={{ borderColor: textColor }} />

        {/* Contact */}
        <h6 className="text-uppercase fw-bold" style={textStyle}>Contact</h6>
        <ul className="list-unstyled small" style={textStyle}>
          {phone && <li className="mb-2"><i className="bi bi-telephone me-2" style={iconStyle} />{phone}</li>}
          {email && <li className="mb-2"><i className="bi bi-envelope me-2" style={iconStyle} />{email}</li>}
          {address && <li className="mb-2"><i className="bi bi-house me-2" style={iconStyle} />{address}</li>}
          {location && <li className="mb-2"><i className="bi bi-geo me-2" style={iconStyle} />{location}</li>}
          {linkedin && <li className="mb-2"><i className="bi bi-linkedin me-2" style={iconStyle} />{linkedin}</li>}
          {github && <li className="mb-2"><i className="bi bi-github me-2" style={iconStyle} />{github}</li>}
          {website && <li className="mb-2"><i className="bi bi-globe me-2" style={iconStyle} />{website}</li>}
        </ul>

        {/* Skills */}
        {skills.length > 0 && (
          <>
            <h6 className="text-uppercase fw-bold mt-4" style={textStyle}>Skills</h6>
            <ul className="list-unstyled small" style={textStyle}>
              {skills.map((skill, i) => (
                <li key={i} className="d-flex justify-content-between mb-2">
                  <span>{skill.name}</span>
                  <span style={textStyle}>{'★'.repeat(skill.proficiency)}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <>
            <h6 className="text-uppercase fw-bold mt-4" style={textStyle}>Languages</h6>
            <ul className="list-unstyled small" style={textStyle}>
              {languages.map((lang, i) => (
                <li key={i} className="d-flex justify-content-between mb-2">
                  <span>{lang.name}</span>
                  <span style={textStyle}>{'★'.repeat(lang.proficiency || 0)}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Education */}
        {education.length > 0 && (
          <>
            <h6 className="text-uppercase fw-bold mt-4" style={textStyle}>Education</h6>
            <ul className="list-unstyled small" style={textStyle}>
              {education.map((edu, i) => (
                <li key={i} className="mt-2">
                  <strong>{edu.degree}</strong><br />
                  {edu.institution}<br />
                  {edu.startYear} - {edu.endYear}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* === RIGHT MAIN SECTION === */}
      <div className="col-md-8 bg-white p-4">
        {/* Summary */}
        <h5 className="fw-bold mb-3" style={{ color: themeColor }}>Professional Summary</h5>
        <p style={{ textAlign: 'justify' }}>{summary || 'Your summary goes here...'}</p>

        {/* Experience */}
        <h5 className="fw-bold mt-4 mb-3" style={{ color: themeColor }}>Work Experience</h5>
        {experience.length > 0 ? (
          experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <div className="d-flex justify-content-between">
                <h6 className="mb-2">{exp.role || 'Job Title'} at {exp.company || 'Company'}</h6>
                <small className="text-muted">{exp.startYear || 'Start'} - {exp.endYear || 'End'}</small>
              </div>
              <p className="mb-0" style={{ textAlign: 'justify' }}>{exp.description || 'Job responsibilities and achievements.'}</p>
            </div>
          ))
        ) : (
          <p>No work experience added yet.</p>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <>
            <h5 className="fw-bold mt-4 mb-3" style={{ color: themeColor }}>Projects</h5>
            {projects.map((project, i) => (
              <div key={i} className="mb-2">
                {project.title && <h6>{project.title}</h6>}
                {project.description && <p style={{ textAlign: 'justify' }}>{project.description}</p>}
                {project.github && (
                  <small className="d-block">
                    <strong>GitHub:</strong> {project.github}
                  </small>
                )}
                {project.demo && (
                  <small className="d-block">
                    <strong>Live Demo:</strong> {project.demo}
                  </small>
                )}
              </div>
            ))}
          </>
        )}

        {/* Interests */}
        {interests.length > 0 && (
          <>
            <h5 className="fw-bold mt-3 mb-2" style={{ color: themeColor }}>Interests</h5>
            <ul className="list-inline">
              {interests.map((int, i) => (
                <li
                  key={i}
                  className="list-inline-item me-1 mb-2"
                  style={{
                    backgroundColor: themeColor,
                    color: textColor,
                    padding: '5px 10px',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    display: 'inline-block'
                  }}
                >
                  {int}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Template1;
