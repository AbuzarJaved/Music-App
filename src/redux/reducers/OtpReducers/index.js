import {
  VERIFY_USER_EMAIL_FAIL,
  VERIFY_USER_EMAIL_LOADING,
  VERIFY_USER_EMAIL_SUCCESS,
  VERIFY_USER_PHONE_NUMBER_FAIL,
  VERIFY_USER_PHONE_NUMBER_LOADING,
  VERIFY_USER_PHONE_NUMBER_SUCCESS,
  RESEND_EMAIL_OTP_CODE_FAIL,
  RESEND_EMAIL_OTP_CODE_LOADING,
  RESEND_EMAIL_OTP_CODE_SUCCESS,
  CLEAR_OTP_STATUSES,
  RESEND_PHONE_NUMBER_OTP_CODE_FAIL,
  RESEND_PHONE_NUMBER_OTP_CODE_LOADING,
  RESEND_PHONE_NUMBER_OTP_CODE_SUCCESS,
  CLEAR_OTP_STATUSES_1,
  CLEAR_OTP_STATUSES_2,
  CLEAR_OTP_STATUSES_3,
  GET_PASSWORD_RECOVERY_CODE_FAIL,
  GET_PASSWORD_RECOVERY_CODE_LOADING,
  GET_PASSWORD_RECOVERY_CODE_SUCCESS,
  RESET_FORGET_PASSWORD_FAIL,
  RESET_FORGET_PASSWORD_LOADING,
  RESET_FORGET_PASSWORD_SUCCESS,
  CLEAR_ERROR,
} from '../../constants/index';

export const verifyEmailReducer = (
  state = {status: false, message: '', loading: false, error: null},
  {type, payload},
) => {
  switch (type) {
    case VERIFY_USER_EMAIL_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        status: false,
        message: '',
      };
    case VERIFY_USER_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        status: payload.responseStatus,
        message: payload.responseDescription,
      };

    case VERIFY_USER_EMAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        status: false,
        message: '',
      };
    case CLEAR_OTP_STATUSES:
      return {
        ...state,
        error: null,
        message: '',
        status: false,
      };

    default:
      return state;
  }
};
export const verifyPhoneNumberReducer = (
  state = {status: false, message: '', loading: false, error: null},
  {type, payload},
) => {
  switch (type) {
    case VERIFY_USER_PHONE_NUMBER_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        status: false,
        message: '',
      };
    case VERIFY_USER_PHONE_NUMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        status: payload.responseStatus,
        message: payload.responseDescription,
      };

    case VERIFY_USER_PHONE_NUMBER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        status: false,
        message: '',
      };
    case CLEAR_OTP_STATUSES_1:
      return {
        ...state,
        error: null,
        message: '',
        status: false,
      };

    default:
      return state;
  }
};

export const resendPhoneNumberOtpReducer = (
  state = {status: false, message: '', loading: false, error: null},
  {type, payload},
) => {
  switch (type) {
    case RESEND_PHONE_NUMBER_OTP_CODE_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        status: false,
        message: '',
      };
    case RESEND_PHONE_NUMBER_OTP_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        status: payload.responseStatus,
        message: payload.responseDescription,
      };

    case RESEND_PHONE_NUMBER_OTP_CODE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        status: false,
        message: '',
      };
    case CLEAR_OTP_STATUSES_2:
      return {
        ...state,
        error: null,
        message: '',
        status: false,
      };

    default:
      return state;
  }
};
export const resendEmailOtpReducer = (
  state = {status: false, message: '', loading: false, error: null},
  {type, payload},
) => {
  switch (type) {
    case RESEND_EMAIL_OTP_CODE_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        status: false,
        message: '',
      };
    case RESEND_EMAIL_OTP_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        status: payload.responseStatus,
        message: payload.responseDescription,
      };

    case RESEND_EMAIL_OTP_CODE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        status: false,
        message: '',
      };
    case CLEAR_OTP_STATUSES_3:
      return {
        ...state,
        error: null,
        message: '',
        status: false,
        loading: false,
      };

    default:
      return state;
  }
};
export const getRecoveryCodeReducer = (
  state = {loading: false, error: '', message: '', status: false},
  {type, payload},
) => {
  switch (type) {
    case GET_PASSWORD_RECOVERY_CODE_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        message: '',
        status: false,
      };
    case GET_PASSWORD_RECOVERY_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        message: payload.responseDescription,
        status: payload.responseStatus,
      };
    case GET_PASSWORD_RECOVERY_CODE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        message: '',
        status: false,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: '',
        message: '',
        status: false,
      };

    default:
      return state;
  }
};
export const resetForgetPasswordReducer = (
  state = {loading: false, error: '', message: '', status: false},
  {type, payload},
) => {
  switch (type) {
    case RESET_FORGET_PASSWORD_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        message: '',
        status: false,
      };
    case RESET_FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        message: payload.responseDescription,
        status: payload.responseStatus,
      };
    case RESET_FORGET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        message: '',
        status: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: '',
        message: '',
        status: false,
      };

    default:
      return state;
  }
};
