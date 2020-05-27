<template>
    <f7-page>
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
                <f7-button fill raised href="/pending-orders-page">Comenzar orden</f7-button>
            </f7-list-item>

            <!-- Orders -->
            <orders-list :orders="orders" @order-selected="handleSelected"></orders-list>
        </f7-block>

        <Footer />

    </f7-page>
</template>

<script>
    import {mapGetters} from "vuex";
    import Footer from '../layout/Footer';
    import OrdersList from '../layout/OrdersList.vue';

    export default {
        name: "HomeDriverPage",
        components: {Footer, OrdersList},
        data() {
            return {
                selected: '',
                orders: [
                    {code: '12345', description: 'Lorem ipsum amet sicut dolor'},
                    {code: '12346', description: 'Lorem ipsum amet sicut dolor'},
                    {code: '12347', description: 'Lorem ipsum amet sicut dolor'},
                    {code: '12348', description: 'Lorem ipsum amet sicut dolor'},
                    {code: '12349', description: 'Lorem ipsum amet sicut dolor'}
                ]
            };
        },
        computed: {
            ...mapGetters([])
        },
        methods: {
            viewTraffic()
            {
                this.$f7router.navigate("/view-traffic");
            },
            newCargoNote()
            {
                this.$f7router.navigate("/cargo-note");
            },
            newCustomer()
            {
                //
            },
            handleSelected (code) {
                console.log(code);
            }
        }
    };
</script>

<style scoped>
    .button {
        padding: 25px;
        line-height: 1px;
        text-transform: uppercase;
    }

    li {
        list-style: none;
        margin: 50px 0;
    }
</style>


