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
    getSchedule(state) {
        return (state.schedule);
    },
    getCustomersList(state) {
        return (state.customers_list);
    },
    getServicesList(state) {
        return (state.services_list);
    },
    getSuppliersList(state) {
        return (state.suppliers_list);
    },
    getCustomer(state) {
        return (state.customer);
    },
    getService(state) {
        return (state.service);
    },
    getSupplier(state) {
        return (state.supplier);
    },
    getCargoNoteDate(state) {
        return (state.cargo_note_date);
    },
};
