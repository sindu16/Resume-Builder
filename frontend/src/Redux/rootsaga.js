import {all} from 'redux-saga/effects';
import authSaga from '../pages/Home/authSaga';
import loginSaga from '../components/login/loginSaga';
import { signupSaga } from '../components/Signup/signupSaga';
import {dashboardSaga} from '../components/Dashboard/dashboardSaga';
import addResumeSaga from '../components/addresume/addResumeSaga';
import {ResumeEditorSaga } from '../pages/ResumeEditor/resumeEditorSaga';


export default function* rootSaga(){
    yield all([
        authSaga(),
        loginSaga(),
        signupSaga(),
        dashboardSaga(),
        addResumeSaga(),
        ResumeEditorSaga(),
    ])
}
