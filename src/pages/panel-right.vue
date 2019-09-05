<template>
    <f7-page>
        <f7-navbar title="Menú"></f7-navbar>
        <f7-block>
            <f7-list>
                <f7-list-item link="/home" title="Inicio" view="#main-view" panel-close></f7-list-item>
                <f7-list-item link="/new-appointment" title="Tráfico" view="#main-view" panel-close></f7-list-item>
                <f7-list-item link="/new-patient" title="Nota de Carga" view="#main-view" panel-close></f7-list-item>
                <f7-list-item link="/patients-list" title="Nuevo Cliente" view="#main-view" panel-close></f7-list-item>
                <f7-list-item link="/reset-store" title="Salir" view="#main-view" panel-close></f7-list-item>
            </f7-list>
        </f7-block>
    </f7-page>
</template>

<script>
    export default {}
</script>

<style scoped>
    * {
        color: #dedede !important;
    }
</style>