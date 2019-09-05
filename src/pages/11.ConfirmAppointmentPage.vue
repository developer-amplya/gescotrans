<template>
    <f7-page>
        <!-- Navbar -->
        <f7-navbar back-link>
            <f7-nav-title>Confirmación Cita</f7-nav-title>
            <f7-nav-right>
                <f7-link panel-open="right">
                    <f7-icon material="menu"></f7-icon>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>

        <f7-list media-list no-hairlines>

            <f7-list-item
                    :title="getDoctor[1]"
                    :footer="getSpecialty[1]">
                <f7-icon slot="media" material="account_box" size="48px"></f7-icon>
            </f7-list-item>

            <f7-list-item
                    :title="getPatient[1]"
                    @click="selectPatient">
                <f7-icon slot="media" material="assignment_ind" size="48px"></f7-icon>
                <div
                        slot="after"
                        @click="addPatient">
                    <f7-icon slot="media" material="add" size="36px" class="add-patient"></f7-icon>
                </div>
                <div slot="footer" class="patient-phone">
                    <f7-icon slot="media" material="phone" size="18px"></f7-icon>
                    {{ getPatient[2] }}
                </div>
            </f7-list-item>

            <f7-list-item
                    :title="getReason[1]"
                    :footer="getReason[2]">
                <f7-icon slot="media" material="live_help" size="48px"></f7-icon>
            </f7-list-item>

            <f7-list-item
                    :title="date"
                    :footer="getTimeSlot">
                <f7-icon slot="media" material="alarm" size="48px"></f7-icon>
            </f7-list-item>

            <f7-list-item>
                <f7-list-input
                        label="Observaciones"
                        type="textarea"
                        style="width: 100%"
                        :value="comments"
                        @input="comments = $event.target.value"
                        resizable></f7-list-input>
            </f7-list-item>
        </f7-list>

        <!-- SUBMIT -->
        <f7-toolbar no-hairline position="bottom">
            <f7-button text="Guardar cita" @click="saveAppointment" fill large raised></f7-button>
        </f7-toolbar>
    </f7-page>
</template>

<script>
    import axios from "axios";
    import {WS_PATH} from "../config";
    import {mapGetters} from "vuex";

    export default {
        name: "ConfirmAppointmentPage",

        data() {
            return {
                slots: {},
                date: '',
                comments: ''
            };
        },
        computed: {
            ...mapGetters([
                'getAvailability',
                'getUserName',
                'getUserPass',
                "getDoctor",
                "getSpecialty",
                "getPatient",
                "getReason",
                "getDate",
                "getTimeSlot"
            ])
        },
        mounted() {
            this.date = this.getAvailability[this.getDate][0]
        },
        methods: {
            saveAppointment() {
                if(this.getPatient[0] === '') {
                    this.$f7.dialog.alert("Debe seleccionar un paciente", "Atención");
                    return;
                }
                // Preloader On
                this.$f7.dialog.preloader("Guardando...");

                let bodyFormData = new FormData();
                bodyFormData.set("ipgsbase", localStorage.ipgsbase);
                bodyFormData.set("puertogsbase", localStorage.puertogsbase);
                bodyFormData.set("gestgsbase", localStorage.gestgsbase);
                bodyFormData.set("ejagsbase", localStorage.ejagsbase);
                bodyFormData.set("user", this.getUserName);
                bodyFormData.set("pass", this.getUserPass);
                bodyFormData.set("cod_doctor", this.getDoctor[0]);
                bodyFormData.set("cod_especialidad", this.getSpecialty[0]);
                bodyFormData.set("cod_motivo", this.getReason[0]);
                bodyFormData.set("cod_paciente", this.getPatient[0]);
                bodyFormData.set("txt_fecha", this.getDate);
                bodyFormData.set("txt_hora", this.getTimeSlot);
                bodyFormData.set("txt_observaciones", this.comments);

                axios({
                    method: "post",
                    url: WS_PATH + "set_new_date.php",
                    data: bodyFormData,
                    timeout: 15000
                })
                    .then(response => {
                        // Preloader Off
                        this.$f7.dialog.close();

                        if (response.data) {
                            this.$store.dispatch("setDoctor", ['', 'Seleccionar...']);
                            this.$store.dispatch("setSpecialty", []);
                            this.$store.dispatch("setPatient", ['', 'Seleccionar...', '']);
                            this.$store.dispatch("setReason", ['', 'Seleccionar...', '']);
                            this.$store.dispatch("setDate", '');
                            this.$store.dispatch("setTimeSlot", '');
                            this.$store.dispatch("setTimeRange", []);
                            this.$store.dispatch("setAvailability", {});
                            //
                            let notification = this.$f7.toast.create({
                                position: 'top',
                                text: "Cita guardada",
                                cssClass: "success",
                                icon: '<i class="icon material-icons">done</i>',
                                closeTimeout: 2000
                            });
                            notification.open();
                            //
                            setTimeout(() => {
                                this.$f7router.navigate("/home");
                            }, 2000);
                        } else {
                            this.$f7.dialog.alert("No ha sido posible guardar", "Error");
                        }
                    })
                    .catch(error => {
                        //console.log(error);
                        // Preloader Off
                        this.$f7.dialog.close();
                        this.$f7.dialog.alert("No se ha podido conectar", "Error");
                    });
            },
            selectPatient() {
                this.$f7router.navigate('/patients-list/confirm-appointment');
            },
            addPatient() {
                this.$f7router.navigate('/new-patient/confirm-appointment');
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

    .item-media i {
        color: var(--f7-theme-color) !important;
    }

    .add-patient.icon {
        color: var(--f7-theme-color);
    }

    .patient-phone {
        margin-top: -12px;
    }
</style>


