<template>
    <div :id="$style.settings">
        <CropperDialog
            :imageUrl="imageUrl"
            :isVisible="isUploadImageDialog"
            v-model="imageUrlCropped"
            @image-cropped="onImageCropped()"
            @crop-canceled="onCropCanceled()"
            @pick-image="pickImage()"
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
                <form @submit.prevent>
                    <!-- Profile Picture -->
                    <section :class="$style.imageContainer">
                        <div :class="$style.wrapper">
                            <div :class="$style.profilePicture">
                                <div
                                    :class="$style.imageLoadingOverlay"
                                    v-if="isImageLoading"
                                >
                                    <md-progress-spinner
                                        md-mode="indeterminate"
                                        :class="$style.imageLoadingSpinner"
                                    />
                                </div>
                                <img
                                    class="md-elevation-3"
                                    :src="getDisplayImagePath()"
                                    :class="$style.image"
                                    alt=""
                                />
                            </div>
                            <div :class="$style.btnGroup">
                                <md-button
                                    :class="$style.uploadImageBtn"
                                    class="md-raised md-primary"
                                    @click="pickImage()"
                                >
                                    <span>Bild hochladen</span>
                                </md-button>
                                <md-button
                                    :class="$style.deleteImageBtn"
                                    class="md-raised md-accent"
                                    @click="deleteDisplayImage()"
                                    :disabled="!userProfile.hasDisplayImage"
                                >
                                    <span>Bild löschen</span>
                                </md-button>
                            </div>
                        </div>
                    </section>
                    <!-- Name -->
                    <section>
                        <md-field :class="getValidationClass('name', 'value')">
                            <label>Name</label>
                            <md-input
                                :disabled="settingsForm.name.isDisabled"
                                @focus.native="$event.target.select()"
                                ref="nameInput"
                                v-model="settingsForm.name.value"
                            />
                            <span
                                class="md-error"
                                v-if="!$v.settingsForm.name.value.required"
                                >Name erforderlich!
                            </span>
                            <span
                                class="md-error"
                                v-if="!$v.settingsForm.name.value.minLength"
                                >Name zu kurz! (min. 3 Zeichen)
                            </span>
                            <span
                                class="md-error"
                                v-if="!$v.settingsForm.name.value.maxLength"
                                >Name zu lang! (max. 32 Zeichen)
                            </span>
                            <button
                                @click="cancelChangeName()"
                                v-if="!settingsForm.name.isDisabled"
                                class="md-elevation-2"
                                :class="[$style.cancelBtn, $style.btn]"
                            >
                                <md-ripple>
                                    <md-icon class="icon">close</md-icon>
                                </md-ripple>
                            </button>
                            <md-button
                                :class="[
                                    settingsForm.name.isDisabled
                                        ? $style.changeBtn
                                        : $style.saveBtn,
                                    $style.btn,
                                ]"
                                @click="
                                    settingsForm.name.isDisabled
                                        ? changeName()
                                        : updateName()
                                "
                                class="md-raised md-primary md-dense"
                            >
                                {{
                                    settingsForm.name.isDisabled
                                        ? "Ändern"
                                        : "Speichern"
                                }}
                            </md-button>
                        </md-field>
                    </section>
                    <!-- E-Mail -->
                    <section>
                        <md-field :class="getValidationClass('email', 'value')">
                            <label>E-Mail-Adresse</label>
                            <md-input
                                :disabled="settingsForm.email.isDisabled"
                                @focus.native="$event.target.select()"
                                ref="emailInput"
                                v-model="settingsForm.email.value"
                            />
                            <span
                                class="md-error"
                                v-if="!$v.settingsForm.email.value.email"
                                >E-Mail ungültig
                            </span>
                            <span
                                class="md-error"
                                v-if="!$v.settingsForm.email.value.required"
                                >E-Mail erforderlich
                            </span>
                            <md-button
                                :class="[
                                    settingsForm.email.isDisabled
                                        ? $style.changeBtn
                                        : $style.saveBtn,
                                    $style.btn,
                                ]"
                                @click="
                                    settingsForm.email.isDisabled
                                        ? changeEmail()
                                        : updateEmail()
                                "
                                class="md-raised md-primary md-dense"
                            >
                                {{
                                    settingsForm.email.isDisabled
                                        ? "Ändern"
                                        : "Speichern"
                                }}
                            </md-button>
                        </md-field>
                    </section>
                    <!-- Password -->
                    <section v-if="settingsForm.newPassword.isDisabled">
                        <md-field :md-toggle-password="false">
                            <label>Passwort</label>
                            <md-input
                                v-model="settingsForm.password.value"
                                :disabled="settingsForm.password.isDisabled"
                                type="password"
                            />
                            <md-button
                                :class="$style.btn"
                                class="md-raised md-primary md-dense"
                                @click="changePassword()"
                                >Ändern</md-button
                            >
                        </md-field>
                    </section>
                    <!-- Change Password -->
                    <section :class="$style.changePass" v-else>
                        <section>
                            <md-field
                                :md-toggle-password="false"
                                :class="
                                    getValidationClass('newPassword', 'oldPass')
                                "
                            >
                                <label>Altes Passwort</label>
                                <md-input
                                    v-model="settingsForm.newPassword.oldPass"
                                    ref="oldPasswordInput"
                                    type="password"
                                    @keyup.enter="updatePassword()"
                                />
                                <span
                                    class="md-error"
                                    v-if="
                                        !$v.settingsForm.newPassword.oldPass
                                            .required
                                    "
                                    >Altes Passwort erforderlich
                                </span>
                            </md-field>
                        </section>
                        <section>
                            <md-field
                                :md-toggle-password="false"
                                :class="
                                    getValidationClass('newPassword', 'newPass')
                                "
                            >
                                <label>Neues Passwort</label>
                                <md-input
                                    v-model="settingsForm.newPassword.newPass"
                                    type="password"
                                    @keyup.enter="updatePassword()"
                                />
                                <span
                                    class="md-error"
                                    v-if="
                                        !$v.settingsForm.newPassword.newPass
                                            .minLength
                                    "
                                    >Neues Password zu kurz (min. 8 Zeichen)
                                </span>
                                <span
                                    class="md-error"
                                    v-if="
                                        !$v.settingsForm.newPassword.newPass
                                            .required
                                    "
                                    >Neues Passwort erforderlich
                                </span>
                            </md-field>
                        </section>
                        <section>
                            <md-field
                                :md-toggle-password="false"
                                :class="
                                    getValidationClass(
                                        'newPassword',
                                        'newPassRepeat'
                                    )
                                "
                            >
                                <label>Neues Passwort wiederholen</label>
                                <md-input
                                    v-model="
                                        settingsForm.newPassword.newPassRepeat
                                    "
                                    type="password"
                                    @keyup.enter="updatePassword()"
                                />
                                <span
                                    class="md-error"
                                    v-if="
                                        !$v.settingsForm.newPassword
                                            .newPassRepeat.required
                                    "
                                    >Neues Passwort wiederholen
                                </span>
                                <span
                                    class="md-error"
                                    v-if="
                                        !$v.settingsForm.newPassword
                                            .newPassRepeat.sameAsNewPass
                                    "
                                    >Passwörter stimmen nicht überein
                                </span>
                            </md-field>
                        </section>
                        <div :class="$style.btnGroup">
                            <md-button
                                :class="$style.btn"
                                @click="cancelChangePassword()"
                                class="md-raised md-accent md-dense"
                                >Abbrechen</md-button
                            >
                            <md-button
                                :class="[$style.btn, $style.saveBtn]"
                                @click="updatePassword()"
                                class="md-raised md-primary md-dense"
                                >Speichern</md-button
                            >
                        </div>
                    </section>
                    <!-- Dark Mode -->
                    <section :class="$style.darkMode">
                        <span>Dark Mode</span>
                        <div :class="$style.switchWrapper">
                            <md-icon
                                :class="[
                                    $style.icon,
                                    !settingsForm.isDarkMode.value
                                        ? $style.active
                                        : '',
                                ]"
                                >wb_sunny</md-icon
                            >
                            <md-switch
                                @change="switchDarkMode()"
                                v-model="settingsForm.isDarkMode.value"
                                :class="$style.switch"
                            />
                            <md-icon
                                :class="[
                                    $style.icon,
                                    settingsForm.isDarkMode.value
                                        ? $style.active
                                        : '',
                                ]"
                                >nights_stay</md-icon
                            >
                        </div>
                    </section>
                </form>
            </md-card-content>
        </md-card>
    </div>
</template>

<script src="./Settings.ts"></script>

<style src="./Settings.scss" lang="scss" module></style>
