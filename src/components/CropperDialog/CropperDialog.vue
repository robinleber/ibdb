<template>
    <div :id="$style.cropperDialog">
        <md-dialog
            :class="$style.uploadImageDialog"
            :md-active.sync="isCropperDialog"
            @md-closed="cancelCrop()"
        >
            <md-dialog-title>Bild hochladen</md-dialog-title>
            <md-dialog-content :class="$style.content">
                <div class="cropper-wrapper">
                    <div
                        class="cropper-background"
                        :style="{ backgroundImage: 'url(' + imageUrl + ')' }"
                    />
                    <cropper
                        :class="$style.imgCropper"
                        :stencil-props="{ aspectRatio: 1 / 1 }"
                        :src="imageUrl"
                        v-if="true"
                        ref="cropper"
                    />
                </div>
                <md-button
                    class="md-raised md-primary"
                    :class="$style.uploadImageBtn"
                    @click="pickImage()"
                >
                    Bild ändern
                </md-button>
            </md-dialog-content>
            <md-dialog-actions>
                <md-button
                    @click="cancelCrop()"
                    class="md-accent md-raised"
                    >Abbrechen</md-button
                >
                <md-button
                    class="md-primary md-raised"
                    @click="cropImage()"
                >
                    Speichern
                </md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>

<script src="./CropperDialog.ts" lang="ts"></script>

<style src="./CropperDialog.scss" lang="scss" module></style>
