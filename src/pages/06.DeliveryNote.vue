<template>
    <f7-page>

        <!-- Navbar -->
        <f7-navbar back-link>
            <f7-nav-title>Nota de entrega</f7-nav-title>
            <f7-nav-right>
                <f7-link panel-open="right">
                    <f7-icon material="menu"></f7-icon>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>



    </f7-page>
</template>

<script>
    import axios from "axios";
    import {WS_PATH} from "../config";
    import {mapGetters} from "vuex";

    export default {
        name: "DeliveryNote",
        data() {
            return {
                //
            }
        },
        computed: {
            ...mapGetters(["getUserName", "getUserPass", "getUserCode"])
        },
        mounted() {
            //
        },
        methods: {

        }
    };
</script>

<style scope>

</style>


