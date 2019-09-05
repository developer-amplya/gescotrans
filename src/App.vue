<template>
    <!-- App -->
    <f7-app :params="f7params">

        <!-- Statusbar -->
        <f7-statusbar></f7-statusbar>

        <!-- Right Panel -->
        <f7-panel right cover theme-dark>
            <f7-view url="/panel-right/"></f7-view>
        </f7-panel>

        <!-- Main View -->
        <f7-view id="main-view" url="/" main class="safe-areas"></f7-view>

    </f7-app>
</template>

<script>
    // Import Routes
    import routes from './routes.js'
    import store from './vuex/store'

    export default {
        store,
        data() {
            return {
                // Framework7 parameters here
                f7params: {
                    id: 'es.amplya.ayclinicas', // App bundle ID
                    name: 'Cita Previa', // App name
                    theme: 'auto', // Automatic theme detection
                    // App routes
                    routes: routes,
                    touch: {
                        tapHold: true,
                        materialRipple: true,
                        activeState: true,
                        disableContextMenu: false
                    },
                    dialog: {
                        buttonOk: 'Aceptar',
                        buttonCancel: 'Cancelar'
                    },
                    statusbar: {
                        enabled: true,
                        overlay: false,
                        iosOverlaysWebView: false,
                        scrollTopOnClick: true,
                        materialBackgroundColor: "#ff0a02",
                        iosBackgroundColor: "#ff0a02"
                    },
                },
            }
        }
    }
</script>
