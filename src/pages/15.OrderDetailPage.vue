<template>
    <f7-page @page:beforeout="$refs.confirm_sheet.close()">

        <!-- Navbar -->
        <f7-navbar back-link>
            <f7-nav-title>Detalle de orden</f7-nav-title>
            <f7-nav-right>
                <f7-link panel-open="right">
                    <f7-icon material="menu"></f7-icon>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>

        <f7-block>
<p> {{newLicensePlate}}</p>
            <div class="detail">
                <p><strong>Servicio</strong></p>
                <p>{{ note.service_name }}</p>
            </div>

            <!--div class="detail">
                <p><strong>Precio</strong></p>
                <p>125 €</p>
            </div-->

            <f7-row>
                <f7-col>
                    <div class="detail">
                        <p><strong>Fecha</strong></p>
                        <p>{{ note.service_date }}</p>
                    </div>
                </f7-col>
                <f7-col>
                    <div class="detail">
                        <p><strong>Hora</strong></p>
                        <p>{{ note.service_time }}</p>
                    </div>
                </f7-col>
            </f7-row>

            <div class="detail">
                <p><strong>Observaciones</strong></p>
                <p>{{ note.service_comments }}</p>
            </div>

            <div class="detail">
                <p><strong>Cliente</strong></p>
                <p>{{ note.customer_name }}</p>
            </div>

            <div class="detail">
                <p><strong>Proveedor</strong></p>
                <p>{{ note.supplier_name }}</p>
            </div>

            <div class="detail">
                <p><strong>Matrícula</strong></p>
                <p>{{ note.license_plate }}</p>
            </div>

            <div class="detail">
                <p><strong>Conductor</strong></p>
                <p>{{ note.driver_name }}</p>
            </div>

        </f7-block>

        <!-- SUBMIT -->
        <f7-toolbar no-hairline position="bottom" v-if="action !== ''">
            <f7-button large fill raised @click="handleAction">{{ actionLabel }}</f7-button>
        </f7-toolbar>

        <!-- Sheet -->
        <f7-sheet class="sheet" ref="confirm_sheet" @sheet:closed="sheetOpened = false">
            <!-- Scrollable sheet content -->
            <f7-page-content>
                <f7-block style="margin-top: 20px">
                    <h3>Matrícula: <span class="lp">{{ note.license_plate }}</span></h3>
                    <f7-button outline large :href="'/license-plates-list/' + note.supplier_code" sheet-close>Cambiar
                    </f7-button>
                    <br>
                    <f7-button outline large @click="start_order" sheet-close>Confirmar</f7-button>
                    <br>
                    <f7-button outline large sheet-close>Cancelar</f7-button>
                </f7-block>
            </f7-page-content>
        </f7-sheet>

    </f7-page>

</template>

