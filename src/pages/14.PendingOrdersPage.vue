<template>
    <f7-page @page:afterin="retrieveData">

        <f7-navbar back-link="Volver">
            <f7-nav-title>
                <span>Comenzar orden</span>
            </f7-nav-title>
            <f7-nav-right>
                <f7-link panel-open="right">
                    <f7-icon material="menu"></f7-icon>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>

        <f7-block>

            <h4 style="color: #6d6d6d;">{{ orders[0] }}</h4>

            <!-- Orders -->
            <orders-list :orders="orders[1]" state="AS"></orders-list>

            <!--p v-if="orders.length" class="no-orders">NO HAY ÓRDENES PENDIENTES</p-->

            <br>
            <br>

        </f7-block>

    </f7-page>
</template>

<script>
    import axios from "axios";
    import { WS_PATH } from "../config";
    import { mapGetters } from "vuex";
    import OrdersList from '../layout/OrdersList.vue';

    export default {
        name: 'PendingOrdersPage',
        components: {
            OrdersList,
        },
        data() {
            return {
                today: '',
                orders: []
            };
        },
        computed: {
            ...mapGetters(["getUserName", "getUserPass", "getUserCode", "getSchedule", "getLoadStates", "getUserRole"])
        },
        mounted() {
            const d = new Date()
            const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
            const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
            const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)

            this.today = `${ye}-${mo}-${da}`;
        },
        methods: {
            retrieveData() {
                // Preloader On
                this.$f7.dialog.preloader("Cargando...");

                // Get schedule
                let bodyFormData = new FormData();
                bodyFormData.set("user", this.getUserName);
                bodyFormData.set("pass", this.getUserPass);
                bodyFormData.set("cod_chofer", this.getUserCode);
                bodyFormData.set("ipgsbase", localStorage.aytrans_ipgsbase);
                bodyFormData.set("gestgsbase", localStorage.aytrans_gestgsbase);
                bodyFormData.set("aplgsbase", localStorage.aytrans_aplgsbase);
                bodyFormData.set("ejagsbase", localStorage.aytrans_ejagsbase);
                bodyFormData.set("puertogsbase", localStorage.aytrans_puertogsbase);

                axios({
                    method: "post",
                    url: WS_PATH + "get_agenda_chofer.php",
                    data: bodyFormData,
                    timeout: 15000
                })
                    .then(response => {

                        console.log(response);

                        // Preloader Off
                        this.$f7.dialog.close();

                        if (response.data.usuario_valido === true) {

                            let schedule = JSON.parse(
                                this.decodeEntities(JSON.stringify(response.data.agenda))
                            );console.log(schedule)

                            // Set state
                            this.$store.dispatch("setSchedule", schedule);

                            // Get only what we need
                            this.orders = schedule[this.today];

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

<style scoped>
.no-orders {
    text-align: center;
}
</style>
