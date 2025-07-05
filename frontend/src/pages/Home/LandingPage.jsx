import { useEffect, useState } from 'react';
import resumeBanner from '../../assets/resumeimg.jpg';
import AuthModel from '../../components/AuthModel';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { token } = useSelector((state) => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  return (
    <div className="bg-light min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-light bg-white shadow-sm px-4">
        <span className="navbar-brand fw-bold fs-4">Resume Builder</span>
        <button className="btn btn-dark" onClick={() => setShowAuthModal(true)}>
          Login / Sign Up
        </button>
      </nav>

      {/* Hero Section */}
      <section className="container text-center text-md-start py-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <h1 className="display-4 fw-bold">
              Build Your <span className="text-primary">Resume</span> <span className="text-primary">Effortlessly</span>
            </h1>
            <p className="lead mt-3">
              Create a standout resume in minutes with our smart and intuitive resume builder.
            </p>
            <button className="btn btn-dark btn-lg mt-3" onClick={() => setShowAuthModal(true)}>Get Started</button>
          </div>
          <div className="col-md-6 text-center">
            <img
              src={resumeBanner}
              alt="Resume Preview"
              className="img-fluid rounded shadow"
              style={{ maxHeight: '400px' }}
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-5">
        <div className="container text-center">
          <h3 className="fw-bold mb-5">Features That Make It Easy</h3>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm h-100">
                <h5 className="fw-bold">Instant Preview</h5>
                <p className="text-muted">See your resume update as you type. No extra clicks needed.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm h-100">
                <h5 className="fw-bold">Simple to Use</h5>
                <p className="text-muted">Just fill in the blanks. We handle the formatting for you.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm h-100">
                <h5 className="fw-bold">Quick Download</h5>
                <p className="text-muted">Download your resume as a PDF in one click — ready to send.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      {showAuthModal && <AuthModel onClose={() => setShowAuthModal(false)} />}
    </div>
  );
}; 

export default LandingPage;
