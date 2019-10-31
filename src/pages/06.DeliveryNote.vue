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

                    <f7-list-item>
                        <image-selector @image_selected="setImageData"></image-selector>
                    </f7-list-item>

                </f7-list>

                <!--f7-button outline large @click="scanDeliveryNote" :text="button_text" sheet-close></f7-button-->

                <br>

                <div class="scanned-img">
                    <img ref="scanned_image" :src="image_data_src"></img>
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
    import ImageSelector from '../components/ImageSelector';

    export default {
        name: "DeliveryNote",
        props: ['shipment_code'],
        components: {
            'image-selector': ImageSelector,
        },
        data() {
            return {
                delivery_note_number: null,
                image_data: '',
                image_data_src: '',
                //button_text: 'Escanear',
            }
        },
        computed: {
            ...mapGetters(["getUserName", "getUserPass", "getUserCode"])
        },
        mounted() {
            //
        },
        methods: {
            /*scanDeliveryNote() {

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
                    this.image_data_src = "data:image/jpeg;base64," + imageData; // Base64 rendering
                    this.image_data = imageData;
                    this.button_text = 'Volver a escanear';
                }

                let errorCallback = (message) => {
                    alert('Failed because: ' + message);
                }

                scan.scanDoc(successCallback, errorCallback, {
                    sourceType: 1,
                    quality: 1.0,
                    returnBase64: true
                });
            },*/
            setImageData(e) {
                this.image_data = e;
                this.image_data_src = "data:image/jpeg;base64," + e; // Base64 rendering
            },
            send_delivery_note() {

                // Check the existence of a delivery note number
                if (this.delivery_note_number === null) {

                    this.$f7.dialog.alert("Debe introducir un número de albarán", "Atención");
                    return;
                }

                // Preloader On
                this.$f7.dialog.preloader("Enviando...");

                // Get schedule
                let bodyFormData = new FormData();
                bodyFormData.set("user", this.getUserName);
                bodyFormData.set("pass", this.getUserPass);
                bodyFormData.set("cod_chofer", this.getUserCode);
                bodyFormData.set("ipgsbase", localStorage.aytrans_ipgsbase);
                bodyFormData.set("gestgsbase", localStorage.aytrans_gestgsbase);
                bodyFormData.set("aplgsbase", localStorage.aytrans_aplgsbase);
                bodyFormData.set("ejagsbase", localStorage.aytrans_ejagsbase);
                bodyFormData.set("puertogsbase", localStorage.aytrans_puertogsbase);
                //--------------------------------------
                bodyFormData.set("cod_nota", this.shipment_code);
                bodyFormData.set("cod_albaran", this.delivery_note_number);
                bodyFormData.set("bin_photo", this.image_data);

                axios({
                    method: "post",
                    url: WS_PATH + "set_albaran.php",
                    data: bodyFormData,
                    timeout: 15000
                })
                    .then(response => {

                        console.log(response);

                        // Preloader Off
                        this.$f7.dialog.close();

                        if (response.data.res === 0) {
                            //
                            let notification = this.$f7.toast.create({
                                position: 'top',
                                text: "Guardado",
                                cssClass: "success",
                                icon: '<i class="icon material-icons">done</i>',
                                closeTimeout: 2000
                            });
                            notification.open();
                            //
                            setTimeout(() => {
                                this.$f7router.navigate("/view-traffic");
                            }, 2000);

                        } else {

                            this.$f7.dialog.alert(response.data.error, "Error");
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        // Preloader Off
                        this.$f7.dialog.close();
                        this.$f7.dialog.alert("No se ha podido conectar", "Error");
                    });
            }
        }
    };
</script>

<style scoped>
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


