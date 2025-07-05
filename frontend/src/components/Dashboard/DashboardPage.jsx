import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResumesRequest, deleteResumeRequest } from '../Dashboard/dashboardSlice';
import { logoutSuccess } from '../login/loginSlice';
import { useNavigate } from 'react-router-dom';
import AddResumeModal from '../addresume/AddResumeModel';
import ResumeActionModal from '../ResumeActionModal';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resumes = [], loading } = useSelector((state) => state.dashboard);
  const { token, user } = useSelector((state) => state.login);
  const [showModal, setShowModal] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [profileImageData, setProfileImageData] = useState(null);
  const [selectedResume, setSelectedResume] = useState(null); 

  useEffect(() => {
    if (token) {
      dispatch(fetchResumesRequest(token));
    } else {
      navigate('/');
    }

    if (user && user.id && imageError) {
      fetch(`http://localhost:5000/api/users/profile-image-base64/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setProfileImageData(data.image);
        });
    }
  }, [dispatch, token, navigate, user, imageError]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logoutSuccess());
    navigate('/');
  };

  const getProfileImageUrl = () => {
    if (profileImageData) return profileImageData;
    if (!user || !user.id || imageError) return 'https://via.placeholder.com/40';
    return `http://localhost:5000/api/users/profile-image/${user.id}`;
  };

  const handleDelete = (resumeId) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      dispatch(deleteResumeRequest({ resumeId, token }));
      setSelectedResume(null);
    }
  };

  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Resume Builder</h3>
        <div className="d-flex flex-column align-items-end">
          {user && (
            <div className="d-flex flex-column align-items-center">
              <img
               src={getProfileImageUrl()}
                onError={() => setImageError(true)}
                alt="Profile"
                className="rounded-circle"
                width={40}
                height={40}
                style={{ objectFit: 'cover', border: '2px solid #ccc' }}
              />
              <small className="fw-bold mt-1">{user.fullName}</small>
            </div>
          )}
          <button onClick={handleLogout} className="btn btn-outline-dark btn-sm mt-2">
            Logout
          </button>
        </div>
      </div>

      {/* Resume Cards Row */}
      <div className="row g-4">

        {/* Add New Resume Card */}
        <div className="col-md-3">
          <div
            className="card h-100 text-center p-3 shadow-sm"
            onClick={() => setShowModal(true)}
            style={{ border: '2px dashed #6c63ff', cursor: 'pointer' }}
          >
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <div
                className="rounded-circle d-flex justify-content-center align-items-center"
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: '#e5e5ff',
                  color: '#6c63ff',
                  fontSize: '2rem',
                }}
              >
                +
              </div>
              <p className="mt-3 text-muted">Add New Resume</p>
            </div>
          </div>
        </div>

        {/* Resume Cards */}
        {Array.isArray(resumes) && resumes.map((resume) => {
          const personal = resume.personal || {};
          const profileImage = personal.profileImage || '/default-avatar.png';

          return (
            <div className="col-md-3" key={resume._id}>
              <div
                className="card shadow-sm h-100 border-0 text-center"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedResume(resume)}
              >
                <div className="card-body d-flex flex-column align-items-center">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="rounded-circle mb-3"
                    style={{ width: 70, height: 70, objectFit: 'cover', border: '2px solid #ccc' }}
                  />
                  <h6 className="fw-bold mb-1">{personal.fullName || 'Your Name'}</h6>
                  <small className="text-muted mb-2">{personal.designation || 'Your Role'}</small>
                  <small className="text-muted">
                    <i className="bi bi-geo-alt me-1"></i>{personal.address || 'Location'}
                  </small>
                  <hr className="w-100 my-3" />
                  <p className="text-muted small">
                    <i className="bi bi-clock me-1"></i>
                    Last Updated: {new Date(resume.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Spinner */}
        {loading && (
          <div className="col-12 text-center mt-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>

      {/* Add Resume Modal */}
      <AddResumeModal show={showModal} onClose={() => setShowModal(false)} />

      {/* Resume Action Modal */}
      <ResumeActionModal
        show={!!selectedResume}
        resume={selectedResume}
        onClose={() => setSelectedResume(null)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default DashboardPage;
