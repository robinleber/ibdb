<template>
    <div :class="$style.login">
        <form
            @keyup.enter="login()"
            @submit.prevent="login()"
            class="md-layout md-elevation-10"
            novalidate
        >
            <md-card :class="$style.loginCard" class="md-layout-item">
                <img src="@/assets/img/logo.svg" :class="$style.logo" />
                <div :class="$style.loginText" class="md-display-1">Login</div>

                <md-card-content :class="$style.content">
                    <md-field :class="getValidationClass('email')">
                        <label>E-Mail</label>
                        <md-input
                            autocomplete="email"
                            clearable
                            id="email"
                            type="email"
                            v-model="signIn.email"
                        />
                        <span class="md-error" v-if="!$v.signIn.email.required">
                            E-Mail erforderlich
                        </span>
                        <span class="md-error" v-if="!$v.signIn.email.email">
                            E-Mail ist ungültig
                        </span>
                    </md-field>

                    <md-field :class="getValidationClass('pass')">
                        <label>Passwort</label>
                        <md-input
                            autocomplete="password"
                            clearable
                            id="password"
                            type="password"
                            v-model="signIn.pass"
                        />
                        <span class="md-error" v-if="!$v.signIn.pass.required">
                            Passwort erforderlich
                        </span>
                    </md-field>
                    <el-link
                        :class="$style.forgotPass"
                        :underline="false"
                        @click="resetPass()"
                    >
                        Passwort vergessen?
                    </el-link>
                    <md-checkbox :class="$style.rememberMe" v-model="signIn.rememberMe"
                        >E-Mail-Adresse merken</md-checkbox
                    >
                    <md-checkbox
                        :class="$style.stayLoggedIn"
                        v-model="signIn.remainLoggedIn"
                        >Angemeldet bleiben</md-checkbox
                    >
                </md-card-content>

                <md-card-actions :class="$style.btnGrp">
                    <md-button
                        :class="$style.loginBtn"
                        @click="login()"
                        class="md-primary md-raised"
                        >Anmelden</md-button
                    >
                </md-card-actions>
                <div :class="$style.loginWithTxt">Oder anmelden mit</div>
                <md-card-actions :class="$style.socialBtnGrp">
                    <md-button
                        :class="$style.googleBtn"
                        class="md-accent md-raised"
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
