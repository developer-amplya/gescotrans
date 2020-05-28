<template>
    <f7-page @page:afterin="retrieveData">

        <!-- Navbar -->
        <f7-navbar>
            <f7-nav-title>Inicio</f7-nav-title>
            <f7-nav-right>
                <f7-link panel-open="right">
                    <f7-icon material="menu"></f7-icon>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>

        <f7-block>

            <f7-card outline>
                <div @click="viewTraffic" style="text-align: center">
                    <h1>
                        <f7-icon material="event_note" size="48px"></f7-icon>&nbsp;&nbsp;Agenda
                    </h1>
                </div>
            </f7-card>

            <f7-list-item>
                <f7-button fill raised large href="/pending-orders-page">Comenzar orden</f7-button>
            </f7-list-item>

            <p class="in-progress-header">ÓRDENES EN MARCHA</p>

            <!-- Orders -->
            <orders-list :orders="orders[1]" state="ER"></orders-list>

            <p v-if="!ordersInProgress" class="no-orders">NO HAY ÓRDENES EN MARCHA</p>
        </f7-block>

        <Footer/>

    </f7-page>
</template>

<script>
    import axios from "axios";
    import { WS_PATH } from "../config";
    import { mapGetters } from "vuex";
    import Footer from '../layout/Footer';
    import OrdersList from '../layout/OrdersList.vue';

    export default {
        name: "HomeDriverPage",
        components: { Footer, OrdersList },
        data() {
            return {
                today: '',
                orders: [],
            };
        },
        computed: {
            ...mapGetters(["getUserName", "getUserPass", "getUserCode"]),
            ordersInProgress: function () {
                if (this.orders.length !== 0) {
                    let filteredArray = this.orders[1].filter((item) => {
                        return item[5] === 'ER'
                    });
                    return filteredArray.length > 0;
                }
            }
        },
        mounted() {
            const d = new Date()
            const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
            const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
            const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)

            this.today = `${ye}-${mo}-${da}`;
        },
        methods: {
            viewTraffic() {
                this.$f7router.navigate("/view-traffic");
            },
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
                            );
                            console.log(schedule)

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
    li {
        list-style: none;
        margin: 50px 0;
    }

    .in-progress-header {
        text-align: center;
        font-weight: bold;
        margin-top: 0;
    }

    .no-orders {
        text-align: center;
        color: #107ED6;
    }
</style>


