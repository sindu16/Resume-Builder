import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchResumesAPI } from './dashboardAPI';
import {
  fetchResumesRequest,
  fetchResumesSuccess,
  fetchResumesFailure,
   deleteResumeRequest,
  deleteResumeSuccess,
  deleteResumeFailure,
} from './dashboardSlice';
import axios from 'axios';

function* fetchResumesSaga(action) {
  try {
    const data = yield call(fetchResumesAPI, action.payload); 
    yield put(fetchResumesSuccess(data));
  } catch (error) {
    yield put(fetchResumesFailure(error.response?.data?.message || error.message));
  }
}

function* deleteResumeSaga(action) {
  try {
    const { resumeId, token } = action.payload;
    yield call(axios.delete, `http://localhost:5000/api/resumes/${resumeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    yield put(deleteResumeSuccess(resumeId));
  } catch (error) {
    yield put(deleteResumeFailure(error.response?.data?.message || 'Delete failed'));
  }
}
export function* dashboardSaga() {
  yield takeLatest(fetchResumesRequest.type, fetchResumesSaga);
  yield takeLatest(deleteResumeRequest.type, deleteResumeSaga);
}
