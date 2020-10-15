<template>
    <div :id="$style.signUp">
        <CropperDialog
            :imageUrl="imageUrl"
            :isCropperDialog="isUploadImageDialog"
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
        <div class="md-layout">
            <div class="md-layout-item md-elevation-10" :class="$style.col1">
                <div :class="$style.container">
                    <div class="md-display-4" :class="$style.logo">IBDb</div>
                    <span class="md-caption" :class="$style.caption"
                        >Dein digitales Bücherregal</span
                    >
                    <div :class="$style.introduction">
                        Auch gibt es niemanden, der den Schmerz an sich liebt,
                        sucht oder wünscht, nur, weil er Schmerz ist, es sei
                        denn, es kommt zu zufälligen Umständen, in denen Mühen
                        und Schmerz ihm große Freude bereiten können.
                    </div>
                </div>
            </div>
            <div class="md-layout-item" :class="$style.col2">
                <md-card :class="$style.signUpCard">
                    <div :class="$style.signUpTxt" class="md-display-1">
                        Registrieren
                    </div>

                    <md-steppers
                        :md-active-step.sync="activeStep"
                        md-alternative
                        :class="$style.steps"
                    >
                        <md-step
                            :class="$style.firstStep"
                            :md-done.sync="steps[0].step"
                            :md-error="firstStepError"
                            id="first"
                            md-label="Benutzerdaten"
                        >
                            <form
                                @keyup.enter="nextStep()"
                                @submit.prevent="nextStep()"
                                novalidate
                            >
                                <md-field
                                    :class="
                                        getValidationClass('signUp', 'email')
                                    "
                                >
                                    <label>E-Mail</label>
                                    <md-input
                                        autofocus
                                        id="email"
                                        ref="emailInput"
                                        type="email"
                                        v-model="signUp.email"
                                    />
                                    <span
                                        class="md-error"
                                        v-if="!$v.signUp.email.required"
                                    >
                                        E-Mail erforderlich
                                    </span>
                                    <span
                                        class="md-error"
                                        v-if="!$v.signUp.email.email"
                                    >
                                        E-Mail ungültig
                                    </span>
                                </md-field>

                                <md-field
                                    :class="
                                        getValidationClass('signUp', 'pass')
                                    "
                                >
                                    <label for="email">Passwort</label>
                                    <md-input
                                        id="pass"
                                        type="password"
                                        v-model="signUp.pass"
                                    />
                                    <span
                                        class="md-error"
                                        v-if="!$v.signUp.pass.required"
                                    >
                                        Passwort erforderlich
                                    </span>
                                    <span
                                        class="md-error"
                                        v-if="!$v.signUp.pass.minLength"
                                    >
                                        Passwort muss min. 8 Zeichen enthalten
                                    </span>
                                </md-field>

                                <md-field
                                    :class="
                                        getValidationClass(
                                            'signUp',
                                            'passRepeat'
                                        )
                                    "
                                >
                                    <label>Passwort wiederholen</label>
                                    <md-input
                                        id="repeatPass"
                                        type="password"
                                        v-model="signUp.passRepeat"
                                    />
                                    <span
                                        class="md-error"
                                        v-if="!$v.signUp.passRepeat.required"
                                    >
                                        Passwort wiederholen
                                    </span>
                                    <span
                                        class="md-error"
                                        v-if="
                                            !$v.signUp.passRepeat.sameAsPass &&
                                                $v.signUp.passRepeat.required
                                        "
                                    >
                                        Passwörter stimmen nicht überein
                                    </span>
                                </md-field>

                                <md-card-actions :class="$style.cardActions">
                                    <md-button
                                        :class="$style.createAccountBtn"
                                        :disabled="
                                            signUp.email == '' ||
                                                signUp.pass == '' ||
                                                signUp.passRepeat == ''
                                        "
                                        @click="nextStep()"
                                        class="md-accent md-raised"
                                    >
                                        Nächster Schritt
                                        <md-icon style="vertical-align: -7px;"
                                            >navigate_next</md-icon
                                        >
                                    </md-button>
                                </md-card-actions>
                            </form>
                        </md-step>

                        <md-step
                            :class="$style.secondStep"
                            :md-done.sync="steps[1].step"
                            :md-error.sync="secondStepError"
                            id="second"
                            md-label="Profil"
                        >
                            <form
                                @keyup.enter="createAccount()"
                                @submit.prevent="createAccount()"
                                novalidate
                            >
                                <div
                                    :class="[
                                        $style.addProfilePicture,
                                        !imageUrlCropped || isImageLoading
                                            ? $style.profilePictureBorder
                                            : '',
                                    ]"
                                >
                                    <div
                                        :class="$style.imageLoadingOverlay"
                                        v-if="isImageLoading"
                                    >
                                        <md-progress-spinner
                                            md-mode="indeterminate"
                                            :class="$style.imageLoadingSpinner"
                                        />
                                    </div>
                                    <md-icon
                                        v-if="!imageUrlCropped"
                                        :class="$style.face"
                                    >
                                        person
                                    </md-icon>
                                    <img
                                        :src="imageUrlCropped"
                                        class="md-elevation-3"
                                        v-if="imageUrlCropped"
                                    />
                                </div>
                                <div :class="$style.imageBtnGrp">
                                    <md-button
                                        @click="pickImage()"
                                        v-if="!imageUrlCropped"
                                        class="md-raised md-primary md-icon-button"
                                    >
                                        <md-icon>add</md-icon>
                                    </md-button>
                                    <md-button
                                        v-else
                                        @click="editImage()"
                                        class="md-raised md-primary md-icon-button"
                                    >
                                        <md-icon>create</md-icon>
                                    </md-button>
                                    <md-button
                                        @click="imageUrlCropped = null"
                                        class="md-accent md-fab md-raised md-dense"
                                        v-if="imageUrlCropped"
                                    >
                                        <md-icon>delete</md-icon>
                                    </md-button>
                                </div>
                                <md-field
                                    :class="
                                        getValidationClass('profile', 'user')
                                    "
                                >
                                    <label>Anzeigename</label>
                                    <md-input
                                        type="text"
                                        v-model="signUp.user"
                                        ref="nameInput"
                                    />
                                    <span
                                        class="md-error"
                                        v-if="!$v.signUp.user.required"
                                    >
                                        Anzeigename erforderlich
                                    </span>
                                    <span
                                        class="md-error"
                                        v-if="!$v.signUp.user.minLength"
                                    >
                                        Anzeigename muss min. 3 Zeichen
                                        enthalten
                                    </span>
                                    <span
                                        class="md-error"
                                        v-if="!$v.signUp.user.maxLength"
                                    >
                                        Anzeigename darf max. 32 Zeichen
                                        enthalten
                                    </span>
                                </md-field>
                                <md-card-actions :class="$style.cardActions">
                                    <md-button
                                        :class="$style.completeBtn"
                                        :disabled="
                                            signUp.user == '' &&
                                                isSignUpDisabled
                                        "
                                        @click="createAccount()"
                                        class="md-raised md-accent"
                                    >
                                        Fertigstellen
                                    </md-button>
                                </md-card-actions>
                            </form>
                        </md-step>
                    </md-steppers>

                    <md-divider />

                    <div :class="$style.alreadyAMemberTxt">
                        Schon registriert?
                        <br />
                        <el-link
                            :underline="false"
                            @click="$router.replace('Login')"
                            >Zum Login</el-link
                        >
                    </div>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script src="./SignUp.ts" lang="ts"></script>

<style src="./SignUp.scss" lang="scss" module></style>
