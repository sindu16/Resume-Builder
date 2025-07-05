import {takeLatest} from 'redux-saga/effects';
import {openAuthModel} from './authSlice';


function* handleOpenModel(action){
    yield true;
    console.log('Model opened with:',action.payload);
}

export default function* authSaga(){

    yield takeLatest(openAuthModel.type,handleOpenModel);

}