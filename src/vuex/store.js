import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import actions from './actions';
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
    SET_CANCEL_LIST
} from './mutations';

Vue.use(Vuex)

const state = {
    availability: {},
    cancel_list: [],
    contrasenya: '',    
    date: '',
    doctor: ['', 'Seleccionar...'],
    doctors: {},
    patient: ['', 'Seleccionar...', ''],
    patients_list: null,
    reason: ['', 'Seleccionar...', ''],
    reasons_list: {},
    schedule: {},
    specialty: [],
    time_range: [],
    time_slot: '',
    usuario: ''
}

const mutations = {
    [SET_USER_NAME](state, userName) {
        state.usuario = userName;
    },
    [SET_USER_PASS](state, userPass) {
        state.contrasenya = userPass;
    },
    [SET_DOCTORS](state, doctors) {
        state.doctors = doctors;
    },
    [SET_SPECIALTY](state, specialty) {
        state.specialty = specialty;
    },
    [SET_DOCTOR](state, doctor) {
        state.doctor = doctor;
    },
    [SET_PATIENT](state, patient) {
        state.patient = patient;
    },
    [SET_PATIENTS_LIST](state, patients_list) {
        state.patients_list = patients_list;
    },
    [SET_REASON](state, reason) {
        state.reason = reason;
    },
    [SET_REASONS_LIST](state, reasons_list) {
        state.reasons_list = reasons_list;
    },
    [SET_DATE](state, date) {
        state.date = date;
    },
    [SET_SCHEDULE](state, data) {
        state.schedule = data;
    },
    [SET_TIME_RANGE](state, time_range) {
        state.time_range = time_range;
    },
    [SET_AVAILABILITY](state, availability) {
        state.availability = availability;
    },
    [SET_TIME_SLOT](state, time_slot) {
        state.time_slot = time_slot;
    },
    [SET_CANCEL_LIST](state, cancel_list) {
        state.cancel_list = cancel_list;
    }
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
