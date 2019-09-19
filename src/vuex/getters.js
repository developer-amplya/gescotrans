export default {
    getUserName(state) {
        return (state.user);
    },
    getUserPass(state) {
        return (state.password);
    },
    getUserCode(state) {
        return (state.user_code);
    },
    getLoadStates(state) {
        return (state.load_states);
    },
};
