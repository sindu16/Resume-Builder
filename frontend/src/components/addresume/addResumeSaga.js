import {call,put,takeLatest} from 'redux-saga/effects';
import { addResume } from './addResumeAPI';
import {addResumeFailure, addResumeRequest, addResumeSuccess } from './addResumeSlice';

function* handleAddResume(action) {
  try {
   
    
    const { token, title, onSuccess } = action.payload;
    
    const response = yield call(addResume, { token, title });
    
    yield put(addResumeSuccess(response.data));
    
   
    if (onSuccess && response.data && response.data._id) {
      console.log('Calling onSuccess with ID:', response.data._id);
      onSuccess(response.data._id); 
    }
    
  } catch (error) {
    console.error('Saga error:', error);
    yield put(addResumeFailure(error.message));
    
    if (action.payload.onError) {
      action.payload.onError(error);
    }
  }
}




export default function* addResumeSaga(){
    yield takeLatest(addResumeRequest.type,handleAddResume)
}