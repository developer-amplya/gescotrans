<template>
    <f7-page>
        <!-- Navbar -->
        <f7-navbar back-link>
            <f7-nav-title>Motivo de la anulación</f7-nav-title>
            <f7-nav-right>
                <f7-link panel-open="right">
                    <f7-icon material="menu"></f7-icon>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>

        <f7-block>
            <!-- Reasons list -->
            <f7-list no-hairlines>
                <f7-list-item
                        v-for="(value, key, index) in reasons_list"
                        :key="index"
                        :title="value[1]"
                        :after="value[2]"
                        link="#"
                        @click="cancelSchedule(value[0])"
                ></f7-list-item>
            </f7-list>
        </f7-block>
    </f7-page>
</template>

<script>
    import axios from "axios";
    import {WS_PATH} from "../config";
    import {mapGetters} from "vuex";

    export default {
        name: "CancelSchedulePage",
        props: ['code'],
        data() {
            return {
                reasons_list: ""
            };
        },
        mounted() {
            this.reasons_list = this.getCancelList;
        },
        computed: {
            ...mapGetters([
                "getCancelList",
                'getUserName',
                'getUserPass'
            ])
        },
        methods: {
            cancelSchedule(reasonCode) {
                // Preloader On
                this.$f7.dialog.preloader("Anulando...");

                let bodyFormData = new FormData();
                bodyFormData.set("ipgsbase", localStorage.ipgsbase);
                bodyFormData.set("puertogsbase", localStorage.puertogsbase);
                bodyFormData.set("gestgsbase", localStorage.gestgsbase);
                bodyFormData.set("ejagsbase", localStorage.ejagsbase);
                bodyFormData.set("user", this.getUserName);
                bodyFormData.set("pass", this.getUserPass);
                bodyFormData.set("cod_cita", this.code);
                bodyFormData.set("cod_motivo_anu", reasonCode);

                axios({
                    method: "post",
                    url: WS_PATH + "delete_date.php",
                    data: bodyFormData,
                    timeout: 15000
                })
                    .then(response => {
                        // Preloader Off
                        this.$f7.dialog.close();

                        if (response.data) {
                            //
                            let notification = this.$f7.toast.create({
                                position: 'top',
                                text: "Cita anulada",
                                cssClass: "success",
                                icon: '<i class="icon material-icons">done</i>',
                                closeTimeout: 2000
                            });
                            notification.open();
                            //
                            setTimeout(() => {
                                this.$f7router.navigate("/home");
                            }, 2000);
                        } else {
                            this.$f7.dialog.alert("No ha sido posible guardar", "Error");
                        }
                    })
                    .catch(error => {
                        //console.log(error);
                        // Preloader Off
                        this.$f7.dialog.close();
                        this.$f7.dialog.alert("No se ha podido conectar", "Error");
                    });
            }
        }
    };
</script>

<style scoped>
</style>


