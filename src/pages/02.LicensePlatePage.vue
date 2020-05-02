<template>
    <f7-page>
        <f7-navbar back-link>
            <f7-nav-title>Matrícula</f7-nav-title>
        </f7-navbar>

        <f7-block inner>
            <f7-row>
                <!-- MATRÍCULA -->
                <div class="custom-input" style="width: 100%">
                    <div class="item-title item-label">Introducir la matrícula del vehículo</div>
                    <f7-input
                            type="text"
                            :value="license_plate"
                            @input="license_plate = $event.target.value"
                            style="height: 50px;"
                    ></f7-input>
                </div>

            </f7-row>
        </f7-block>

        <!-- SUBMIT -->
        <f7-toolbar no-hairline position="bottom">
            <f7-button large fill raised @click="toHome">Seguir</f7-button>
        </f7-toolbar>
    </f7-page>
</template>

<script>
    import axios from "axios";
    import { WS_PATH } from "../config";

    export default {
        name: "LicensePlatePage",
        data() {
            return {
                license_plate: '',
            };
        },
        mounted() {
            //
        },
        methods: {
            toHome() {
                this.$store.dispatch("setLicensePlate", this.license_plate);
                this.$f7router.navigate("/home-driver", {clearPreviousHistory: true});
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