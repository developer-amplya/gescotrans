<template>
    <f7-page>
        <f7-navbar title="Configuración gsBase" back-link></f7-navbar>

        <f7-block no-hairlines>
            <f7-list>
                <f7-list-input
                        label="IP/URL"
                        type="text"
                        :value="ipgsbase"
                        @input="ipgsbase = $event.target.value"
                        clear-button
                        required
                ></f7-list-input>

                <f7-list-input
                        label="Puerto"
                        type="text"
                        :value="puertogsbase"
                        @input="puertogsbase = $event.target.value"
                        clear-button
                        required
                ></f7-list-input>

                <f7-list-input
                        label="Gestora"
                        type="text"
                        :value="gestgsbase"
                        @input="gestgsbase = $event.target.value"
                        clear-button
                        required
                ></f7-list-input>

                <f7-list-input
                        label="Ejercicio"
                        type="text"
                        :value="ejagsbase"
                        @input="ejagsbase = $event.target.value"
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
                <p><strong>Usuario:</strong> demo_clinicas</p>
                <p><strong>Contraseña:</strong> 0000</p>
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
                ipgsbase: localStorage.ipgsbase,
                puertogsbase: localStorage.puertogsbase,
                gestgsbase: localStorage.gestgsbase,
                ejagsbase: localStorage.ejagsbase
            };
        },
        methods: {
            saveSettings() {
                // Save settings into Local Storage
                localStorage.ipgsbase = this.ipgsbase;
                localStorage.puertogsbase = this.puertogsbase;
                localStorage.gestgsbase = this.gestgsbase;
                localStorage.ejagsbase = this.ejagsbase;

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


