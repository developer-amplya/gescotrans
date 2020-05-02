<template>
    <f7-page>
        <f7-navbar back-link="Volver">
            <f7-nav-title>
                <span v-if="action === 'start'">Comenzar orden</span>
                <span v-else>Finalizar orden</span>
            </f7-nav-title>
            <f7-nav-right>
                <f7-link panel-open="right">
                    <f7-icon material="menu"></f7-icon>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>

        <f7-block>

            <!-- Orders -->
            <orders-list :orders="orders" @order-selected="handleSelected"></orders-list>

            <br>
            <br>

            <!-- Confirm -->
            <f7-button fill raised="">Confirmar</f7-button>

        </f7-block>

    </f7-page>
</template>

<script>
    import OrdersList from '../layout/OrdersList.vue';

    export default {
        name: 'OrdersPage',
        components: {
            OrdersList,
        },
        props: ['action'],
        data() {
            return {
                selected: '',
                orders: [
                    {code: '12345', description: 'Lorem ipsum amet sicut dolor', status: 'Espera'},
                    {code: '12346', description: 'Lorem ipsum amet sicut dolor', status: 'Espera'},
                    {code: '12347', description: 'Lorem ipsum amet sicut dolor', status: 'Espera'},
                    {code: '12348', description: 'Lorem ipsum amet sicut dolor', status: 'Espera'},
                    {code: '12349', description: 'Lorem ipsum amet sicut dolor', status: 'Espera'}
                ]
            };
        },
        methods: {
            handleSelected (code) {
                console.log(code);
            }
        }
    };
</script>

<style scoped>

</style>
