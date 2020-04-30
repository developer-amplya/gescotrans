<template>
    <f7-page>
        <f7-navbar title="" back-link="Volver"></f7-navbar>

        <f7-block>

            <!-- Header -->
            <h3 class="center">Orden Check
                <span v-if="action === 'start'">IN (comenzar)</span>
                <span v-else>OUT (terminar)</span></h3>

            <hr>

            <!-- Orders -->
            <orders-list :orders="orders" @order-selected="handleSelected"></orders-list>

            <br>
            <br>

            <!-- Confirm -->
            <f7-button>Confirmar</f7-button>

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
