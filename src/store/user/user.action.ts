import { User } from "firebase/auth";
import { AdditionalInformation, UserData } from "../../utils/firebase/firebase.utils";
import { createAction, Action, withMatcher, ActionWithPaylopad } from "../../utils/reducer/reducer.utils";
import { USER_ACTIONS_TYPES } from "./user.types";

export type SetCurrentUser = ActionWithPaylopad<USER_ACTIONS_TYPES.SET_CURRENT_USER, UserData>;
export type CheckUserSession = Action<USER_ACTIONS_TYPES.CHECK_USER_SESSION>;
export type GoogleSignInStart = Action<USER_ACTIONS_TYPES.GOOGLE_SIGN_IN_START>;
export type EmailSignInStart = ActionWithPaylopad<USER_ACTIONS_TYPES.EMAIL_SIGN_IN_START, { email: string; password: string }>;
export type SignInSuccess = ActionWithPaylopad<USER_ACTIONS_TYPES.SIGN_IN_SUCCESS, UserData>;
export type SignInFailed = ActionWithPaylopad<USER_ACTIONS_TYPES.SIGN_IN_FAILED, Error>;
export type SignUpStart = ActionWithPaylopad<USER_ACTIONS_TYPES.SIGN_UP_START, { email: string; password: string; displayName: string }>;
export type SignUpSuccess = ActionWithPaylopad<USER_ACTIONS_TYPES.SIGN_UP_SUCCESS, { user: User; additionalDetails: AdditionalInformation }>;
export type SignUpFailed = ActionWithPaylopad<USER_ACTIONS_TYPES.SIGN_UP_FAILED, Error>;
export type SignOutStart = Action<USER_ACTIONS_TYPES.SIGN_OUT_START>;
export type SignOutSuccess = Action<USER_ACTIONS_TYPES.SIGN_OUT_SUCCESS>;
export type SignOutFailed = ActionWithPaylopad<USER_ACTIONS_TYPES.SIGN_OUT_FAILED, Error>;

export const setCurrentUser = withMatcher((user: UserData): SetCurrentUser => createAction(USER_ACTIONS_TYPES.SET_CURRENT_USER, user));

export const checkUserSession = withMatcher((): CheckUserSession => createAction(USER_ACTIONS_TYPES.CHECK_USER_SESSION));

export const googleSignInStart = withMatcher((): GoogleSignInStart => createAction(USER_ACTIONS_TYPES.GOOGLE_SIGN_IN_START));

export const emailSignInStart = withMatcher((email: string, password: string): EmailSignInStart => createAction(USER_ACTIONS_TYPES.EMAIL_SIGN_IN_START, { email, password }));

export const signInSuccess = withMatcher(
    (user: any): SignInSuccess => createAction(USER_ACTIONS_TYPES.SIGN_IN_SUCCESS, user)
);
  
  
export const signInFailed = withMatcher((error: Error): SignInFailed => createAction(USER_ACTIONS_TYPES.SIGN_IN_FAILED, error));

export const signUpStart = withMatcher((email: string, password: string, displayName: string): SignUpStart => createAction(USER_ACTIONS_TYPES.SIGN_UP_START, { email, password, displayName }));

export const signUpSuccess = withMatcher((user: User, additionalDetails: AdditionalInformation): SignUpSuccess => createAction(USER_ACTIONS_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails }));

export const signUpFailed = withMatcher((error: Error): SignUpFailed => createAction(USER_ACTIONS_TYPES.SIGN_UP_FAILED, error));

export const signOutStart = withMatcher((): SignOutStart => createAction(USER_ACTIONS_TYPES.SIGN_OUT_START));

export const signOutSuccess = withMatcher((): SignOutSuccess => createAction(USER_ACTIONS_TYPES.SIGN_OUT_SUCCESS));

export const signOutFailed = withMatcher((error: Error): SignOutFailed => createAction(USER_ACTIONS_TYPES.SIGN_OUT_FAILED, error));
