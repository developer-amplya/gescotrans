<template>
    <f7-page>
        <!-- Navbar -->
        <f7-navbar back-link>
            <f7-nav-title>Citas disponibles</f7-nav-title>
            <f7-nav-right>
                <f7-link panel-open="right">
                    <f7-icon material="menu"></f7-icon>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>

        <f7-list no-hairlines>
            <f7-list-group>
                <f7-list-item :title="slots[0]" group-title></f7-list-item>
                <f7-list-item
                        radio
                        name="selected_slot"
                        v-for="(slot, key, index) in slots[1]"
                        :key="index"
                        :title="slot[0]"
                        :after="slot[1]"
                        @click="setTime(slot[0], slot[1])"
                ></f7-list-item>
            </f7-list-group>
        </f7-list>

        <!-- SUBMIT -->
        <f7-toolbar no-hairline position="bottom">
            <f7-button text="Aceptar" @click="confirm" fill large raised></f7-button>
        </f7-toolbar>
    </f7-page>
</template>

<script>
    import axios from "axios";
    import {WS_PATH} from "../config";
    import {mapGetters} from "vuex";

    export default {
        name: "AvailabilityPage",
        data() {
            return {
                slots: {}
            };
        },
        computed: {
            ...mapGetters(['getAvailability', 'getDate', 'getTimeSlot', 'getDoctor', 'getDoctors', 'getSpecialty'])
        },
        mounted() {
            let slotsString = JSON.parse(
                this.decodeEntities(JSON.stringify(this.getAvailability[this.getDate]))
            );
            this.slots = slotsString;
        },
        methods: {
            setTime(time, second_param) {
                // Establecer la hora
                this.$store.dispatch("setTimeSlot", time);

                // Se sustituye el doctor en el  estado por el facilitado en este componente,
                // pero sólo si second_param coincide con el nombre de un doctor de la especialidad,
                // lo que significa que anteriormente se escogió CUALQUIERA doctor
                Object.keys(this.getDoctors).forEach((item) => {
                    if (this.getDoctors[item][0] === this.getSpecialty[1]) {
                        let doctors = this.getDoctors[item][1];
                        doctors.forEach((item) => {
                            if (item[1] === second_param) {
                                this.$store.dispatch("setDoctor", [item[0], item[1]]);
                            }
                        });
                    }
                });
            },
            confirm() {
                if (this.getTimeSlot === "") {
                    this.$f7.dialog.alert("Debe seleccionar una hora", "Atención");
                } else {
                    this.$f7router.navigate("/confirm-appointment");
                }
            },
            decodeEntities(encodedString) {
                var translate_re = /&(aacute|eacute|iacute|oacute|uacute|ntilde|Aacute|Eacute|Iacute|Oacute|Uacute|Ntilde|ordm|ordf);/g;
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
                    ordm: "º",
                    ordf: "ª"
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

<style scoped>
    .toolbar .button {
        width: 100%;
    }

    .ios .toolbar {
        height: 64px !important;
    }
</style>


