import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import authReducer from '../pages/Home/authSlice';
import loginReducer from '../components/login/loginSlice'
import registerReducer from '../components/Signup/signupSlice';
import dashboardReducer from '../components/Dashboard/dashboardSlice';
import addResumeReducer from '../components/addresume/addResumeSlice';
import resumeEditorReducer from '../pages/ResumeEditor/resumeEditorSlice';
import rootSaga from '../Redux/rootsaga';


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer:{
        auth:authReducer,
        login:loginReducer,
        register: registerReducer,
        dashboard:dashboardReducer,
        addResume: addResumeReducer,
        resumeEditor: resumeEditorReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({thunk: false,}).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;