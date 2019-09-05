<template>
    <f7-page>
        <!-- Navbar -->
        <f7-navbar back-link>
            <f7-nav-title>Nuevo Paciente</f7-nav-title>
            <f7-nav-right>
                <f7-link panel-open="right">
                    <f7-icon material="menu"></f7-icon>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>

        <!-- Form -->
        <f7-block inner>
            <f7-list form no-hairlines>
                <f7-list-input
                        label="Nombre y Apellidos"
                        type="text"
                        :value="name"
                        @input="name = $event.target.value"
                ></f7-list-input>
                <f7-list-input
                        label="Teléfono"
                        type="tel"
                        :value="phone"
                        @input="phone = $event.target.value"
                ></f7-list-input>
                <f7-list-input
                        label="Email"
                        type="email"
                        :value="email"
                        @input="email = $event.target.value"
                ></f7-list-input>
            </f7-list>
        </f7-block>

        <!-- Submit -->
        <f7-toolbar no-hairline position="bottom">
            <f7-button large fill raised @click="saveNewPatient">Guardar</f7-button>
        </f7-toolbar>
    </f7-page>
</template>

<script>
    import axios from "axios";
    import {WS_PATH} from "../config";
    import {mapGetters} from "vuex";

    export default {
        name: "NewPatientPage",
        props: ['returnto'],
        data() {
            return {
                name: "",
                phone: "",
                email: ""
            };
        },
        computed: {
            ...mapGetters(["getUserName", "getUserPass"])
        },
        methods: {
            saveNewPatient() {
                // Preloader On
                this.$f7.dialog.preloader("Guardando...");

                let bodyFormData = new FormData();
                bodyFormData.set("user", this.getUserName);
                bodyFormData.set("pass", this.getUserPass);
                bodyFormData.set("ipgsbase", localStorage.ipgsbase);
                bodyFormData.set("puertogsbase", localStorage.puertogsbase);
                bodyFormData.set("gestgsbase", localStorage.gestgsbase);
                bodyFormData.set("ejagsbase", localStorage.ejagsbase);
                bodyFormData.set("nombre", this.name);
                bodyFormData.set("telefono", this.phone);
                bodyFormData.set("email", this.email);

                axios({
                    method: "post",
                    url: WS_PATH + "set_new_patient.php",
                    data: bodyFormData,
                    timeout: 15000
                })
                    .then(response => {
                        //console.log(response);
                        // Preloader Off
                        this.$f7.dialog.close();

                        if (response.data.res === true) {
                            // Recuperar la lista de pacientes modificada
                            this.fetchPatientsList();

                            // Insertar el nuevo paciente en el estado
                            this.$store.dispatch("setPatient", [
                                response.data.cod_paciente,
                                response.data.nombre,
                                response.data.telefono
                            ]);

                            let notification = this.$f7.toast.create({
                                position: "top",
                                text: "Nuevo paciente guardado",
                                cssClass: "success",
                                icon: '<i class="icon material-icons">done</i>',
                                closeTimeout: 2000
                            });
                            notification.open();

                            // Navigate
                            setTimeout(() => {
                                if (this.returnto !== undefined) {
                                    this.$f7router.navigate('/' + this.returnto);
                                } else {
                                    this.$f7router.navigate("/home");
                                }
                            }, 2000);
                        } else {
                            this.$f7.dialog.alert('No ha sido posible guardar', "Error");
                        }
                    })
                    .catch(error => {
                        //console.log(error);
                        // Preloader Off
                        this.$f7.dialog.close();
                        this.$f7.dialog.alert("No se ha podido conectar", "Error");
                    });
            },
            fetchPatientsList() {
                let bodyFormData = new FormData();
                bodyFormData.set("user", this.getUserName);
                bodyFormData.set("pass", this.getUserPass);
                bodyFormData.set("ipgsbase", localStorage.ipgsbase);
                bodyFormData.set("puertogsbase", localStorage.puertogsbase);
                bodyFormData.set("gestgsbase", localStorage.gestgsbase);
                bodyFormData.set("ejagsbase", localStorage.ejagsbase);

                axios({
                    method: "post",
                    url: WS_PATH + "get_pacientes.php",
                    data: bodyFormData,
                    timeout: 15000
                })
                    .then(response => {

                        if (response.data.usuario_valido === "ok") {
                            let patients = JSON.parse(
                                this.decodeEntities(JSON.stringify(response.data.pacientes))
                            );
                            this.$store.dispatch('setPatientsList', patients);
                        } else {
                            this.$f7.dialog.alert("gsBase ha respondido KO", "Error");
                        }
                    })
                    .catch(error => {
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
            },
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


