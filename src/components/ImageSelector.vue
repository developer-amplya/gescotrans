<template>

    <f7-block inner class="add-image-btn">

        <!-- Image -->
        <!--
        <div class="image" @click="$refs.EditImagePopover.open()">
            <img ref="currentImage" :src="getImgUrl(imagepath)"/>
        </div>
        -->

        <f7-button
                outline
                large
                @click="$refs.GetImageActionSheet.open()"
                text="AÑADIR IMAGEN"
                sheet-close
        ></f7-button>

        <!-- Popover -->
        <f7-actions ref="GetImageActionSheet">
            <f7-actions-group>
                <f7-actions-label>Añadir imagen</f7-actions-label>
                <f7-actions-button @click="getPictureFromCamera">Desde la cámara</f7-actions-button>
                <f7-actions-button @click="getPictureFromLibrary">Desde la galería</f7-actions-button>
                <f7-actions-button color="red">Cancelar</f7-actions-button>
            </f7-actions-group>
        </f7-actions>

    </f7-block>

</template>

<script>
    export default {
        name: 'ImageSelector',
        data() {
            return {
                //
            };
        },
        methods: {
            // From camera
            getPictureFromCamera() {
                if (navigator.camera) {
                    navigator.camera.getPicture(this.showPicture, this.error, {
                        quality: 50,
                        sourceType: Camera.PictureSourceType.CAMERA,
                        destinationType: Camera.DestinationType.DATA_URL,
                        encodingType: Camera.EncodingType.JPEG,
                        allowEdit: true,
                        correctOrientation: true,
                        targetWidth: 1920,
                        targetHeight: 1920
                    });
                } else {
                    // If the navigator.camera is not available display generic error to the user.
                    this.$f7.dialog.alert('Cámara no disponible', 'Atención');
                }
            },
            // From library
            getPictureFromLibrary() {
                if (navigator.camera) {
                    navigator.camera.getPicture(this.showPicture, this.error, {
                        quality: 50,
                        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                        destinationType: Camera.DestinationType.DATA_URL,
                        encodingType: Camera.EncodingType.JPEG,
                        allowEdit: true,
                        correctOrientation: true,
                    });
                } else {
                    // If the navigator.camera is not available display generic error to the user.
                    this.$f7.dialog.alert('Galería no disponible', 'Atención');
                }
            },
            showPicture(imageData) {
                // this.$refs.currentImage.src = imageURI;

                // Emit URI to parent
                this.$emit('image_selected', imageData);
            }
        }
    };
</script>

<style scoped>

    .image img {
        width: 100%;
    }
    .add-image-btn.block {
        width: 100%;
    }

</style>