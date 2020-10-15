<template>
    <div :id="$style.settings">
        <CropperDialog
            :imageUrl="imageUrl"
            :isVisible="isUploadImageDialog"
            v-model="imageUrlCropped"
            @image-cropped="onImageCropped()"
            @crop-canceled="onCropCancled()"
        />
        <form @keyup.prevent style="display: none;" ref="imageInputForm">
            <input
                @change="onImagePicked"
                accept="image/png, image/jpg, image/jpeg"
                ref="imageInput"
                type="file"
            />
        </form>
        <md-card :class="$style.mainContainer">
            <md-card-header :class="$style.header">
                <md-icon>settings</md-icon>
                <div class="md-headline">Einstellungen</div>
            </md-card-header>
            <md-card-content>
                <section :class="$style.imageContainer">
                    <div :class="$style.wrapper">
                        <img
                            class="md-elevation-3"
                            :src="userProfile.displayImagePath"
                            :class="$style.image"
                            alt=""
                        />
                        <md-button
                            :class="$style.editImageBtn"
                            class="md-raised md-accent md-icon-button"
                            @click="changeDisplayImage()"
                        >
                            <md-icon>create</md-icon>
                        </md-button>
                    </div>
                </section>
                <section>
                    <md-field>
                        <label>Name</label>
                        <md-input
                            v-model="form.name.value"
                            :disabled="form.name.isDisabled"
                            ref="nameInput"
                        />
                        <md-button
                            :class="$style.changeBtn"
                            @click="
                                form.name.isDisabled
                                    ? changeName()
                                    : updateName()
                            "
                            class="md-raised md-primary"
                        >
                            {{ form.name.isDisabled ? "Ändern" : "Speichern" }}
                        </md-button>
                    </md-field>
                </section>
                <section>
                    <md-field>
                        <label>E-Mail-Adresse</label>
                        <md-input
                            v-model="form.email.value"
                            :disabled="form.email.isDisabled"
                            ref="emailInput"
                        />
                        <md-button
                            :class="$style.changeBtn"
                            @click="
                                form.email.isDisabled
                                    ? changeEmail()
                                    : updateEmail()
                            "
                            class="md-raised md-primary"
                        >
                            {{ form.email.isDisabled ? "Ändern" : "Speichern" }}
                        </md-button>
                    </md-field>
                </section>
                <section v-if="form.newPassword.isDisabled">
                    <md-field :md-toggle-password="false">
                        <label>Passwort</label>
                        <md-input
                            v-model="form.password.value"
                            :disabled="form.password.isDisabled"
                            type="password"
                        />
                        <md-button
                            :class="$style.changeBtn"
                            class="md-raised md-primary"
                            @click="changePassword()"
                            >Ändern</md-button
                        >
                    </md-field>
                </section>
                <section :class="$style.changePass" v-else>
                    <md-field :md-toggle-password="false">
                        <label>Altes Passwort</label>
                        <md-input
                            v-model="form.newPassword.oldPass"
                            ref="oldPasswordInput"
                            type="password"
                        />
                    </md-field>
                    <md-field :md-toggle-password="false">
                        <label>Neues Passwort</label>
                        <md-input
                            v-model="form.newPassword.newPass"
                            type="password"
                        />
                    </md-field>
                    <md-field :md-toggle-password="false">
                        <label>Neues Passwort wiederholen</label>
                        <md-input
                            v-model="form.newPassword.newPassRepeat"
                            type="password"
                        />
                    </md-field>
                    <div :class="$style.btnGroup">
                        <md-button
                            :class="$style.btn"
                            @click="cancelChangePassword()"
                            class="md-raised md-accent"
                            >Abbrechen</md-button
                        >
                        <md-button
                            :class="$style.btn"
                            @click="updatePassword()"
                            class="md-raised md-primary"
                            >Speichern</md-button
                        >
                    </div>
                </section>
                <section :class="$style.darkMode">
                    <span>Dark Mode</span>
                    <div :class="$style.switch">
                        <md-switch
                            @change="switchDarkMode()"
                            v-model="form.isDarkMode.value"
                        />
                    </div>
                </section>
                <div></div>
            </md-card-content>
        </md-card>
    </div>
</template>

<script src="./Settings.ts"></script>

<style src="./Settings.scss" lang="scss" module></style>
