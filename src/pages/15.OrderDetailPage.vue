<template>
    <f7-page>

        <!-- Navbar -->
        <f7-navbar back-link>
            <f7-nav-title>Detalle de orden</f7-nav-title>
            <f7-nav-right>
                <f7-link panel-open="right">
                    <f7-icon material="menu"></f7-icon>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>

        <f7-block>

            <div class="detail">
                <p><strong>Servicio</strong></p>
                <p>Arrastre Sueca</p>
            </div>

            <div class="detail">
                <p><strong>Precio</strong></p>
                <p>125 €</p>
            </div>

            <f7-row>
                <f7-col>
                    <div class="detail">
                        <p><strong>Fecha</strong></p>
                        <p>29-05-2020</p>
                    </div>
                </f7-col>
                <f7-col>
                    <div class="detail">
                        <p><strong>Hora</strong></p>
                        <p>06:45</p>
                    </div>
                </f7-col>
            </f7-row>

            <div class="detail">
                <p><strong>Observaciones</strong></p>
                <p>Lorem ipsum dolor sicut amet</p>
            </div>

            <div class="detail">
                <p><strong>Cliente</strong></p>
                <p>Alifoods, S.A.</p>
            </div>

            <div class="detail">
                <p><strong>Proveedor</strong></p>
                <p>Gescotrans</p>
            </div>

            <div class="detail">
                <p><strong>Matrícula</strong></p>
                <p>5513JBW</p>
            </div>

            <div class="detail">
                <p><strong>Conductor</strong></p>
                <p>Paco Arce</p>
            </div>

        </f7-block>

        <!-- SUBMIT -->
        <f7-toolbar no-hairline position="bottom">
            <f7-button large fill raised @click="do_login">Comenzar</f7-button>
        </f7-toolbar>

    </f7-page>

</template>

<script>
    export default {
        name: 'OrderDetailPage',
        data() {
            return {
                //
            }
        }
    }
</script>

<style scoped>
    .detail {
        background-color: #d9d9d9;
        padding: 5px 10px;
        margin-bottom: 10px;
    }

    .detail p {
        margin: 5px 0;
    }
</style>