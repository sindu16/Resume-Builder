import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/Home/LandingPage';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/login/LoginPage';
import Signup from './components/Signup/Signup'
import DashboardPage from './components/Dashboard/DashboardPage';
import ResumeEditor from './pages/ResumeEditor/ResumeEditor';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactInfo from './pages/ResumeEditor/sections/ContactInfo';
import WorkExperience from './pages/ResumeEditor/sections/WorkExperience';
import EducationForm from './pages/ResumeEditor/sections/EducationForm';
import SkillsForm from './pages/ResumeEditor/sections/SkillsForm';
import ProjectsForm from './pages/ResumeEditor/sections/ProjectsForm';
import AdditionalInfoForm from './pages/ResumeEditor/sections/AdditionalInfoForm';
import ResumePreview from './pages/ResumeEditor/ResumePreview';
import ResumePreviewHeader from './pages/ResumeEditor/ResumePreviewHeader';


function App() {
  return (
    <>
      <div>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/dashboard' element={<DashboardPage/>} />
            <Route path="/resume/:id/edit" element={<ResumeEditor />} />
            <Route path="/contact/:id/edit" element={<ContactInfo />} />
            <Route path="/experience/:id/edit" element={<WorkExperience />} />
            <Route path="/educationform/:id/edit" element={<EducationForm />} />
            <Route path="/skillsform/:id/edit" element={<SkillsForm />} />
            <Route path="/projectform/:id/edit" element={<ProjectsForm />} />
            <Route path="/additionalinfo/:id/edit" element={<AdditionalInfoForm />} />
            <Route path="/resumepreview/:id/edit" element={<ResumePreview/>} />
            <Route path="/resumepreviewHeader/:id/edit" element={<ResumePreviewHeader/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
