export default {
    getUserName(state) {
        return (state.usuario);
    },
    getUserPass(state) {
        return (state.contrasenya);
    },
    getDoctors(state) {
        return (state.doctors);
    },
    getSpecialty(state) {
        return (state.specialty);
    },
    getDoctor(state) {
        return (state.doctor);
    },
    getPatient(state) {
        return (state.patient);
    },
    getPatientsList(state) {
        return (state.patients_list);
    },
    getReason(state) {
        return (state.reason);
    },
    getReasonsList(state) {
        return (state.reasons_list);
    },
    getDate(state) {
        return (state.date);
    },
    getSchedule(state) {
        return (state.schedule);
    },
    getTimeRange(state) {
        return (state.time_range);
    },
    getAvailability(state) {
        return (state.availability);
    },
    getTimeSlot(state) {
        return (state.time_slot);
    },
    getCancelList(state) {
        return (state.cancel_list);
    }
};
