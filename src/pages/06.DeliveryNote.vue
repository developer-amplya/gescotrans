<template>
    <f7-page>

        <!-- Navbar -->
        <f7-navbar back-link>
            <f7-nav-title>Nota de entrega</f7-nav-title>
            <f7-nav-right>
                <f7-link panel-open="right">
                    <f7-icon material="menu"></f7-icon>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>

        <f7-page-content>
            <f7-block>

                <f7-list form no-hairlines>
                    <!-- ALBARÁN -->
                    <f7-list-input
                            type="text"
                            label="Nº de albarán"
                            :value="delivery_note_number"
                            @input="delivery_note_number = $event.target.value"
                    ></f7-list-input>

                </f7-list>

                <f7-button outline large @click="scanDeliveryNote" :text="button_text" sheet-close></f7-button>

                <br>

                <div class="scanned-img">
                    <img ref="scanned_image" :src="image_data"></img>
                </div>

            </f7-block>
        </f7-page-content>

        <!-- SUBMIT -->
        <f7-toolbar no-hairline position="bottom">
            <f7-button large fill raised @click="send_delivery_note">Enviar</f7-button>
        </f7-toolbar>

    </f7-page>
</template>

<script>
    import axios from "axios";
    import {WS_PATH} from "../config";
    import {mapGetters} from "vuex";

    export default {
        name: "DeliveryNote",
        props: ['shipment_code'],
        data() {
            return {
                delivery_note_number: null,
                image_data: '',
                button_text: 'Escanear',
            }
        },
        computed: {
            ...mapGetters(["getUserName", "getUserPass", "getUserCode"])
        },
        mounted() {
            //
        },
        methods: {
            scanDeliveryNote() {

                // sourceType will by default take value 1 if no value is set | 0 for gallery | 1 for camera.
                // fileName will take default value "image" if no value set. Supported only on 4.x.x plugin version
                // quality will take default value 1.0 (highest). Lowest value is 5.0. Any value in between will be accepted
                // returnBase64 will take default boolean value false, meaning image URL is returned. If true base64 is returned
                let successCallback = (imageData) => {
                    //alert(imageData);
                    //console.log(imageData);
                    //var image = this.$refs['scanned_image'];
                    //image.src = imageData; // Image URL rendering.
                    //image.src = imageData + '?' + Date.now(); // For iOS, use this to solve issue 10 if unique fileName is not set.
                    this.image_data = "data:image/jpeg;base64," + imageData; // Base64 rendering
                    this.button_text = 'Volver a escanear';
                }

                let errorCallback = (message) => {
                    alert('Failed because: ' + message);
                }

                scan.scanDoc(successCallback, errorCallback, {
                    sourceType: 0,
                    quality: 1.0,
                    returnBase64: true
                });
            },
            send_delivery_note() {
                //
            }
        }
    };
</script>

<style scope>
    .scanned-img img {
        width: 100%;
    }

    .toolbar .button {
        width: 100%;
    }

    .ios .toolbar {
        height: 64px !important;
    }
</style>


