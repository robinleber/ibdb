<template>
    <div :class="$style.login">
        <form
            @keyup.enter="$router.push('home')"
            class="md-layout md-elevation-10"
            novalidate
            v-if="!isRegister"
        >
            <md-card :class="$style.loginCard" class="md-layout-item">
                <img src="@/assets/logo.svg" :class="$style.logo" />
                <div :class="$style.logoText">Internet Book Database</div>

                <md-card-content :class="$style.content">
                    <md-field>
                        <label for="email">E-Mail</label>
                        <md-input
                            type="email"
                            name="email"
                            id="email"
                            autocomplete="email"
                            v-model="signIn.email"
                        />
                    </md-field>

                    <md-field>
                        <label for="email">Passwort</label>
                        <md-input
                            type="password"
                            name="password"
                            id="password"
                            autocomplete="password"
                            v-model="signIn.password"
                        />
                    </md-field>
                    <md-checkbox :class="$style.rememberMe" v-model="rememberMe"
                        >E-Mail-Adresse merken</md-checkbox
                    >
                    <md-checkbox
                        :class="$style.stayLoggedIn"
                        v-model="stayLoggedIn"
                        >Angemeldet bleiben</md-checkbox
                    >
                </md-card-content>

                <md-card-actions :class="$style.btnGrp">
                    <md-button
                        class="md-primary md-flat"
                        v-if="isRegister"
                        @click="isRegister = false"
                        >Zurück</md-button
                    >
                    <md-button
                        v-if="!isRegister"
                        class="md-primary md-raised"
                        @click="login()"
                        :class="$style.loginBtn"
                        >Anmelden</md-button
                    >
                </md-card-actions>
                <div :class="$style.loginWithTxt">Oder anmelden mit</div>
                <md-card-actions :class="$style.socialBtnGrp">
                    <md-button
                        class="md-accent md-raised"
                        :class="$style.googleBtn"
                    >
                        <i class="fab fa-google" />
                        &nbsp;Google
                    </md-button>
                    <md-button class="md-raised" :class="$style.fbBtn">
                        <i class="fab fa-facebook-f" />
                        &nbsp;Facebook
                    </md-button>
                </md-card-actions>
                <div class="md-layout">
                    <div class="md-layout-item">
                        <div :class="$style.notAMemberTxt">
                            Noch keinen Account?
                            <br />
                            <el-link
                                :underline="false"
                                @click="isRegister = true"
                                >Hier registrieren</el-link
                            >
                        </div>
                    </div>
                    <div class="md-layout-item">
                        <div :class="$style.forgotPass">
                            Passwort vergessen?
                            <br />
                            <el-link
                                :underline="false"
                                @click="resetPass()"
                                >Hier zurücksetzen</el-link
                            >
                        </div>
                    </div>
                </div>
            </md-card>
        </form>
        <form
            @keyup.enter="$router.push('home')"
            class="md-layout md-elevation-10"
            novalidate
            v-else
        >
            <md-card :class="$style.registerCard" class="md-layout-item">
                <img src="@/assets/logo.svg" :class="$style.logo" />
                <div :class="$style.logoText">Internet Book Database</div>

                <md-card-content :class="$style.content">
                    <md-field>
                        <label for="email">E-Mail</label>
                        <md-input
                            type="email"
                            name="email"
                            id="email"
                            autocomplete="email"
                            v-model="signUp.email"
                        />
                    </md-field>

                    <md-field>
                        <label for="email">Passwort</label>
                        <md-input
                            type="password"
                            name="password"
                            id="password"
                            autocomplete="password"
                            v-model="signUp.password"
                        />
                    </md-field>

                    <md-field>
                        <label for="email">Passwort wiederholen</label>
                        <md-input
                            type="password"
                            name="password"
                            id="password"
                            autocomplete="password"
                            v-model="signUp.passRepeat"
                        />
                    </md-field>
                </md-card-content>

                <md-card-actions :class="$style.btnGrp">
                    <md-button
                        class="md-primary md-raised"
                        @click="register()"
                        :class="$style.registerBtn"
                        >Registrieren
                    </md-button>
                </md-card-actions>
                <div :class="$style.alreadyAMemberTxt">
                    Du hast schon einen Account?
                    <br />
                    <el-link :underline="false" @click="isRegister = false"
                        >Zum Login</el-link
                    >
                </div>
            </md-card>
        </form>
    </div>
</template>

<script src="./Login.ts" lang="ts"></script>

<style src="./Login.scss" lang="scss" module></style>
