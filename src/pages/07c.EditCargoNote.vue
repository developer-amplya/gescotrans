<template>
    <f7-page>

        <!-- Navbar -->
        <f7-navbar back-link>
            <f7-nav-title back-link-force back-link-url="/home">Editar nota de carga</f7-nav-title>
            <f7-nav-right>
                <f7-link panel-open="right">
                    <f7-icon material="menu"></f7-icon>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>

        <f7-block>

            <f7-card outline>
                <h3>
                    <f7-icon material="assignment" size="28px"></f7-icon>&nbsp;&nbsp;Servicio
                </h3>

                <f7-row>
                    <div class="custom-input">
                        <div class="item-title item-label">Nombre</div>
                        <f7-input
                                type="text"
                                :value="note.service_name"
                                @input="note.service_name = $event.target.value"
                        ></f7-input>
                    </div>
                </f7-row>

                <f7-row>
                    <div class="custom-input">
                        <div class="item-title item-label">Precio</div>
                        <f7-input
                                type="number"
                                :value="note.service_price"
                                @input="note.service_price = $event.target.value"
                        ></f7-input>
                    </div>
                </f7-row>

                <f7-row>
                    <div class="custom-input"
                         @click="gotoCalendar">
                        <div class="item-title item-label">Fecha</div>
                        <f7-input
                                type="text"
                                readonly
                                :value="getCargoNoteDate"
                        ></f7-input>
                    </div>
                </f7-row>

                <f7-row>
                    <div class="custom-input">
                        <div class="item-title item-label">Hora</div>
                        <f7-input
                                type="text"
                                :value="note.service_time"
                                readonly="readonly"
                                id="picker-time"
                                @change="note.service_time = $event.target.value"
                        ></f7-input>
                    </div>
                </f7-row>

                <f7-row>
                    <div class="custom-input">
                        <div class="item-title item-label">Observaciones</div>
                        <f7-input
                                type="textarea"
                                :value="note.service_comments"
                                @input="note.service_comments = $event.target.value"
                                resizable
                        ></f7-input>
                    </div>
                </f7-row>
            </f7-card>

            <f7-card outline>
                <div @click="selectCustomer">
                    <h3>
                        <f7-icon material="assignment_ind" size="28px"></f7-icon>&nbsp;&nbsp;Cliente
                    </h3>
                    <p><strong>{{ getCustomer[1] }}</strong></p>
                </div>
            </f7-card>

            <f7-card outline>
                <div @click="selectSupplier">
                    <h3>
                        <f7-icon material="assignment_ind" size="28px"></f7-icon>&nbsp;&nbsp;Proveedor
                    </h3>
                    <p><strong>{{ getSupplier[1] }}</strong></p>
                </div>
            </f7-card>

            <f7-card outline>
                <div @click="selectLicensePlate">
                    <h3>
                        <f7-icon material="local_shipping" size="28px"></f7-icon>&nbsp;&nbsp;Matrícula
                    </h3>
                    <p><strong>{{ getLicensePlate }}</strong>
                    </p>
                </div>
            </f7-card>

            <f7-card outline>
                <div @click="selectDriver">
                    <h3>
                        <f7-icon material="local_shipping" size="28px"></f7-icon>&nbsp;&nbsp;Conductor
                    </h3>
                    <p><strong>{{ getDriver[1] }}</strong>
                    </p>
                </div>
            </f7-card>

        </f7-block>

        <!-- Submit -->
        <f7-toolbar no-hairline position="bottom">
            <f7-button large fill raised @click="createNote">Modificar</f7-button>
        </f7-toolbar>

    </f7-page>
</template>

