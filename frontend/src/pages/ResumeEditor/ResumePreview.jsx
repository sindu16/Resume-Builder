
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResumeRequest } from '../ResumeEditor/resumeEditorSlice';
import { useParams } from 'react-router-dom';
import templateMap from '../../components/templates/TemplateIndex';

const ResumePreview = ({
  resume: propResume,
  themeColor: propThemeColor,
  textColor: propTextColor,
  selectedTemplate: propTemplate
}) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const reduxResume = useSelector((state) => state.resumeEditor.resume);
  const loading = useSelector((state) => state.resumeEditor.loading);
  const token = useSelector((state) => state.login.token);

  
  const resume = propResume || reduxResume;

 const selectedTemplateKey = propTemplate || resume?.template || 'template1';
const SelectedTemplate = templateMap[selectedTemplateKey] || templateMap['template1'];


  const themeColor = propThemeColor || resume?.themeColor || '#0d6efd';
  const textColor = propTextColor || resume?.textColor || '#ffffff';

 
  useEffect(() => {
    if (!propResume && id && token) {
      dispatch(fetchResumeRequest({ id, token }));
    }
  }, [id, token, propResume, dispatch]);

  if (loading || !resume || Object.keys(resume).length === 0) {
    return <div className="p-5 text-center">Loading resume preview...</div>;
  }

  return (
    <SelectedTemplate
      resume={resume}
      themeColor={themeColor}
      textColor={textColor}
    />
  );
};

export default ResumePreview;
