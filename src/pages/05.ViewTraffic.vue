<template>
    <f7-page @page:afterin="retrieveData" @page:beforeout="$refs.appointment_sheet.close()">
        <!-- Navbar -->
        <!-- Navbar -->
        <f7-navbar back-link>
            <f7-nav-title>Agenda: Dr/a. {{ getDoctor[1] }}</f7-nav-title>
            <f7-nav-right>
                <f7-link panel-open="right">
                    <f7-icon material="menu"></f7-icon>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>

        <!-- Content -->
        <!--
            Additional "timeline-horizontal" class to enable Horizontal timeline
            Additional "col-50" to define column width (50%)
            Additional "tablet-20" to define column width for tablets (20%)
        -->
        <div class="timeline timeline-horizontal col-50 tablet-20">
            <!-- Timeline Item (Day) -->
            <div class="timeline-item" v-for="(fecha, index) in lista_fechas" :key="index">
                <div class="timeline-item-date">{{ getSchedule[fecha][0] }}</div>
                <div class="timeline-item-content">
                    <div class="timeline-item-inner" v-for="(value, key, index) in getSchedule[fecha][1]" :key="index">
                        <div @click="openSheet(value[0], value[3], value[4])">
                            <div class="timeline-item-time">{{ value[1] }}</div>
                            <div class="timeline-item-title">{{ value[2] }}</div>
                            <div class="timeline-item-subtitle">{{ value[3] }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <f7-sheet class="sheet" ref="appointment_sheet" @sheet:closed="sheetOpened = false">
            <f7-toolbar>
                <div class="left"></div>
                <div class="right">
                    <f7-link sheet-close>Cerrar</f7-link>
                </div>
            </f7-toolbar>
            <!-- Scrollable sheet content -->
            <f7-page-content>
                <f7-block>
                    <h3>{{ patientName }}</h3>
                    <p>
                        <f7-icon slot="media" material="phone" size="18px"></f7-icon>
                        <a class="external" :href="'tel:' + patientPhone"><em>{{ patientPhone }}</em></a>
                    </p>
                    <br>
                    <f7-button large raised fill :href="'/cancel-schedule/' + appointmentCode" sheet-close>ANULAR CITA</f7-button>
                </f7-block>
            </f7-page-content>
        </f7-sheet>

        <f7-fab position="right-bottom" slot="fixed" color="red" href="/new-appointment">
            <f7-icon ios="f7:add" md="material:add"></f7-icon>
        </f7-fab>
    </f7-page>
</template>

<script>
    import axios from "axios";
    import {WS_PATH} from "../config";
    import {mapGetters} from "vuex";

    export default {
        name: "ViewTraffic",
        data() {
            return {
                lista_fechas: '',
                appointmentCode: '',
                patientName: '',
                patientPhone: ''
            }
        },
        computed: {
            ...mapGetters(["getUserName", "getUserPass", "getDoctor", "getSchedule"])
        },
        methods: {
            retrieveData() {
                // Preloader On
                this.$f7.dialog.preloader("Cargando...");

                // Get schedule
                let bodyFormData = new FormData();
                bodyFormData.set("user", this.getUserName);
                bodyFormData.set("pass", this.getUserPass);
                bodyFormData.set("cod_doctor", this.getDoctor[0]);
                bodyFormData.set("ipgsbase", localStorage.ipgsbase);
                bodyFormData.set("puertogsbase", localStorage.puertogsbase);
                bodyFormData.set("gestgsbase", localStorage.gestgsbase);
                bodyFormData.set("ejagsbase", localStorage.ejagsbase);

                axios({
                    method: "post",
                    url: WS_PATH + "get_agenda_doctor.php",
                    data: bodyFormData,
                    timeout: 15000
                })
                    .then(response => {
                        //console.log(response);
                        // Preloader Off
                        this.$f7.dialog.close();

                        if (response.data.usuario_valido === "ok") {
                            let schedule = JSON.parse(
                                this.decodeEntities(JSON.stringify(response.data.agenda))
                            );

                            // Set state
                            this.$store.dispatch("setSchedule", schedule);

                            this.lista_fechas = response.data.lista_fechas;
                        } else {
                            this.$f7.dialog.alert("gsBase ha respondido KO", "Error");
                        }
                    })
                    .catch(error => {
                        //console.log(error);
                        // Preloader Off
                        this.$f7.dialog.close();
                        this.$f7.dialog.alert("No se ha podido conectar", "Error");
                    });
            },
            openSheet(code, patient, phone ) {
                this.appointmentCode = code;
                this.patientName = patient;
                this.patientPhone = phone;
                this.$refs.appointment_sheet.open();
            },
            decodeEntities(encodedString) {
                var translate_re = /&(aacute|eacute|iacute|oacute|uacute|ntilde|Aacute|Eacute|Iacute|Oacute|Uacute|Ntilde|ordf|ordm);/g;
                var translate = {
                    aacute: "á",
                    eacute: "é",
                    iacute: "í",
                    oacute: "ó",
                    uacute: "ú",
                    ntilde: "ñ",
                    Aacute: "Á",
                    Eacute: "É",
                    Iacute: "Í",
                    Oacute: "Ó",
                    Uacute: "Ú",
                    Ntilde: "Ñ",
                    ordf: "ª",
                    ordm: "º"
                };
                return encodedString
                    .replace(translate_re, function (match, entity) {
                        return translate[entity];
                    })
                    .replace(/&#(\d+);/gi, function (match, numStr) {
                        var num = parseInt(numStr, 10);
                        return String.fromCharCode(num);
                    });
            }
        }
    };
</script>

<style scope>
    .timeline-item-inner {
        background: #f7f7f8;
    }
</style>


