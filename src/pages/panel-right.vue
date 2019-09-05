<template>
    <f7-page>
        <f7-navbar title="Menú"></f7-navbar>
        <f7-block>
            <f7-list>
                <f7-list-item link="/home" title="Inicio" view="#main-view" panel-close></f7-list-item>
                <f7-list-item link="/new-appointment" title="Nueva cita" view="#main-view" panel-close></f7-list-item>
                <f7-list-item link="/new-patient" title="Nuevo paciente" view="#main-view" panel-close></f7-list-item>
                <f7-list-item link="/patients-list" title="Lista de pacientes" view="#main-view" panel-close></f7-list-item>
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