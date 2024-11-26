import { all } from 'redux-saga/effects';
import familySaga from './familySaga';

export default function* rootSaga() {
  yield all([familySaga()]);
}
