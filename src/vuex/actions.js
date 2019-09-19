// actions.js
import {
    SET_USER_NAME,
    SET_USER_PASS,
    SET_USER_CODE,
    SET_LOAD_STATES,
} from './mutations';

export default {
    setUserName({commit}, userName) {
        commit(SET_USER_NAME, userName);
    },
    setUserPass({commit}, userPass) {
        commit(SET_USER_PASS, userPass);
    },
    setUserCode({commit}, userCode) {
        commit(SET_USER_CODE, userCode);
    },
    setLoadStates({commit}, loadStates) {
        commit(SET_LOAD_STATES, loadStates);
    },
};
