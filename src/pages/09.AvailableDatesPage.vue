<template>
    <f7-page>
        <!-- Navbar -->
        <f7-navbar back-link>
            <f7-nav-title>Días disponibles</f7-nav-title>
            <f7-nav-right>
                <f7-link panel-open="right">
                    <f7-icon material="menu"></f7-icon>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>

        <f7-card outline>
            <h3>
                <f7-icon material="alarm" size="28px"></f7-icon>&nbsp;&nbsp;Horario
            </h3>
            <f7-row>
                <f7-col>
                    <div>
                        <label for="picker-from">DESDE</label>
                        <input
                                type="text"
                                :value="time.from"
                                readonly="readonly"
                                id="picker-from"
                                @change="time.from = $event.target.value"
                        >
                    </div>
                </f7-col>
                <f7-col>
                    <div>
                        <label for="picker-to">HASTA</label>
                        <input
                                type="text"
                                :value="time.to"
                                readonly="readonly"
                                id="picker-to"
                                @change="time.to = $event.target.value"
                        >
                    </div>
                </f7-col>
                <f7-col>
                    <f7-button fill @click="refreshAvailability">
                        <f7-icon material="refresh"></f7-icon>
                    </f7-button>
                </f7-col>
            </f7-row>
            <br>
        </f7-card>

        <div class="block block-strong no-padding">
            <div id="availability-calendar-inline-container" ref="availabilityCalendarInlineContainer"></div>
        </div>
    </f7-page>
</template>

