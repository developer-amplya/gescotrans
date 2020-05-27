<template>
    <f7-list-item class="" @click="toDetail" :class="{active: isSelected}">
        <p><small>{{ order[1] }}</small></p>
        <p><strong>{{ order[0] }} - {{ order[2] }}</strong></p>
    </f7-list-item>
</template>

<script>
    export default {
        name: 'OrderItem',
        props: ['order'],
        data() {
            return {
                isSelected: false
            };
        },
        methods: {
            toDetail() {
                this.$f7router.navigate('/order-detail-page/' + this.order[0]);
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

    .dark {
        background-color: #dddddd;
    }

    li {
        list-style: none;
        /*height: 40px;*/
        /*line-height: 40px;*/
        padding: 6px;
        overflow: hidden;
    }

    .light {
        background-color: #eeeeee;
    }

    .row {
        background-color: transparent;
    }

    p, h4 {
        margin: 0;
    }
</style>