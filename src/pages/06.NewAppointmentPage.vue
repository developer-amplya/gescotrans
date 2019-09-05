<template>
    <f7-page>
        <!-- Navbar -->
        <f7-navbar back-link back-link-force back-link-url="/home" title="Nueva Cita">
            <f7-nav-right>
                <f7-link panel-open="right">
                    <f7-icon material="menu"></f7-icon>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>

        <f7-block>
            <f7-card outline>
                <div @click="selectDoctor">
                    <h3>
                        <f7-icon material="account_box" size="28px"></f7-icon>&nbsp;&nbsp;Facultativa/o
                    </h3>
                    <p><strong>{{ getDoctor[1] }}</strong></p>
                    <p>
                        <small><em>{{ getSpecialty[1] }}</em></small>
                    </p>
                </div>
            </f7-card>

            <f7-card outline>
                <div @click="selectPatient">
                    <h3>
                        <f7-icon material="assignment_ind" size="28px"></f7-icon>&nbsp;&nbsp;Paciente
                    </h3>
                    <p><strong>{{ getPatient[1] }}</strong>
                    </p>
                    <p>
                        <f7-icon slot="media" material="phone" size="18px"></f7-icon>
                        <small><em>{{ getPatient[2] }}</em></small>
                    </p>
                </div>
            </f7-card>

            <f7-card outline>
                <div @click="selectReason">
                    <h3>
                        <f7-icon material="live_help" size="28px"></f7-icon>&nbsp;&nbsp;Motivo
                    </h3>
                    <p><strong>{{ getReason[1] }}</strong>
                    </p>
                    <p>
                        <small><em>{{ getReason[2] }}</em></small>
                    </p>
                </div>
            </f7-card>
        </f7-block>

        <!-- Submit -->
        <f7-toolbar no-hairline position="bottom">
            <f7-button large fill raised @click="checkAvailability">Ver disponibilidad</f7-button>
        </f7-toolbar>
    </f7-page>
</template>

<script>
    import {mapGetters} from "vuex";
    import Calendar from "../components/Calendar";
    import {ifError} from "assert";

    export default {
        name: "NewAppointmentPage",
        components: {
            Calendar
        },
        data() {
            return {
                //
            };
        },
        computed: {
            ...mapGetters(["getDoctor", "getPatient", "getReason", 'getSpecialty'])
        },
        mounted() {
            //this.date = this.getToday();
            //this.$store.dispatch("setDate", this.date);
        },
        methods: {
            selectDoctor() {
                this.$f7router.navigate("/select-doctor");
            },
            selectPatient() {
                this.$f7router.navigate("/patients-list");
            },
            selectReason() {
                if (this.getDoctor[0] === "") {
                    this.$f7.dialog.alert("Debe seleccionar un/a Doctor/a.", "Atención");
                } else {
                    this.$f7router.navigate("/select-reason");
                }
            },
            /*getToday() {
              var today = new Date();
              var dd = String(today.getDate()).padStart(2, "0");
              var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
              var yyyy = today.getFullYear();

              today = dd + "-" + mm + "-" + yyyy;
              return today;
            },*/
            checkAvailability() {
                if (this.getDoctor[0] === "") {
                    this.$f7.dialog.alert("Debe seleccionar un/a Doctor/a", "Atención");
                } else if (this.getReason[0] === "") {
                    this.$f7.dialog.alert("Debe seleccionar un motivo", "Atención");
                } else {
                    this.$f7router.navigate("/available-dates");
                }
            }
        }
    };
</script>

<style scoped>
    .toolbar .button {
        width: 100%;
    }

    .ios .toolbar {
        height: 64px !important;
    }

    .card {
        margin-bottom: 30px !important;
    }
</style>


