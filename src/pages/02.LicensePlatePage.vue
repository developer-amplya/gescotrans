<template>
    <f7-page>
        <f7-navbar back-link>
            <f7-nav-title>Matrícula</f7-nav-title>
        </f7-navbar>

        <f7-block inner>
            <f7-list form no-hairlines>
                <!-- MATRÍCULA -->
                <f7-list-input
                        type="text"
                        label="Introducir la matrícula del vehículo"
                        :value="license_plate"
                        @input="license_plate = $event.target.value"
                ></f7-list-input>

            </f7-list>
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