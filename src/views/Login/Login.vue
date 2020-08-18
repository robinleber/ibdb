<template>
    <div :class="$style.login">
        <form
            @keyup.enter="login()"
            class="md-layout md-elevation-10"
            novalidate
        >
            <md-card :class="$style.loginCard" class="md-layout-item">
                <img src="@/assets/logo.svg" :class="$style.logo" />
                <div :class="$style.loginText">Login</div>

                <md-card-content :class="$style.content">
                    <md-field>
                        <label>E-Mail</label>
                        <md-input
                            type="email"
                            id="email"
                            autocomplete="email"
                            v-model="signIn.email"
                        />
                    </md-field>

                    <md-field>
                        <label>Passwort</label>
                        <md-input
                            type="password"
                            id="password"
                            autocomplete="password"
                            v-model="signIn.pass"
                        />
                    </md-field>
                    <el-link :underline="false" @click="resetPass()" :class="$style.forgotPass">
                        Passwort vergessen?
                    </el-link>
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

                <md-divider style="margin-top: 15px;" />

                <div :class="$style.notAMemberTxt">
                    Noch keinen Account?
                    <br />
                    <el-link
                        :underline="false"
                        @click="$router.replace('SignUp')"
                        >Hier registrieren</el-link
                    >
                </div>
            </md-card>
        </form>
    </div>
</template>

<script src="./Login.ts" lang="ts"></script>

<style src="./Login.scss" lang="scss" module></style>
