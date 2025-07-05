import React from 'react';

const Template3 = ({ resume, themeColor = '#343a40', textColor = '#ffffff' }) => {
  const {
    personal = {},
    education = [],
    experience = [],
    projects = [],
    skills = [],
    personal: {
      summary,
      linkedin,
      github,
      website,
      languages = [],
      interests = [],
    } = {},
  } = resume;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: themeColor,
          color: textColor,
          padding: '1.5rem',
          textAlign: 'center',
        }}
      >
        <h1 style={{ marginBottom: '0' }}>{personal.fullName}</h1>
        <p style={{ marginBottom: '5px' }}>{personal.designation}</p>
        <small>
          {personal.email} | {personal.phone} | {personal.location}
        </small>
        <div style={{ marginTop: '0.5rem', fontSize: '13px' }}>
          {linkedin && <span style={{ marginRight: 10 }}>💼 {linkedin}</span>}
          {github && <span style={{ marginRight: 10 }}>🔗 {github}</span>}
          {website && <span>🌐 {website}</span>}
        </div>
      </div>

      <div className="container p-4">
        {/* Summary */}
        {summary && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ color: themeColor }}>Professional Summary</h5>
            <p style={{ textAlign: 'justify' }}>{summary}</p>
          </section>
        )}

        {/* Skills */}
    
        {skills.length > 0 && (
  <section className="mb-4">
    <h5 style={{ color: themeColor }}>Skills</h5>
    <ul className="list-inline">
      {skills.map((skill, i) => (
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
          {skill.name}
        </li>
      ))}
    </ul>
  </section>
)}


        {/* Experience */}
        {experience.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ color: themeColor }}>Experience</h5>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '1rem' }}>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <h6 style={{ marginBottom: 0 }}>{exp.role} - {exp.company}</h6>
                  <small className="text-muted">{exp.startYear} to {exp.endYear}</small>
                </div>
                <p style={{ textAlign: 'justify' }}>{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ color: themeColor }}>Projects</h5>
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '1rem' }}>
                <strong>{proj.title}</strong>
                <p style={{ marginTop: '0.5rem', textAlign: 'justify' }}>{proj.description}</p>
                {proj.github && (
                  <a href={proj.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                )}
                {proj.demo && (
                  <span>
                    {' '}|{' '}
                    <a href={proj.demo} target="_blank" rel="noreferrer">
                      Demo
                    </a>
                  </span>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ color: themeColor }}>Education</h5>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '0.75rem' }}>
                <strong>{edu.degree}</strong> – {edu.institution}
                <div className="text-muted">{edu.startYear} to {edu.endYear}</div>
              </div>
            ))}
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ color: themeColor }}>Languages</h5>
            <ul style={{ listStyle: 'none', paddingLeft: 0, marginBottom: 0 }}>
              {languages.map((lang, i) => (
                <li key={i}>{lang.name} </li>
              ))}
            </ul>
          </section>
        )}

        {/* Interests */}
        {interests.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ color: themeColor }}>Interests</h5>
            <ul className="list-inline">
              {interests.map((interest, i) => (
                <li key={i} className="list-inline-item">{interest}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default Template3;




