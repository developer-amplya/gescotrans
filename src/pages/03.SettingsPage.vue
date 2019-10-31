<template>
    <f7-page>
        <f7-navbar title="Configuración gsBase" back-link></f7-navbar>

        <f7-block no-hairlines>
            <f7-list>
                <f7-list-input
                        label="IP/URL"
                        type="text"
                        autocapitalize="off"
                        :value="ipgsbase"
                        @input="ipgsbase = $event.target.value"
                        clear-button
                        required
                ></f7-list-input>

                <f7-list-input
                        label="Gestora"
                        type="text"
                        autocapitalize="off"
                        :value="gestgsbase"
                        @input="gestgsbase = $event.target.value"
                        clear-button
                        required
                ></f7-list-input>

                <f7-list-input
                        label="Aplicación"
                        type="text"
                        autocapitalize="off"
                        :value="aplgsbase"
                        @input="aplgsbase = $event.target.value"
                        clear-button
                        required
                ></f7-list-input>

                <f7-list-input
                        label="Ejercicio"
                        type="text"
                        autocapitalize="off"
                        :value="ejagsbase"
                        @input="ejagsbase = $event.target.value"
                        clear-button
                        required
                ></f7-list-input>

                <f7-list-input
                        label="Puerto"
                        type="text"
                        autocapitalize="off"
                        :value="puertogsbase"
                        @input="puertogsbase = $event.target.value"
                        clear-button
                        required
                ></f7-list-input>
            </f7-list>
        </f7-block>

        <f7-block>
            <!-- Info -->
            <div class="alert alert-info">
                <div class="center">
                    <f7-icon material="info"></f7-icon>
                    <h3>Credenciales de prueba</h3>
                </div>
                <p><strong>Usuario:</strong> prueba</p>
                <p><strong>Contraseña:</strong> 123</p>
            </div>
        </f7-block>

        <!-- SUBMIT -->
        <f7-toolbar no-hairline position="bottom">
            <f7-button text="GUARDAR" @click="saveSettings" fill large raised></f7-button>
        </f7-toolbar>
    </f7-page>
</template>

<script>
    export default {
        name: "SettingsPage",

        data() {
            return {
                ipgsbase: localStorage.aytrans_ipgsbase,
                gestgsbase: localStorage.aytrans_gestgsbase,
                aplgsbase: localStorage.aytrans_aplgsbase,
                ejagsbase: localStorage.aytrans_ejagsbase,
                puertogsbase: localStorage.aytrans_puertogsbase,
            };
        },
        methods: {
            saveSettings() {
                // Save settings into Local Storage
                localStorage.aytrans_ipgsbase = this.ipgsbase;
                localStorage.aytrans_gestgsbase = this.gestgsbase;
                localStorage.aytrans_aplgsbase = this.aplgsbase,
                localStorage.aytrans_ejagsbase = this.ejagsbase;
                localStorage.aytrans_puertogsbase = this.puertogsbase;

                let notification = this.$f7.toast.create({
                    position: 'top',
                    text: "Configuración guardada",
                    cssClass: "success",
                    icon: '<i class="icon material-icons">done</i>',
                    closeTimeout: 2000
                });
                notification.open();

                // Redirect to Login Page
                setTimeout(() => {
                    this.$f7router.navigate("/login");
                }, 2000);
            }
        }
    };
</script>

<style scoped>
    .toolbar .button {
        width: 100%;
    }

    .ios .toolbar {
        height: 64px !important;
    }
</style>


