// actions.js
import {
    SET_USER_NAME,
    SET_USER_PASS,
    SET_DOCTORS,
    SET_SPECIALTY,
    SET_DOCTOR,
    SET_PATIENT,
    SET_PATIENTS_LIST,
    SET_REASON,
    SET_REASONS_LIST,
    SET_DATE,
    SET_SCHEDULE,
    SET_TIME_RANGE,
    SET_AVAILABILITY,
    SET_TIME_SLOT,
    SET_CANCEL_LIST, SET_USER_CODE
} from './mutations';

export default {
    setUserName({commit}, userName) {
        commit(SET_USER_NAME, userName);
    },
    setUserPass({commit}, userPass) {
        commit(SET_USER_PASS, userPass);
    },
    setDoctors({commit}, userCode) {
        commit(SET_USER_CODE, userCode);
    },
};
