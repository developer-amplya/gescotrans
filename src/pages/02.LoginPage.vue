<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-title>Acceso</f7-nav-title>
            <f7-nav-right>
                <f7-link icon-f7="gear" href="/settings"></f7-link>
            </f7-nav-right>
        </f7-navbar>

        <f7-block inner>
            <f7-list form no-hairlines>
                <!-- USUARIO -->
                <f7-list-input
                        type="text"
                        label="Usuario"
                        :value="log_in.user"
                        @input="log_in.user = $event.target.value"
                ></f7-list-input>

                <!-- PASSWORD -->
                <f7-list-input
                        type="password"
                        label="Contraseña"
                        :value="log_in.password"
                        @input="log_in.password = $event.target.value"
                ></f7-list-input>

                <f7-list-item>
                    <label>Guardar datos</label>
                    <f7-toggle @toggleChange="toggleStoreUserData" ref="toggle_user_data"></f7-toggle>
                </f7-list-item>

            </f7-list>
        </f7-block>

        <!-- SUBMIT -->
        <f7-toolbar no-hairline position="bottom">
            <f7-button large fill raised @click="do_login">Acceder</f7-button>
        </f7-toolbar>
    </f7-page>
</template>

<script>
    import axios from "axios";
    import {WS_PATH} from "../config";

    export default {
        name: "LoginPage",
        data() {
            return {
                log_in: {
                    user: "prueba",
                    password: "1234"
                }
            };
        },
        mounted() {

            // Se resetea store
            if (this.action === 'logout') {
                this.resetStore();
            }

            // Se recuperan los datos de acceso guardados
            if (localStorage.aytrans_uname !== undefined) {
                this.log_in.user = localStorage.aytrans_uname;
            }

            if (localStorage.aytrans_upass !== undefined) {
                this.log_in.password = localStorage.aytrans_upass;
            }

            if (localStorage.aytrans_ustore === "true") {
                this.$refs.toggle_user_data.toggle();
            }

        },
        methods: {
            toggleStoreUserData(e) {
                if (e === true) {
                    localStorage.aytrans_uname = this.log_in.user;
                    localStorage.aytrans_upass = this.log_in.password;
                    localStorage.aytrans_ustore = "true";
                } else {
                    localStorage.aytrans_uname = "";
                    localStorage.aytrans_upass = "";
                    localStorage.aytrans_ustore = false;
                }
            },
            do_login() {
                // Preloader On
                this.$f7.dialog.preloader("Accediendo...");

                let bodyFormData = new FormData();
                bodyFormData.set("user", this.log_in.user);
                bodyFormData.set("pass", this.log_in.password);
                bodyFormData.set("ipgsbase", localStorage.aytrans_ipgsbase);
                bodyFormData.set("gestgsbase", localStorage.aytrans_gestgsbase);
                bodyFormData.set("aplgsbase", localStorage.aytrans_aplgsbase);
                bodyFormData.set("ejagsbase", localStorage.aytrans_ejagsbase);
                bodyFormData.set("puertogsbase", localStorage.aytrans_puertogsbase);

                axios({
                    method: "post",
                    url: WS_PATH + "login.php",
                    data: bodyFormData,
                    timeout: 15000
                })
                    .then(response => {

                        // console.log(response);

                        // Preloader Off
                        this.$f7.dialog.close();

                        if (response.data.usuario_valido === "ok") {
                            let load_states = JSON.parse(
                                this.decodeEntities(JSON.stringify(response.data.ls_estados_carga))
                            );

                            // Set state
                            this.$store.dispatch("setUserName", this.log_in.user);
                            this.$store.dispatch("setUserPass", this.log_in.password);
                            this.$store.dispatch("setUserCode", response.data.codigo_usuario);
                            this.$store.dispatch("setLoadStates", load_states);

                            // Retrieve master data
                            this.fetchMasterData(); //TODO: Si falla la carga de datos, ¿se debe permitir el acceso?

                            // Navigate
                            this.$f7router.navigate("/home");
                        } else {
                            this.$f7.dialog.alert("No se ha podido conectar. Usuario no válido.", "Error");
                        }
                    })
                    .catch(error => {
                        //console.log(error);
                        // Preloader Off
                        this.$f7.dialog.close();
                        this.$f7.dialog.alert("No se ha podido conectar", "Error");
                    });
            },
            fetchMasterData() {
                // Preloader On
                this.$f7.dialog.preloader("Cargando...");

                let bodyFormData = new FormData();
                bodyFormData.set("user", this.log_in.user);
                bodyFormData.set("pass", this.log_in.password);
                bodyFormData.set("ipgsbase", localStorage.aytrans_ipgsbase);
                bodyFormData.set("gestgsbase", localStorage.aytrans_gestgsbase);
                bodyFormData.set("aplgsbase", localStorage.aytrans_aplgsbase);
                bodyFormData.set("ejagsbase", localStorage.aytrans_ejagsbase);
                bodyFormData.set("puertogsbase", localStorage.aytrans_puertogsbase);

                axios({
                    method: "post",
                    url: WS_PATH + "get_datos_maestros.php",
                    data: bodyFormData,
                    timeout: 15000
                })
                    .then(response => {

                        console.log(response);

                        // Preloader Off
                        this.$f7.dialog.close();

                        if (response.data.res === 0) {

                            // Customers
                            let customers = JSON.parse(
                                this.decodeEntities(JSON.stringify(response.data.clientes))
                            );
                            this.$store.dispatch('setCustomersList', customers);

                            // Suppliers
                            let suppliers = JSON.parse(
                                this.decodeEntities(JSON.stringify(response.data.proveedores))
                            );
                            this.$store.dispatch('setSuppliersList', suppliers);

                            // Services
                            let services = JSON.parse(
                                this.decodeEntities(JSON.stringify(response.data.servicios))
                            );
                            this.$store.dispatch('setServicesList', services);

                        } else {
                            this.$f7.dialog.alert("No se han podido recuperar los datos", "Error");
                        }
                    })
                    .catch(error => {
                        //console.log(error);
                        // Preloader Off
                        this.$f7.dialog.close();
                        this.$f7.dialog.alert("No se ha podido conectar", "Error");
                    });
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