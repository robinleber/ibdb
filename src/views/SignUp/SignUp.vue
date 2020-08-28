<template>
    <div :class="$style.signUp">
        <md-card :class="$style.signUpCard">
            <img src="@/assets/img/logo.svg" :class="$style.logo" />
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
                            :class="getValidationClass('signUp', 'email')"
                        >
                            <label>E-Mail</label>
                            <md-input
                                autocomplete="email"
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

                        <md-field :class="getValidationClass('signUp', 'pass')">
                            <label for="email">Passwort</label>
                            <md-input
                                autocomplete="password"
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
                            :class="getValidationClass('signUp', 'passRepeat')"
                        >
                            <label>Passwort wiederholen</label>
                            <md-input
                                autocomplete="password"
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
                                !imageUrl || isImageLoading
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
                            <md-icon v-if="!imageUrl" :class="$style.face">
                                face
                            </md-icon>
                            <md-icon v-if="!imageUrl" :class="$style.add">
                                add_box
                            </md-icon>
                            <img
                                :src="imageUrl"
                                :title="imageName"
                                class="md-elevation-3"
                                v-if="imageUrl"
                            />
                            <md-button
                                :class="$style.deleteImageBtn"
                                @click="imageUrl = null"
                                class="md-accent md-fab md-raised md-dense"
                                v-if="imageUrl"
                            >
                                <md-icon>delete</md-icon>
                            </md-button>
                        </div>
                        <md-button
                            class="md-raised md-primary"
                            @click="pickImage()"
                            >Profilbild hochladen</md-button
                        >
                        <input
                            @change="onImagePicked"
                            accept="image/*"
                            ref="imageInput"
                            style="display: none;"
                            type="file"
                        />
                        <md-field
                            :class="getValidationClass('profile', 'user')"
                        >
                            <label>Anzeigename</label>
                            <md-input
                                autocomplete="given-name"
                                type="text"
                                v-model="profile.user"
                                ref="nameInput"
                            />
                            <span
                                class="md-error"
                                v-if="!$v.profile.user.required"
                            >
                                Anzeigename erforderlich
                            </span>
                            <span
                                class="md-error"
                                v-if="!$v.profile.user.minLength"
                            >
                                Anzeigename muss min. 3 Zeichen enthalten
                            </span>
                            <span
                                class="md-error"
                                v-if="!$v.profile.user.maxLength"
                            >
                                Anzeigename darf max. 32 Zeichen enthalten
                            </span>
                        </md-field>
                        <md-card-actions :class="$style.cardActions">
                            <md-button
                                :class="$style.completeBtn"
                                :disabled="profile.user == ''"
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
                Du hast schon einen Account?
                <br />
                <el-link :underline="false" @click="$router.replace('Login')"
                    >Zum Login</el-link
                >
            </div>
        </md-card>
    </div>
</template>

<script src="./SignUp.ts" lang="ts"></script>

<style src="./SignUp.scss" lang="scss" module></style>
