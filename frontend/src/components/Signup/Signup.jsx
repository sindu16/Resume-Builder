import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {registerSuccess, registerFailure } from './signupSlice';
import { Link } from 'react-router-dom';
import { signupAPI } from './sigupAPI';

const Signup = ({ onClose, onShowLogin }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.register);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    profileImage: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, GIF)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setForm({ ...form, profileImage: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setForm({ ...form, profileImage: null });
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (form.fullName.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[0-9])(?=.*[!@#$%^&*])/.test(form.password)) {
      newErrors.password = 'Password must contain a number and a special character';
    }

    return newErrors;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = validateForm();
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setErrors({});

  const formData = new FormData();
  formData.append('fullName', form.fullName);
  formData.append('email', form.email);
  formData.append('password', form.password);
  if (form.profileImage) {
    formData.append('profileImage', form.profileImage);
  }

  try {
    const response = await signupAPI(formData);
    dispatch(registerSuccess(response));
  } catch (err) {
    dispatch(registerFailure(err.response?.data?.message || 'Signup failed'));
  }
};

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        onShowLogin();
      }, 1500);
    }
  }, [success, onShowLogin]);

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content border-0 shadow">
          <div className="modal-header">
            <h5 className="modal-title">Sign Up</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && (
              <div className="alert alert-success">
                Registration successful! Redirecting...
              </div>
            )}

            {/* Profile Image Upload */}
            <div className="text-center mb-4">
              <div className="position-relative d-inline-block">
                <div
                  className="rounded-circle bg-light border d-flex justify-content-center align-items-center overflow-hidden"
                  style={{ width: '100px', height: '100px' }}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile Preview"
                      className="img-fluid rounded-circle"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <i className="bi bi-person-fill fs-1 text-muted"></i>
                  )}
                </div>
                <button
                  type="button"
                  className="btn position-absolute"
                  style={{
                    bottom: 0,
                    right: 0,
                    backgroundColor: '#000',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <i className="bi bi-upload"></i>
                </button>
              </div>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="d-none"
              />

              {imagePreview && (
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm mt-2"
                  onClick={removeImage}
                >
                  Remove Image
                </button>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">
                  Full Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                  required
                />
                {errors.fullName && (
                  <div className="invalid-feedback">{errors.fullName}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  autoComplete="username"
                  value={form.email}
                  onChange={handleChange}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  required
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Password <span className="text-danger">*</span>
                </label>
              
                {/* Wrap input + icon inside position-relative div */}
                <div className="position-relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className={`form-control pe-5 ${errors.password ? 'is-invalid' : ''}`}
                    autoComplete="new-password"
                    placeholder="Min 8 characters"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '10px',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                    }}
                    tabIndex={-1}
                  >
                    <i
                      className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}
                      style={{ fontSize: '1.2rem', color: '#6c757d' }}
                    ></i>
                  </button>
                </div>

                {/* Error shown outside the input container to avoid shifting */}
                {errors.password && (
                  <div className="invalid-feedback d-block">{errors.password}</div>
                )}
              </div>













              <button
                type="submit"
                className="btn btn-dark w-100"
                disabled={loading || success}
              >
                {loading ? 'Signing up...' : success ? 'Success!' : 'Sign Up'}
              </button>
            </form>

            <div className="text-center mt-3">
              Already have an account?{' '}
              <Link className="btn btn-link p-0" onClick={onShowLogin}>
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