<script>
    import axios from "axios";
    import { WS_PATH } from "../config";
    import { mapGetters } from "vuex";

    export default {
        name: 'OrderDetailPage',
        props: ['note_code'],
        data() {
            return {
                action: '',
                actionLabel: '',
                note: {
                    service_name: '',
                    service_date: '',
                    service_time: '',
                    service_comments: '',
                    customer_name: '',
                    supplier_code: '',
                    supplier_name: '',
                    license_plate: '',
                    driver_name: '',
                }
            }
        },
        computed: {
            ...mapGetters(["getUserName", "getUserPass", 'getLicensePlate']),

            // Si existe una matrícula en el estado reemplaza a la de la nota
            newLicensePlate: function () {
                if (this.getLicensePlate !== 'Seleccionar...') {
                    this.note.license_plate = this.getLicensePlate;
                }
            }
        },
        watch: {

        },
        mounted() {

            // Llamada para obtener los datos de la nota a partir de su código
            // Preloader On
            this.$f7.dialog.preloader("Cargando...");

            // Get schedule
            let bodyFormData = new FormData();
            bodyFormData.set("user", this.getUserName);
            bodyFormData.set("pass", this.getUserPass);
            bodyFormData.set("ipgsbase", localStorage.aytrans_ipgsbase);
            bodyFormData.set("gestgsbase", localStorage.aytrans_gestgsbase);
            bodyFormData.set("aplgsbase", localStorage.aytrans_aplgsbase);
            bodyFormData.set("ejagsbase", localStorage.aytrans_ejagsbase);
            bodyFormData.set("puertogsbase", localStorage.aytrans_puertogsbase);
            //--------------------------------------
            bodyFormData.set("cod_note", this.note_code);

            axios({
                method: "post",
                url: WS_PATH + "get_note.php",
                data: bodyFormData,
                timeout: 15000
            })
                .then(response => {

                    console.log(response)

                    // Preloader Off
                    this.$f7.dialog.close();

                    if (response.data.cod_nota !== 'KO') {

                        let note = JSON.parse(
                            this.decodeEntities(JSON.stringify(response.data))
                        );

                        this.note.service_name = note.txt_service_name;
                        this.note.service_date = note.txt_fecha;
                        this.note.service_time = note.txt_hora;
                        this.note.service_comments = note.txt_observaciones;
                        this.note.customer_name = note.nom_cliente;
                        this.note.supplier_name = note.nom_proveedor;
                        this.note.supplier_code = note.cod_proveedor;
                        this.note.license_plate = note.matricula;
                        this.note.driver_name = note.nom_chofer;

                        if (note.estado === 'AS') {
                            this.action = 'start';
                            this.actionLabel = 'Comenzar';
                        } else if (note.estado === 'ER') {
                            this.action = 'terminate';
                            this.actionLabel = 'Finalizar';
                        }

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
        methods: {
            handleAction() {
                if (this.action === 'start') {
                    this.$refs.confirm_sheet.open();
                } else if (this.action === 'terminate') {
                    this.$f7router.navigate('/delivery-note/' + this.note_code);
                }
            },
            start_order() {
                // Preloader On
                this.$f7.dialog.preloader("Enviando...");

                // Get schedule
                let bodyFormData = new FormData();
                bodyFormData.set("user", this.getUserName);
                bodyFormData.set("pass", this.getUserPass);
                bodyFormData.set("ipgsbase", localStorage.aytrans_ipgsbase);
                bodyFormData.set("gestgsbase", localStorage.aytrans_gestgsbase);
                bodyFormData.set("aplgsbase", localStorage.aytrans_aplgsbase);
                bodyFormData.set("ejagsbase", localStorage.aytrans_ejagsbase);
                bodyFormData.set("puertogsbase", localStorage.aytrans_puertogsbase);
                //--------------------------------------
                bodyFormData.set("cod_nota", this.note_code);
                bodyFormData.set("matricula", '');
                bodyFormData.set("cod_estado", 'ER');

                axios({
                    method: "post",
                    url: WS_PATH + "set_state.php",
                    data: bodyFormData,
                    timeout: 15000
                })
                    .then(response => {

                        console.log(response);

                        // Preloader Off
                        this.$f7.dialog.close();

                        if (response.data.res === 0) {
                            // Reset state
                            this.$store.dispatch("setLicensePlate", 'Seleccionar...');

                            // Mensaje
                            let notification = this.$f7.toast.create({
                                position: 'top',
                                text: "Guardado",
                                cssClass: "success",
                                icon: '<i class="icon material-icons">done</i>',
                                closeTimeout: 2000
                            });
                            notification.open();
                            //
                            setTimeout(() => {
                                this.retrieveData();
                            }, 2000);

                            this.$f7router.navigate('/pending-orders-page')

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
    }
</script>

<style scoped>
    .detail {
        background-color: #d9d9d9;
        padding: 5px 10px;
        margin-bottom: 10px;
    }

    .detail p {
        margin: 5px 0;
    }

    .toolbar .button {
        width: 100%;
    }

    .ios .toolbar {
        height: 64px !important;
    }

    .lp {
        padding-left: 10px;
        color: #107ED6;
    }
</style>