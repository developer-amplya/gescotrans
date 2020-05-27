<template>
    <f7-page>

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
        <f7-toolbar no-hairline position="bottom">
            <f7-button large fill raised @click="">Acción</f7-button>
        </f7-toolbar>

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
                note: {
                    service_name: '',
                    service_date: '',
                    service_time: '',
                    service_comments: '',
                    customer_name: '',
                    supplier_name: '',
                    license_plate: '',
                    driver_name: '',
                }
            }
        },
        computed: {
            ...mapGetters(["getUserName", "getUserPass"])
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
                        this.note.license_plate = note.matricula;
                        this.note.driver_name = note.nom_chofer;

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
</style>