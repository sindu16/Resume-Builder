import {call,put,takeLatest} from 'redux-saga/effects';
import { loginAPI } from './loginAPI';
import {loginRequest,loginSuccess,loginFailure} from './loginSlice';

// workerSaga

function* handleLogin(action){
  
    try {
     
    const response = yield call(loginAPI, action.payload);
    
    if (response.status === 200) {
      yield put(loginSuccess(response.data));
      
    } else {
      yield put(loginFailure('Invalid email or password'));
    }
  } catch (error) {
    
    if (error.response && error.response.status === 401) {
      
      yield put(loginFailure('Invalid email or password'));
    } else {
      yield put(loginFailure('Server error'));
    }
  }
}

// watcherSaga

export default function* loginSaga(){
    yield takeLatest(loginRequest.type,handleLogin);
}