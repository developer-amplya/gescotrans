import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import actions from './actions';
import {
    SET_USER_NAME,
    SET_USER_PASS,
    SET_USER_CODE,
    SET_USER_ROLE,
    SET_LOAD_STATES,
    SET_SCHEDULE,
    SET_CUSTOMERS_LIST,
    SET_SERVICES_LIST,
    SET_SUPPLIERS_LIST,
    SET_CUSTOMER,
    SET_SERVICE,
    SET_SUPPLIER,
    SET_CARGO_NOTE_DATE,
    SET_LICENSE_PLATES_LIST,
    SET_LICENSE_PLATE,
} from './mutations';

Vue.use(Vuex)

const state = {
    user: '',
    password: '',
    user_code: '',
    user_role: '',
    load_states: {},
    schedule: {},
    customers_list: [],
    services_list: [],
    suppliers_list:[],
    customer: ['', 'Seleccionar...'],
    service: ['', 'Seleccionar...'],
    supplier: ['', 'Seleccionar...'],
    cargo_note_date: null,
    license_plates_list: {},
    license_plate: 'Seleccionar...',
}

const mutations = {
    [SET_USER_NAME](state, userName) {
        state.user = userName;
    },
    [SET_USER_PASS](state, userPass) {
        state.password = userPass;
    },
    [SET_USER_CODE](state, userCode) {
        state.user_code = userCode;
    },
    [SET_USER_ROLE](state, userRole) {
        state.user_role = userRole;
    },
    [SET_LOAD_STATES](state, loadStates) {
        state.load_states = loadStates;
    },
    [SET_SCHEDULE](state, data) {
        state.schedule = data;
    },
    [SET_CUSTOMERS_LIST](state, customersList) {
        state.customers_list = customersList;
    },
    [SET_SERVICES_LIST](state, servicesList) {
        state.services_list = servicesList;
    },
    [SET_SUPPLIERS_LIST](state, suppliersList) {
        state.suppliers_list = suppliersList;
    },
    [SET_CUSTOMER](state, customer) {
        state.customer = customer;
    },
    [SET_SERVICE](state, service) {
        state.service = service;
    },
    [SET_SUPPLIER](state, supplier) {
        state.supplier = supplier;
    },
    [SET_CARGO_NOTE_DATE](state, date) {
        state.cargo_note_date = date;
    },
    [SET_LICENSE_PLATES_LIST](state, license_plates_list) {
        state.license_plates_list = license_plates_list;
    },
    [SET_LICENSE_PLATE](state, license_plate) {
        state.license_plate = license_plate;
    },
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
});

/*
        customers_list: [
        ['000', 'A', ''],
        ['456', 'Antonio Orozco', '666 555 444'],
        ['254', 'Andrea Valles', '666 777 888'],
        ['000', 'B', ''],
        ['965', 'Bartolome de las Chozas', '666 555 444'],
        ['853', 'Begoña Valles', '666 777 888']
    ],
    services_list: [
        ['000', 'A', ''],
        ['456', 'Antonio Orozco', '666 555 444'],
        ['254', 'Andrea Valles', '666 777 888'],
        ['000', 'B', ''],
        ['965', 'Bartolome de las Chozas', '666 555 444'],
        ['853', 'Begoña Valles', '666 777 888']
    ],
    suppliers_list:[
        ['000', 'A', ''],
        ['456', 'Antonio Orozco', '666 555 444'],
        ['254', 'Andrea Valles', '666 777 888'],
        ['000', 'B', ''],
        ['965', 'Bartolome de las Chozas', '666 555 444'],
        ['853', 'Begoña Valles', '666 777 888']
    ],
*/
