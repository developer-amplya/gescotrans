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
                        <f7-icon material="event_note" size="48px"></f7-icon>&nbsp;&nbsp;Tráfico
                    </h1>
                </div>
            </f7-card>

            <f7-card outline>
                <div style="text-align: center; padding: 20px">
                    <h1>
                        <f7-icon material="library_add" size="48px"></f7-icon>&nbsp;&nbsp;Nota de Carga
                    </h1>
                    <f7-button fill raised href="/cargo-note-select-service">SELECCIONAR SERVICIO</f7-button>
                    <br>
                    <f7-button fill raised href="/cargo-note-custom-service">SERVICIO PERSONALIZADO</f7-button>
                </div>
            </f7-card>
        </f7-block>

        <Footer />
    </f7-page>
</template>

<script>
    import {mapGetters} from "vuex";
    import Footer from '../layout/Footer';

    export default {
        name: "HomeAdminPage",
        components: {Footer},
        computed: {
            ...mapGetters([])
        },
        methods: {
            viewTraffic()
            {
                this.$f7router.navigate("/view-traffic");
            },
            newCargoNoteSelectService()
            {
                this.$f7router.navigate("/cargo-note-select-service");
            },
            newCargoNoteCustomService()
            {
                this.$f7router.navigate("/cargo-note-custom-service");
            },
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


