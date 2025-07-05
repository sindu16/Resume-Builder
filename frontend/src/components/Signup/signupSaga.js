import {takeLatest} from 'redux-saga/effects';
import {registerRequest,registerSuccess,registerFailure} from './signupSlice';
import {signupAPI} from './sigupAPI';

 const handleRegister = (form) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append('fullName', form.fullName);
    formData.append('email', form.email);
    formData.append('password', form.password);
    if (form.profileImage) {
      formData.append('profileImage', form.profileImage);
    }

    const response = await signupAPI(formData);
    dispatch(registerSuccess(response));
  } catch (err) {
    dispatch(registerFailure(err.response?.data?.message || 'Signup failed'));
  }
};

export function* signupSaga() {
  yield takeLatest(registerRequest.type, handleRegister);
}
 