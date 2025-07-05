import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SketchPicker } from 'react-color';
import { useNavigate } from 'react-router-dom';
import { logoutSuccess } from '../../components/login/loginSlice';
import { updateResumeField } from '../ResumeEditor/resumeEditorSlice';
import { deleteResumeRequest } from '../../components/Dashboard/dashboardSlice';

const HeaderBar = ({
  resume,
  showColorPicker,
  setShowColorPicker,
  themeColor,
  setThemeColor,
  onDelete,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.login);
  const [imageError, setImageError] = useState(false);

  const getProfileImageUrl = () => {
    if (!user || !user.id || imageError) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || 'User')}&size=40`;
    }
    return `http://localhost:5000/api/users/profile-image/${user.id}`;
  };

  // const handleThemeColorChange = (color) => {
  //   const selectedColor = color.hex;
  //   setThemeColor(selectedColor);
  //   dispatch(updateResumeField({ field: 'themeColor', value: selectedColor }));
  // };

  const getContrastingTextColor = (hexColor) => {
  const color = hexColor.substring(1);
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 160 ? '#000000' : '#ffffff';
};

const handleThemeColorChange = (color) => {
  const selectedColor = color.hex;
  const contrastText = getContrastingTextColor(selectedColor);
  setThemeColor(selectedColor);
  dispatch(updateResumeField({ field: 'themeColor', value: selectedColor }));
  dispatch(updateResumeField({ field: 'textColor', value: contrastText }));
};

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logoutSuccess());
    navigate('/');
  };

  const handleDeleteClick = () => {
    if (resume?._id && window.confirm('Are you sure you want to delete this resume?')) {
      dispatch(deleteResumeRequest({ resumeId: resume._id, token }));
      if (onDelete) onDelete();
    }
  };

  const handlePreviewClick = () => {
    if (resume?._id) {
      navigate(`/resumepreview/${resume._id}/edit`);
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center mb-4 bg-white bg-opacity-75 p-2 rounded-4 shadow-sm border">
      {/* === LEFT: Resume Title === */}
      <input
        className="form-control border-0 fs-4 fw-bold bg-transparent text-dark"
        value={resume?.title || 'Untitled Resume'}
        readOnly
        style={{ boxShadow: 'none', maxWidth: '300px' }}
      />

      {/* === RIGHT: Theme, Profile, Logout === */}
      <div className="d-flex align-items-center gap-3 position-relative">
        {/* Theme Button */}
        <button
          className="btn btn-outline-primary rounded-pill fw-semibold"
          onClick={() => setShowColorPicker(!showColorPicker)}
        >
          <i className="bi bi-palette me-1"></i> Theme
        </button>

        {showColorPicker && (
          <div className="position-absolute" style={{ top: '60px', right: 0, zIndex: 9999 }}>
            <SketchPicker color={themeColor} onChange={handleThemeColorChange} />
          </div>
        )}

        {/* Profile Image + Name */}
        <div className="d-flex flex-column align-items-center">
          <img
            src={getProfileImageUrl()}
            onError={() => setImageError(true)}
            alt="Profile"
            className="rounded-circle mb-1"
            width={40}
            height={40}
            style={{ objectFit: 'cover', border: '2px solid #ccc' }}
          />
          <small className="fw-bold">{user?.fullName}</small>
        </div>

        {/* Logout Button */}
        <button onClick={handleLogout} className="btn btn-outline-dark btn-sm">
          Logout
        </button>
      </div>
    </div>
  );
};

export default HeaderBar;
