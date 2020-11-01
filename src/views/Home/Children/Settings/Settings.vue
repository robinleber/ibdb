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
                <form @keydown.enter.prevent autocomplete="off">
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
                                    @click="isDeleteDisplayImage = true"
                                    :disabled="!userProfile.hasDisplayImage"
                                >
                                    <span>Bild löschen</span>
                                </md-button>
                            </div>
                        </div>
                    </section>
                    <!-- Name -->
                    <section
                        :class="$style.changeName"
                        @keyup.enter="updateName()"
                    >
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
                            <md-button
                                v-if="settingsForm.name.isDisabled"
                                :class="$style.btn"
                                @click="changeName()"
                                class="md-raised md-primary md-dense"
                            >
                                Ändern
                            </md-button>
                        </md-field>
                        <div
                            :class="$style.btnGroup"
                            v-if="!settingsForm.name.isDisabled"
                        >
                            <md-button
                                :class="$style.btn"
                                @click="abortChange('name')"
                                class="md-raised md-dense md-accent"
                                >Abbrechen</md-button
                            >
                            <md-button
                                :disabled="
                                    settingsForm.name.value ===
                                        userProfile.displayName
                                "
                                @click="updateName()"
                                :class="[$style.btn, $style.saveBtn]"
                                class="md-raised md-dense"
                                >Speichern</md-button
                            >
                        </div>
                    </section>
                    <!-- E-Mail -->
                    <section :class="$style.changeEmail">
                        <md-field :class="getValidationClass('email', 'value')">
                            <label ref="emailLabel">E-Mail-Adresse</label>
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
                                v-if="settingsForm.email.isDisabled"
                                :class="$style.btn"
                                @click="changeEmail()"
                                class="md-raised md-primary md-dense"
                                :disabled="isGoogleEmail"
                            >
                                Ändern
                            </md-button>
                            <span
                                v-if="isGoogleEmail"
                                :class="$style.gmailWarning"
                                >Gmail-Adresse kann innerhalb von IBDb
                                <b>nicht</b> geändert werden!</span
                            >
                        </md-field>
                        <md-field
                            v-if="!settingsForm.email.isDisabled"
                            :class="getValidationClass('email', 'pass')"
                            :md-toggle-password="false"
                        >
                            <label>Password</label>
                            <md-input
                                type="password"
                                v-model="settingsForm.email.pass"
                            />
                            <span
                                class="md-error"
                                v-if="!$v.settingsForm.email.pass.required"
                                >Passwort erforderlich</span
                            >
                        </md-field>
                        <div
                            :class="$style.btnGroup"
                            v-if="!settingsForm.email.isDisabled"
                        >
                            <md-button
                                :class="[$style.cancelBtn, $style.btn]"
                                class="md-raised md-dense md-accent"
                                @click="abortChange('email')"
                                >Abbrechen</md-button
                            >
                            <md-button
                                :class="[$style.saveBtn, $style.btn]"
                                class="md-raised md-dense"
                                @click="updateEmail()"
                                >Speichern</md-button
                            >
                        </div>
                    </section>
                    <!-- Password -->
                    <section v-if="settingsForm.newPassword.isDisabled">
                        <md-field :md-toggle-password="false">
                            <label>Passwort</label>
                            <md-input
                                v-model="settingsForm.password.value"
                                :disabled="settingsForm.password.isDisabled"
                                @select="
                                    $event.target.selectionStart =
                                        $event.target.selectionEnd
                                "
                            />
                            <md-button
                                :class="$style.btn"
                                class="md-raised md-primary md-dense"
                                @click="changePassword()"
                                :disabled="isGoogleEmail"
                                >Ändern</md-button
                            >
                            <span
                                v-if="isGoogleEmail"
                                :class="$style.gmailWarning"
                                >Gmail-Passwort kann innerhalb von IBDb
                                <b>nicht</b> geändert werden!</span
                            >
                        </md-field>
                    </section>
                    <!-- Change Password -->
                    <section
                        :class="$style.changePass"
                        v-if="!settingsForm.newPassword.isDisabled"
                    >
                        <section>
                            <md-field
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
                                    v-else-if="
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
                                @click="abortChange('pass')"
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
                    <section
                        :class="$style.darkMode"
                        :style="isGoogleEmail ? 'margin-top: 25px;' : ''"
                    >
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
                <div :class="$style.deleteContainer">
                    <md-button
                        :class="$style.deleteAccountBtn"
                        class="md-accent"
                        @click="deleteAccountData.show = true"
                    >
                        Account löschen
                    </md-button>
                </div>
            </md-card-content>
        </md-card>
        <!-- Delete Display Image -->
        <md-dialog-confirm
            :md-active.sync="isDeleteDisplayImage"
            md-title="Profilbild wirklich löschen?"
            md-content="Das Profilbild kann nicht wiederhergestellt werden!"
            md-confirm-text="Löschen"
            md-cancel-text="Abbrechen"
            @md-confirm="deleteDisplayImage()"
            @md-cancel="isDeleteDisplayImage = false"
        />
        <!-- Delete Account -->
        <md-dialog :class="$style.deleteAccountDialog" :md-active.sync="deleteAccountData.show">
            <md-icon :class="$style.icon">delete</md-icon>
            <md-dialog-title>Account löschen?</md-dialog-title>
            <md-dialog-content>
                Es werden<br />
                - deine gesamte Bibliothek<br />
                - deine Statistiken<br />
                - deine Favoriten<br />
                - & deine Autoren<br />
                endgültig gelöscht<br /><br />
                Gebe "account löschen" ein um zu bestätigen
                <md-field>
                    <md-input v-model="deleteAccountData.input" />
                </md-field>
                <md-dialog-actions>
                    <md-button class="md-raised" @click="deleteAccountData.show = false">Abbrechen</md-button>
                    <md-button class="md-accent md-raised" :disabled="isDeletionConfirmed" @click="deleteAccount()">Account löschen</md-button>
                </md-dialog-actions>
            </md-dialog-content>
        </md-dialog>
    </div>
</template>

<script src="./Settings.ts"></script>

<style src="./Settings.scss" lang="scss" module></style>
