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
                <div @click="viewTraffic">
                    <h1>
                        <f7-icon material="event_note" size="48px"></f7-icon>&nbsp;&nbsp;Tráfico
                    </h1>
                </div>
            </f7-card>

            <f7-card outline>
                <div @click="newLoadNote">
                    <h1>
                        <f7-icon material="library_add" size="48px"></f7-icon>&nbsp;&nbsp;Nota de Carga
                    </h1>
                </div>
            </f7-card>

            <f7-card outline>
                <div @click="newCustomer">
                    <h1>
                        <f7-icon material="assignment_ind" size="48px"></f7-icon>&nbsp;&nbsp;Nuevo Cliente
                    </h1>
                </div>
            </f7-card>
        </f7-block>
    </f7-page>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "HomePage",
        computed: {
            ...mapGetters([])
        },
        methods: {
            viewTraffic()
            {
                //
            },
            newLoadNote()
            {
                //
            },
            newCustomer()
            {
                //
            }
        }
    };
</script>

<style scoped>
    .card {
        margin-bottom: 30px !important;
    }

    .card h1 {
        margin: 12px 0;
    }
</style>


