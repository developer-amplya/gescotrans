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
    SET_CANCEL_LIST
} from './mutations';

export default {
    setUserName({commit}, userName) {
        commit(SET_USER_NAME, userName);
    },
    setUserPass({commit}, userPass) {
        commit(SET_USER_PASS, userPass);
    },
    setDoctors({commit}, doctors) {
        commit(SET_DOCTORS, doctors);
    },
    setSpecialty({commit}, specialty) {
        commit(SET_SPECIALTY, specialty);
    },
    setDoctor({commit}, doctor) {
        commit(SET_DOCTOR, doctor);
    },
    setPatient({commit}, patient) {
        commit(SET_PATIENT, patient);
    },
    setPatientsList({commit}, patients_list) {
        commit(SET_PATIENTS_LIST, patients_list);
    },
    setReason({commit}, reason) {
        commit(SET_REASON, reason);
    },
    setReasonsList({commit}, reasons_list) {
        commit(SET_REASONS_LIST, reasons_list);
    },
    setDate({commit}, date) {
        commit(SET_DATE, date);
    },
    setSchedule({commit}, data) {
        commit(SET_SCHEDULE, data);
    },
    setTimeRange({commit}, time_range) {
        commit(SET_TIME_RANGE, time_range);
    },
    setAvailability({commit}, availability) {
        commit(SET_AVAILABILITY, availability);
    },
    setTimeSlot({commit}, time_slot) {
        commit(SET_TIME_SLOT, time_slot);
    },
    setCancelList({commit}, cancel_list) {
        commit(SET_CANCEL_LIST, cancel_list);
    }
};
