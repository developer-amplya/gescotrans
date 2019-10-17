import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import actions from './actions';
import {
    SET_USER_NAME,
    SET_USER_PASS,
    SET_USER_CODE, SET_LOAD_STATES,
    SET_SCHEDULE,
    SET_CUSTOMERS_LIST,
    SET_SERVICES_LIST,
    SET_SUPPLIERS_LIST,
    SET_CUSTOMER,
    SET_SERVICE,
    SET_SUPPLIER,
} from './mutations';

Vue.use(Vuex)

const state = {
    user: '',
    password: '',
    user_code: '',
    load_states: {},
    schedule: {},
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
    customer: ['', 'Seleccionar...'],
    service: ['', 'Seleccionar...'],
    supplier: ['', 'Seleccionar...'],
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
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
});

/*
        '001': [
            'Pediatría', [
                ['01', 'Ana Torroja'],
                ['02', 'Jose Feliciano']
            ]
        ],
        '002': [
            'Geriatría', [
                ['03', 'Terelu Campos'],
                ['04', 'Javi Pecos']
            ]
        ]
    */

/*
    '01': [
        'Pediatría', [
            ['01', 'Primera consulta', '30 min'],
            ['02', 'Revisión', '30 min']
        ]
    ],
    '02': [
        'Cirugía', [
            ['03', 'Quirófano', '30 min'],
            ['04', 'Retirada de puntos', '30 min']
        ]
    ]
*/

/*
    "2019-04-12": [
        "12 ABR 19", [
            ["11:00-11:30", "1ª consulta"],
            ["15:30-16:30", "Revisión"]
        ]
    ],
    "2019-04-13": [
        "13 ABR 19", [
            ["09:00-09:30", "1ª consulta"],
            ["12:30-13:30", "Revisión"]
        ]
    ],
    "2019-04-14": [
        "14 ABR 19", [
            ["11:00-11:30", "1ª consulta"],
            ["15:30-16:30", "Quirófano"]
        ]
    ],
    "2019-04-15": [
        "15 ABR 19", [
            ["09:00-09:30", "Revisión"],
            ["12:30-13:30", "Revisión"]
        ]
    ]
*/