<script>
    import axios from "axios";
    import {WS_PATH} from "../config";
    import {mapGetters} from "vuex";

    export default {
        name: "AvailableDatesPage",

        data() {
            return {
                notAvailableDates: [],
                date: "",
                time: {
                    from: "00:00",
                    to: "23:55"
                }
            };
        },
        computed: {
            ...mapGetters([
                "getDate",
                "getUserName",
                "getUserPass",
                "getDoctor",
                "getSpecialty",
                "getReason",
                "getTimeRange"
            ])
        },
        mounted() {
            this.$store.dispatch("setTimeRange", [this.time.from, this.time.to]);

            this.getAvailability();

            /* *********************************************************************** */

            var picker = this.$f7.picker.create({
                inputEl: "#picker-from",
                rotateEffect: true,
                scrollToInput: true,
                momentumRatio: 14,
                toolbarCloseText: "Hecho",
                formatValue: function (values, displayValues) {
                    return values[0] + ":" + values[1];
                },
                cols: [
                    {
                        textAlign: "left",
                        values: "00 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23".split(
                            " "
                        )
                    },
                    {
                        values: "00 05 10 15 20 25 30 35 40 45 50 55".split(" ")
                    }
                ]
            });

            var picker = this.$f7.picker.create({
                inputEl: "#picker-to",
                rotateEffect: true,
                scrollToInput: true,
                momentumRatio: 14,
                toolbarCloseText: "Hecho",
                formatValue: function (values, displayValues) {
                    return values[0] + ":" + values[1];
                },
                cols: [
                    {
                        textAlign: "left",
                        values: "00 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23".split(
                            " "
                        )
                    },
                    {
                        divider: true,
                        content: ":"
                    },
                    {
                        values: "00 05 10 15 20 25 30 35 40 45 50 55".split(" ")
                    }
                ]
            });
        },
        methods: {
            getAvailability() {
                // Preloader On
                this.$f7.dialog.preloader("Cargando...");

                let bodyFormData = new FormData();
                bodyFormData.set("user", this.getUserName);
                bodyFormData.set("pass", this.getUserPass);
                bodyFormData.set("ipgsbase", localStorage.ipgsbase);
                bodyFormData.set("puertogsbase", localStorage.puertogsbase);
                bodyFormData.set("gestgsbase", localStorage.gestgsbase);
                bodyFormData.set("ejagsbase", localStorage.ejagsbase);
                bodyFormData.set("cod_doctor", this.getDoctor[0]);
                bodyFormData.set("cod_motivo", this.getReason[0]);
                bodyFormData.set("cod_especialidad", this.getSpecialty[0]);
                bodyFormData.set("hora_inicio", this.getTimeRange[0]);
                bodyFormData.set("hora_fin", this.getTimeRange[1]);

                axios({
                    method: "post",
                    url: WS_PATH + "get_citas_disponibles.php",
                    data: bodyFormData,
                    timeout: 15000
                })
                    .then(response => {
                        // Preloader Off
                        this.$f7.dialog.close();

                        if (response.data) {
                            //console.log(response.data);

                            let availability = JSON.parse(
                                this.decodeEntities(JSON.stringify(response.data.disponibilidad))
                            );
                            this.$store.dispatch(
                                "setAvailability",
                                availability
                            );

                            this.notAvailableDates=response.data.fechas_no_disponibles;

                            this.setCalendar();

                            //
                            this.disableDatesForIOS();
                        } else {
                            this.$f7.dialog.alert("No ha sido posible obtener las fechas", "Error");
                        }
                    })
                    .catch(error => {
                        //console.log(error);
                        // Preloader Off
                        this.$f7.dialog.close();
                        this.$f7.dialog.alert("No se ha podido conectar", "Error");
                    });
            },
            refreshAvailability() {
                this.$store.dispatch("setTimeRange", [this.time.from, this.time.to]);
                this.$refs.availabilityCalendarInlineContainer.innerHTML = "";
                this.getAvailability();
            },
            setCalendar() {
                var availabilityCalendar = this.$f7.calendar.create({
                    containerEl: "#availability-calendar-inline-container",
                    dateFormat: "dd-mm-yyyy",
                    monthNames: [
                        "Enero",
                        "Febrero",
                        "Marzo",
                        "Abril",
                        "Mayo",
                        "Junio",
                        "Julio",
                        "Agosto",
                        "Septiembre",
                        "Octubre",
                        "Noviembre",
                        "Diciembre"
                    ],
                    dayNamesShort: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
                    disabled: this.notAvailableDates,
                    on: {
                        change: () => {
                            let rawDate = new Date(availabilityCalendar.getValue());
                            let dd = String(rawDate.getDate()); //.padStart(2, "0");
                            let mm = String(rawDate.getMonth() + 1); // .padStart(2, "0"); // January is 0!
                            let yyyy = rawDate.getFullYear();
                            this.$store.dispatch("setDate", yyyy + "," + mm + "," + dd);
                            // Redirect
                            this.$f7router.navigate("/check-availability");
                        },
                        monthAdd: () => this.disableDatesForIOS()
                    }
                });
            },
            decodeEntities(encodedString) {
                var translate_re = /&(aacute|eacute|iacute|oacute|uacute|ntilde|Aacute|Eacute|Iacute|Oacute|Uacute|Ntilde);/g;
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
                    Ntilde: "Ñ"
                };
                return encodedString
                    .replace(translate_re, function (match, entity) {
                        return translate[entity];
                    })
                    .replace(/&#(\d+);/gi, function (match, numStr) {
                        var num = parseInt(numStr, 10);
                        return String.fromCharCode(num);
                    });
            },
            disableDatesForIOS() {
                this.notAvailableDates.forEach((element) => {
                    let elementArray = element.split(',');
                    elementArray[1] = elementArray[1] - 1;
                    let elementNewString = elementArray.join('-'); //console.log(elementNewString)
                    //const children = this.$el.querySelector('.calendar-day[data-date="' + elementNewString + '"]');
                    //children.className += ' calendar-day-today'
                    let children = this.$$('.calendar-day[data-date="' + elementNewString + '"]');
                    children.addClass('calendar-day-disabled')
                    //console.log(children)
                })
            }
        }
    };
</script>

<style scoped>
    .block {
        margin-top: 0px;
    }

    .button {
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
    }

    .col > div {
        overflow: hidden;
        padding: 0 15px;
    }

    input {
        width: 100% !important;
        font-size: 18px !important;
        font-weight: bold !important;
        color: #666666 !important;
    }

    .disabled {
        color: #d4d4d4;
    }

    .toolbar-top {
        top: 0;
    }
</style>


