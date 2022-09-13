import { takeLatest, all, call, put, take } from 'redux-saga/effects';
import { USER_ACTIONS_TYPES } from './user.types';
import { signInSuccess, signInFailed, signUpFailed, signUpSuccess, signOutSuccess, signOutFailed } from './user.action';
import { 
    getCurrentUser,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser,

} from '../../utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
      const userSnapshot = yield call(
        createUserDocumentFromAuth,
        userAuth,
        additionalDetails
      );
      yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
      yield put(signInFailed(error));
    }
}

export function* userSagas() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart),
    ])
}

/* -- SIGN IN -- */
export function* signInWithGoogle() {
    try {
        const { user } =  yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* onGoogleSignInStart() {
    yield(takeLatest(USER_ACTIONS_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle));
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTIONS_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield call(
            signInAuthWithEmailAndPassword,
            email,
            password
        );
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

/* -- CHECK SESSION -- */

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTIONS_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);

        if (!userAuth) {
            return;
        }

        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

/* -- SIGN UP -- */

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
    yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTIONS_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignUpStart() {
    yield takeLatest(USER_ACTIONS_TYPES.SIGN_UP_START, signUp);
}

export function* signUp({payload: { email, password, displayName }}) {
    try {
        const { user } =  yield call(createAuthUserWithEmailAndPassword, email, password);
        yield put(signUpSuccess(user, { displayName }));
    } catch (error) {
        yield put(signUpFailed(error));
    }
}

/* -- SIGN OUT -- */

export function* signOut() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailed(error));
    }
}

export function* onSignOutStart() {
    yield takeLatest(USER_ACTIONS_TYPES.SIGN_OUT_START, signOut);
}
