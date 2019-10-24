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

        <f7-page-content>
            <f7-block>

                <f7-card outline>
                    <div @click="selectService">
                        <h3>
                            <f7-icon material="assignment" size="28px"></f7-icon>&nbsp;&nbsp;Servicio
                        </h3>
                        <p><strong>{{ getService[1] }}</strong>
                        </p>
                    </div>

                    <f7-row>
                        <f7-col>
                            <div class="custom-input"
                                 @click="gotoCalendar">
                                <f7-input
                                        type="text"
                                        placeholder="Fecha"
                                        readonly
                                        :value="getCargoNoteDate"
                                ></f7-input>
                            </div>
                        </f7-col>
                        <f7-col>
                            <div class="custom-input">
                                <f7-input
                                        type="time"
                                        :value="time"
                                ></f7-input>
                            </div>
                        </f7-col>
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

            </f7-block>
        </f7-page-content>

        <!-- Submit -->
        <f7-toolbar no-hairline position="bottom">
            <f7-button large fill raised @click="createNote">Crear</f7-button>
        </f7-toolbar>

    </f7-page>
</template>

<script>
    import axios from "axios";
    import {WS_PATH} from "../config";
    import {mapGetters} from "vuex";

    export default {
        name: "CargoNote",
        data() {
            return {
                time: '14:30',
            };
        },
        computed: {
            ...mapGetters(["getCustomer", "getService", "getSupplier", 'getCargoNoteDate'])
        },
        methods: {

            selectCustomer() {
                this.$f7router.navigate("/customers-list");
            },
            selectService() {
                this.$f7router.navigate("/services-list");
            },
            selectSupplier() {
                this.$f7router.navigate("/suppliers-list");
            },
            gotoCalendar() {console.log('test')
                this.$f7router.navigate("/calendar");
            },
            createNote() {

                if (
                    this.getCustomer[0] === '' ||
                    this.getService[0] === '' ||
                    this.getSupplier[0] === '' ||
                    this.date === null ||
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
                bodyFormData.set("cod_chofer", this.getUserCode);
                bodyFormData.set("ipgsbase", localStorage.aytrans_ipgsbase);
                bodyFormData.set("gestgsbase", localStorage.aytrans_gestgsbase);
                bodyFormData.set("aplgsbase", localStorage.aytrans_aplgsbase);
                bodyFormData.set("ejagsbase", localStorage.aytrans_ejagsbase);
                bodyFormData.set("puertogsbase", localStorage.aytrans_puertogsbase);
                //--------------------------------------
                bodyFormData.set("cod_cliente", this.getCustomer[0]);
                bodyFormData.set("cod_servicio", this.getService[0]);
                bodyFormData.set("cod_proveedor", this.getSupplier[0]);
                bodyFormData.set("txt_fecha", this.getCargoNoteDate);
                bodyFormData.set("txt_hora", this.time);

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
                                this.$f7router.navigate("/home");
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

<style scoped>
    .custom-input {
        background-color: #d9d9d9;
        border: 1px solid #b9b9b9;
        border-radius: 5px;
        margin: 6px;
        padding: 4px;
    }
</style>