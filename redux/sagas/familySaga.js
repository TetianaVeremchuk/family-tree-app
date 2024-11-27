import { call, put, takeLatest, all } from 'redux-saga/effects';
import { fetchFamilyTreeRequest, fetchFamilyTreeSuccess, fetchFamilyTreeFailure, createMemberRequest, updateMemberRequest, deleteMemberRequest, } from '../slices/familySlice';
import { getFamilyTree } from '../../api/familyApi';
import { createMember } from '../../api/familyApi';
import { updateMember } from '../../api/familyApi';
import { deleteMember } from '../../api/familyApi';
function* fetchFamilyTreeSaga(action) {
    try {
        console.log('fetchFamilyTreeRequest saga triggered');
        const data = yield call(getFamilyTree);
        console.log('Data fetched:', data);
        yield put(fetchFamilyTreeSuccess(data));
    }
    catch (error) {
        console.error('Error in fetchFamilyTreeSaga:', error);
        yield put(fetchFamilyTreeFailure(error.message || 'An unknown error occurred'));
    }
}
function* watchCreateMemberSaga() {
    yield takeLatest(createMemberRequest.type, function* (action) {
        try {
            const response = yield call(createMember, action.payload);
            console.log('Member created on server:', response);
            yield put(fetchFamilyTreeRequest());
        }
        catch (error) {
            console.error('Error creating member:', error);
        }
    });
}
function* watchUpdateMemberSaga() {
    yield takeLatest(updateMemberRequest.type, function* (action) {
        try {
            const response = yield call(updateMember, action.payload);
            console.log('Member updated on server:', response);
            yield put(fetchFamilyTreeRequest());
        }
        catch (error) {
            console.error('Error updating member:', error);
        }
    });
}
function* watchDeleteMemberSaga() {
    yield takeLatest(deleteMemberRequest.type, function* (action) {
        try {
            yield call(deleteMember, action.payload);
            console.log('Member deleted on server');
            yield put(fetchFamilyTreeRequest());
        }
        catch (error) {
            console.error('Error deleting member:', error);
        }
    });
}
export default function* familySaga() {
    yield all([
        takeLatest(fetchFamilyTreeRequest.type, fetchFamilyTreeSaga),
        watchCreateMemberSaga(),
        watchUpdateMemberSaga(),
        watchDeleteMemberSaga(),
    ]);
}
