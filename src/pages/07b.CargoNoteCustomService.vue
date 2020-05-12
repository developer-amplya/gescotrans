<template>
    <f7-page>

        <!-- Navbar -->
        <f7-navbar back-link>
            <f7-nav-title back-link-force back-link-url="/home">Nota de carga</f7-nav-title>
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
                                :value="service_name"
                                @input="service_name = $event.target.value"
                        ></f7-input>
                    </div>
                </f7-row>

                <f7-row>
                    <div class="custom-input">
                        <div class="item-title item-label">Precio</div>
                        <f7-input
                                type="number"
                                :value="price"
                                @input="price = $event.target.value"
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
                                :value="time"
                                readonly="readonly"
                                id="picker-time"
                                @change="time = $event.target.value"
                        ></f7-input>
                    </div>
                </f7-row>

                <f7-row>
                    <div class="custom-input">
                        <div class="item-title item-label">Observaciones</div>
                        <f7-input
                                type="textarea"
                                :value="comments"
                                @input="comments = $event.target.value"
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
                    <p><strong>{{ getCustomer[1] }}</strong>
                    </p>
                    <p>
                        <f7-icon slot="media" material="phone" size="18px"></f7-icon>
                        <small><em>{{ getCustomer[2] }}</em></small>
                    </p>
                </div>
            </f7-card>

            <f7-card outline>
                <div @click="selectSupplier">
                    <h3>
                        <f7-icon material="assignment_ind" size="28px"></f7-icon>&nbsp;&nbsp;Proveedor
                    </h3>
                    <p><strong>{{ getSupplier[1] }}</strong>
                    </p>
                    <p>
                        <f7-icon slot="media" material="phone" size="18px"></f7-icon>
                        <small><em>{{ getSupplier[2] }}</em></small>
                    </p>
                </div>
            </f7-card>

            <f7-card v-if="getSupplier[0] !== ''" outline>
                <div @click="selectLicensePlate">
                    <h3>
                        <f7-icon material="local_shipping" size="28px"></f7-icon>&nbsp;&nbsp;Matrícula
                    </h3>
                    <p><strong>{{ getLicensePlate }}</strong>
                    </p>
                </div>
            </f7-card>

            <f7-card v-if="getSupplier[0] !== ''" outline>
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
            <f7-button large fill raised @click="createNote">Crear</f7-button>
        </f7-toolbar>

    </f7-page>
</template>

<script>
    import axios from "axios";
    import { WS_PATH } from "../config";
    import { mapGetters } from "vuex";

    export default {
        name: "CargoNoteSelectService",
        data() {
            return {
                service_name: '',
                price: 0,
                hour: null,
                minute: null,
                time: '',
                comments: '',
            };
        },
        computed: {
            ...mapGetters(["getCustomer", "getSupplier", 'getCargoNoteDate', 'getLicensePlate', 'getDriver'])
        },
        mounted() {
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
                        this.time = picker.value[0] + ':' + picker.value[1];
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
                    this.price === 0 ||
                    this.time === 'Hora'
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
                bodyFormData.set("cod_servicio", '000000'); // Código maestro
                bodyFormData.set("cod_proveedor", this.getSupplier[0]);
                bodyFormData.set("txt_matricula", this.getLicensePlate);
                bodyFormData.set("cod_chofer", this.getDriver[0]);
                bodyFormData.set("txt_fecha", this.getCargoNoteDate);
                bodyFormData.set("txt_hora", this.time);
                bodyFormData.set("txt_observaciones", this.comments);
                bodyFormData.set("txt_precio", this.price);
                bodyFormData.set("txt_service_name", this.service_name);

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

                        if (response.data.res === 0) {

                            // Reset store
                            this.$store.dispatch("setCustomer", ['', 'Seleccionar...']);
                            this.$store.dispatch("setService", ['', 'Seleccionar...']);
                            this.$store.dispatch("setSupplier", ['', 'Seleccionar...']);
                            this.$store.dispatch("setCargoNoteDate", null);

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