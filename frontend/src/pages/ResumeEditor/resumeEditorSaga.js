import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  fetchResumeRequest,
  fetchResumeSuccess,
  fetchResumeFailure,
  updateResumeRequest,
  deleteResumeRequest,
  deleteResumeSuccess,
} from './resumeEditorSlice';
import { getResumeAPI, updateResumeAPI } from './resumeEditorAPI';
import axios from 'axios';

const selectToken = (state) => state.auth.token;

function* fetchResumeSaga(action) {
  try {
    const id = typeof action.payload === 'string' ? action.payload : action.payload?.id;
    const token = yield select((state) => state.login.token);

    if (!id) {
      throw new Error('Resume ID is missing');
    }
    const response = yield call(getResumeAPI, id, token); 
    yield put(fetchResumeSuccess(response.data));
  } catch (error) {
    console.error('Resume fetch failed', error);
    yield put(fetchResumeFailure(error.response?.data?.message || 'Failed to fetch resume'));
  }
}


function* updateResumeSaga(action) {
  try {
    const token = yield select((state) => state.login.token); 
    const { id, data, onSuccess } = action.payload;

    const response = yield call(updateResumeAPI, id, data, token); 
// console.log(response);
    if (onSuccess) onSuccess();
  } catch (error) {
    console.error('Update error in saga:', error);
    if (action.payload?.onError) action.payload.onError(error);
  }
}


function* handleDeleteResume(action) {
  try {
    const token = yield select(selectToken);
    yield call(axios.delete, `http://localhost:5000/api/resumes/${action.payload}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(deleteResumeSuccess());
    action.meta?.navigate('/dashboard');
  } catch (error) {
    console.error('Delete failed', error);
  }
}

export function* ResumeEditorSaga() {
  yield takeLatest(fetchResumeRequest.type, fetchResumeSaga);
  yield takeLatest(updateResumeRequest.type, updateResumeSaga);
  yield takeLatest(deleteResumeRequest.type, handleDeleteResume);
}
