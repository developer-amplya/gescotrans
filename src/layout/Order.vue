<template>
    <f7-list-item class="" @click="toDetail(order.code, $event)" :class="{active: isSelected}">
        <f7-row no-gap>
            <f7-col width="30">{{ order.code }}</f7-col>
            <f7-col width="70">{{ order.description }}</f7-col>
        </f7-row>
    </f7-list-item>
</template>

<script>
    export default {
        name: 'Order',
        props: ['order'],
        data() {
            return {
                isSelected: false
            };
        },
        methods: {
            toDetail(orderCode) {
                this.$f7router.navigate('/order-detail-page/start');
            },
            orderSelect(code, event) {
                this.isSelected = !this.isSelected;
                this.$parent.$emit('order-selected', code); // Leveraging the $parent property we can send the event
                // through the parent to the grand-parent
            }
        }
    };
</script>

<style scoped>
    .active {
        background-color: #0c82df !important;
        color: #ffffff;
    }

    .col-20, .col-60 {
        padding: 8px 4px;
    }

    .dark {
        background-color: #dddddd;
    }

    li {
        list-style: none;
        height: 40px;
        line-height: 40px;
        padding-left: 6px;
        padding-right: 6px;
        overflow: hidden;
    }

    .light {
        background-color: #eeeeee;
    }

    .row {
        background-color: transparent;
    }
</style>