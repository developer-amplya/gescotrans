<template>
    <f7-page>
        <f7-navbar title="Menú"></f7-navbar>
        <f7-block>
            <f7-list>
                <f7-list-item link="/home" title="Inicio" view="#main-view" panel-close></f7-list-item>
                <f7-list-item link="/view-traffic" title="Tráfico" view="#main-view" panel-close></f7-list-item>
                <f7-list-item link="/cargo-note" title="Nota de Carga" view="#main-view" panel-close></f7-list-item>
                <f7-list-item link="/#" title="Nuevo Cliente" view="#main-view" panel-close></f7-list-item>
                <f7-list-item link="/reset-store" title="Salir" view="#main-view" panel-close></f7-list-item>
            </f7-list>
        </f7-block>

        <f7-toolbar position="bottom" no-shadow no-hairline>
            <!-- Version -->
            <div class="version">
                <small>v. 1.0.0</small>
            </div>
        </f7-toolbar>
    </f7-page>
</template>

<script>
    export default {}
</script>

<style scoped>
    * {
        color: #dedede !important;
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