<script>
    import axios from "axios";
    import { WS_PATH } from "../config";
    import { mapGetters } from "vuex";

    export default {
        name: "EditCargoNote",
        props: ['code'],
        data() {
            return {
                hour: null,
                minute: null,
                note: { // HARDCODED
                    note_code: '014312',
                    service_name: 'Servicio libre',
                    service_code: '000059',
                    service_price: '180.00',
                    service_date: '12/05/2020',
                    service_time: '16:45',
                    service_comments: 'Llamar por teléfono, el timbre no funciona',
                    customer_code: '00182',
                    customer_name: 'Regesvinto',
                    supplier_code: '00000',
                    supplier_name: 'Vecigentorix',
                    license_plate: '1479KHZ',
                    driver_code: '05',
                    driver_name: 'Ataulfo',
                }
            };
        },
        computed: {
            ...mapGetters(["getUserName", "getUserPass", "getCustomer", "getSupplier", 'getCargoNoteDate', 'getLicensePlate', 'getDriver'])
        },
        mounted() {

            // TODO: llamada para obtener los datos de la nota a partir de su código

            this.$store.dispatch("setCargoNoteDate", this.note.service_date);
            this.$store.dispatch("setCustomer", [this.note.customer_code, this.note.customer_name, '']); // TODO: retrieve name, and phone?
            this.$store.dispatch("setSupplier", [this.note.supplier_code, this.note.supplier_name, '']); // TODO: retrieve name, and phone?
            this.$store.dispatch("setLicensePlate", this.note.license_plate);
            this.$store.dispatch("setDriver", [this.note.driver_code, this.note.driver_name]); // TODO: retrieve name

            var picker = this.$f7.picker.create({
                inputEl: "#picker-time",
                rotateEffect: true,
                scrollToInput: true,
                momentumRatio: 14,
                toolbar: true,
                toolbarCloseText: "Hecho",
                formatValue: function (values, displayValues) {
                    return values[0] + ":" + values[1];
                },
                cols: [
                    {
                        values: "00 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23".split(" ")
                    },
                    {
                        divider: true,
                        content: ":"
                    },
                    {
                        values: "00 05 10 15 20 25 30 35 40 45 50 55".split(" ")
                    }
                ],
                on: {
                    change: (picker) => {
                        this.note.service_time = picker.value[0] + ':' + picker.value[1];
                    }
                }
            });
        },
        methods: {

            selectCustomer() {
                this.$f7router.navigate("/customers-list");
            },
            selectSupplier() {
                this.$f7router.navigate("/suppliers-list");
            },
            selectLicensePlate() {
                let supplier = this.getSupplier[0];
                this.$f7router.navigate("/license-plates-list/" + supplier);
            },
            selectDriver() {
                let supplier = this.getSupplier[0];
                this.$f7router.navigate("/drivers-list/" + supplier);
            },
            gotoCalendar() {
                this.$f7router.navigate("/calendar");
            },
            createNote() {

                if (
                    this.getCustomer[0] === '' ||
                    this.getSupplier[0] === '' ||
                    this.getCargoNoteDate === null ||
                    this.service_name === '' ||
                    this.service_price === 0
                ) {
                    this.$f7.dialog.alert("Debe completar todos los datos", "Atención");
                    return;
                }

                // Preloader On
                this.$f7.dialog.preloader("Guardando...");

                // Set data
                let bodyFormData = new FormData();
                bodyFormData.set("user", this.getUserName);
                bodyFormData.set("pass", this.getUserPass);
                bodyFormData.set("ipgsbase", localStorage.aytrans_ipgsbase);
                bodyFormData.set("gestgsbase", localStorage.aytrans_gestgsbase);
                bodyFormData.set("aplgsbase", localStorage.aytrans_aplgsbase);
                bodyFormData.set("ejagsbase", localStorage.aytrans_ejagsbase);
                bodyFormData.set("puertogsbase", localStorage.aytrans_puertogsbase);
                //--------------------------------------
                bodyFormData.set("cod_cliente", this.getCustomer[0]);
                bodyFormData.set("cod_servicio", this.note.service_code);
                bodyFormData.set("cod_proveedor", this.getSupplier[0]);
                bodyFormData.set("matricula", this.getLicensePlate);
                bodyFormData.set("cod_chofer", this.getDriver[0]);
                bodyFormData.set("txt_fecha", this.getCargoNoteDate);
                bodyFormData.set("txt_hora", this.note.service_time);
                bodyFormData.set("txt_observaciones", this.note.service_comments);
                bodyFormData.set("txt_precio", this.note.service_price);
                bodyFormData.set("txt_service_name", this.note.service_name);

                axios({
                    method: "post",
                    url: WS_PATH + "nueva_nota.php",
                    data: bodyFormData,
                    timeout: 15000
                })
                    .then(response => {

                        console.log(response);

                        // Preloader Off
                        this.$f7.dialog.close();

                        if (response.data.cod_nota !== 'KO') {

                            // Reset store
                            this.$store.dispatch("setCustomer", ['', 'Seleccionar...']);
                            this.$store.dispatch("setService", ['', 'Seleccionar...']);
                            this.$store.dispatch("setSupplier", ['', 'Seleccionar...']);
                            this.$store.dispatch("setCargoNoteDate", null);
                            this.$store.dispatch("setLicensePlate", 'Seleccionar...');
                            this.$store.dispatch("setDriver", ['', 'Seleccionar...']);

                            // Show notification
                            let notification = this.$f7.toast.create({
                                position: 'top',
                                text: "Guardado",
                                cssClass: "success",
                                icon: '<i class="icon material-icons">done</i>',
                                closeTimeout: 2000
                            });
                            notification.open();

                            // Wait 2 seconds and go home
                            setTimeout(() => {
                                this.$f7router.back();
                            }, 2000);

                        } else {

                            this.$f7.dialog.alert(response.data.error, "Error");
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        // Preloader Off
                        this.$f7.dialog.close();
                        this.$f7.dialog.alert("No se ha podido conectar", "Error");
                    });
            }
        }
    }
</script>

<style>
    .custom-input {
        background-color: #eeeeee;
        border: 1px solid #b9b9b9;
        border-radius: 5px;
        margin: 6px;
        padding: 4px;
        width: 100%;
    }

    .custom-input .input-with-value {
        font-weight: bold !important;
    }

    .toolbar .button {
        width: 100%;
    }

    .ios .toolbar {
        height: 64px !important;
    }
</style>