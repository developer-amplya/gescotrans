<template>
    <f7-page>
        <f7-navbar title="Menú"></f7-navbar>
        <f7-block>
            <f7-list>
                <f7-list-item
                        :link="getUserRole === 'admin' ? '/home-admin' : '/home-driver'"
                        title="Inicio"
                        view="#main-view"
                        panel-close
                ></f7-list-item>
                <f7-list-item
                        v-if="getUserRole === 'admin'"
                        link="/view-traffic"
                        title="Tráfico"
                        view="#main-view"
                        panel-close
                ></f7-list-item>
                <f7-list-item
                        v-if="getUserRole === 'admin'"
                        link="/cargo-note"
                        title="Nota de Carga"
                        footer="Seleccionar servicio"
                        view="#main-view"
                        panel-close
                ></f7-list-item>
                <f7-list-item
                        v-if="getUserRole === 'admin'"
                        link="/cargo-note"
                        title="Nota de Carga"
                        footer="Servicio personalizado"
                        view="#main-view"
                        panel-close
                ></f7-list-item>
                <f7-list-item
                        v-if="getUserRole === 'driver'"
                        link="/view-traffic"
                        title="Agenda"
                        view="#main-view"
                        panel-close
                ></f7-list-item>
                <f7-list-item
                        v-if="getUserRole === 'driver'"
                        link="/orders-page/start"
                        title="Comenzar orden"
                        view="#main-view"
                        panel-close
                ></f7-list-item>
                <f7-list-item
                        v-if="getUserRole === 'driver'"
                        link="/orders-page/terminate"
                        title="Finalizar orden"
                        view="#main-view"
                        panel-close
                ></f7-list-item>
                <f7-list-item link="/reset-store" title="Salir" view="#main-view" panel-close></f7-list-item>
            </f7-list>
        </f7-block>

        <f7-toolbar position="bottom" no-shadow no-hairline>
            <!-- Version -->
            <div class="version">
                <small>v. 0.0.33</small>
            </div>
        </f7-toolbar>
    </f7-page>
</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        computed: {
            ...mapGetters(['getUserRole'])
        },
    }
</script>

<style scoped>
    * {
        color: #dedede !important;
    }

    .ios .page {
        background-color: #1c1c1d;
    }

    .toolbar {
        background-color: transparent !important;
    }

    .version {
        position: absolute;
        padding-top: 6px;
        right: 10px;
        color: rgba(255, 255, 255, 0.75);
    }
</style>