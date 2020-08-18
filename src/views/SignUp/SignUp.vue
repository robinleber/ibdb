<template>
    <div :class="$style.signUp">
        <form
            @keyup.enter="createUser()"
            class="md-layout md-elevation-10"
            novalidate
        >
            <md-card :class="$style.signUpCard">
                <img src="@/assets/logo.svg" :class="$style.logo" />
                <div :class="$style.signUpTxt">Registrieren</div>

                <md-steppers :md-active-step.sync="activeStep">
                    <md-step
                        id="first"
                        md-label="Benutzerdaten"
                        :md-done.sync="steps[0].step"
                        :class="$style.firstStep"
                    >
                        <md-field>
                            <label>E-Mail</label>
                            <md-input
                                type="email"
                                id="email"
                                autocomplete="email"
                                v-model="signUp.email"
                            />
                        </md-field>

                        <md-field>
                            <label for="email">Passwort</label>
                            <md-input
                                type="password"
                                id="pass"
                                autocomplete="password"
                                v-model="signUp.pass"
                            />
                        </md-field>
                        <md-field>
                            <label>Passwort wiederholen</label>
                            <md-input
                                type="password"
                                id="repeatPass"
                                autocomplete="password"
                                v-model="signUp.passRepeat"
                            />
                        </md-field>

                        <md-card-actions>
                            <md-button
                                :class="$style.createAccountBtn"
                                @click="createUser()"
                                class="md-accent md-raised"
                            >
                                Account erstellen
                            </md-button>
                        </md-card-actions>
                    </md-step>

                    <md-step
                        id="second"
                        md-label="Profil"
                        :md-done.sync="steps[1].step"
                        :class="$style.secondStep"
                    >
                        <div :class="$style.addProfilePicture">
                            <md-icon>face</md-icon>
                        </div>
                        <md-button class="md-raised md-primary"
                            >Profilbild hinzufügen</md-button
                        >
                        <md-field>
                            <label>Name</label>
                            <md-input
                                v-model="signUp.user"
                                type="text"
                                autocomplete="given-name"
                            ></md-input>
                        </md-field>
                        <md-card-actions :class="$style.cardActions">
                            <md-button
                                :class="$style.goBackBtn"
                                @click="goBack()"
                                class="md-raised"
                            >
                                Zurück
                            </md-button>
                            <md-button
                                :class="$style.completeBtn"
                                @click="completeSignUp()"
                                class="md-raised md-accent"
                            >
                                Fertigstellen
                            </md-button>
                        </md-card-actions>
                    </md-step>
                </md-steppers>

                <md-divider />

                <div :class="$style.alreadyAMemberTxt">
                    Du hast schon einen Account?
                    <br />
                    <el-link
                        :underline="false"
                        @click="$router.replace('Login')"
                        >Zum Login</el-link
                    >
                </div>
            </md-card>
        </form>
    </div>
</template>

<script src="./SignUp.ts" lang="ts"></script>

<style src="./SignUp.scss" lang="scss" module></style>
