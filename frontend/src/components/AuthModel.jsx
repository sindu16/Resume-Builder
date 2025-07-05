import { useState } from 'react';
import Login from './login/LoginPage';
import Signup from './Signup/Signup';

const AuthModel = ({ onClose }) => {
  const [mode, setMode] = useState('login');

  const switchToSignup = () => setMode('signup');
  const switchToLogin = () => setMode('login');

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content border-0 shadow-lg">
          {mode === 'login' ? (
            <Login onClose={onClose} onShowSignup={switchToSignup} />
          ) : (
            <Signup onClose={onClose} onShowLogin={switchToLogin} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModel;
