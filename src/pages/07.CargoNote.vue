<template>
    <f7-page>

        <!-- Navbar -->
        <f7-navbar back-link>
            <f7-nav-title back-link-force back-link-url="/home">Nota de carga</f7-nav-title>
            <f7-nav-right>
                <f7-link panel-open="right">
                    <f7-icon material="menu"></f7-icon>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>

        <f7-page-content>
            <f7-block>

                <f7-card outline>
                    <div @click="selectCustomer">
                        <h3>
                            <f7-icon material="assignment_ind" size="28px"></f7-icon>&nbsp;&nbsp;Cliente
                        </h3>
                        <p><strong>{{ getCustomer[1] }}</strong>
                        </p>
                        <p>
                            <f7-icon slot="media" material="phone" size="18px"></f7-icon>
                            <small><em>{{ getCustomer[2] }}</em></small>
                        </p>
                    </div>
                </f7-card>

                <f7-card outline>
                    <div @click="selectService">
                        <h3>
                            <f7-icon material="assignment_ind" size="28px"></f7-icon>&nbsp;&nbsp;Servicio
                        </h3>
                        <p><strong>{{ getService[1] }}</strong>
                        </p>
                        <!--
                        <p>
                            <f7-icon slot="media" material="phone" size="18px"></f7-icon>
                            <small><em>{{ getService }}</em></small>
                        </p>
                        -->
                    </div>
                </f7-card>

                <f7-card outline>
                    <div @click="selectSupplier">
                        <h3>
                            <f7-icon material="assignment_ind" size="28px"></f7-icon>&nbsp;&nbsp;Proveedor
                        </h3>
                        <p><strong>{{ getSupplier[1] }}</strong>
                        </p>
                        <p>
                            <f7-icon slot="media" material="phone" size="18px"></f7-icon>
                            <small><em>{{ getSupplier[2] }}</em></small>
                        </p>
                    </div>
                </f7-card>

            </f7-block>
        </f7-page-content>

        <!-- Submit -->
        <f7-toolbar no-hairline position="bottom">
            <f7-button large fill raised>Crear</f7-button>
        </f7-toolbar>

    </f7-page>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "CargoNote",
        data() {
            return {
                //
            };
        },
        computed: {
            ...mapGetters(["getCustomer", "getService", "getSupplier"])
        },
        methods: {

            selectCustomer()
            {
                this.$f7router.navigate("/customers-list");
            },
            selectService()
            {
                this.$f7router.navigate("/services-list");
            },
            selectSupplier()
            {
                this.$f7router.navigate("/suppliers-list");
            },
        }
    }
</script>

<style scoped>

</style>