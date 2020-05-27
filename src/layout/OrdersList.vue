<template>
    <div>

        <!-- Loop -->
        <order-item
                v-for="(order, index) in orders"
                v-if="order[5] === state"
                :key="order[0]"
                :order="order"
                :class="index % 2 === 0 ? 'dark' : 'light'"
        ></order-item>

    </div>
</template>

<script>
    import OrderItem from './OrderItem.vue';

    export default {
        name: 'OrdersList',
        components: {
            OrderItem
        },
        props: ['orders', 'state']
    };
</script>