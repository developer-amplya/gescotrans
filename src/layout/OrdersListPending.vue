<template>
    <div>

        <!-- Header -->
        <f7-row no-gap>
            <h3>Órdenes pendientes</h3>
        </f7-row>

        <!-- Loop -->
        <order-item
                v-for="(order, index) in orders"
                :key="order.code"
                :order="order"
                :class="index % 2 === 0 ? 'dark' : 'light'"
                ></order-item>

    </div>
</template>

<script>
    import OrderItem from '../layout/Order.vue';

    export default {
        name: 'OrdersList',
        components: {
            OrderItem
        },
        props: ['orders'],
        data() {
            return {
                //
            };
        },
        methods: {
            //
        }
    };
</script>

<style scoped>

</style>