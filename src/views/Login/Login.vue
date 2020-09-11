<template>
    <div :class="$style.login">
        <form
            @keyup.enter="login()"
            @submit.prevent="login()"
            class="md-layout md-elevation-10"
            novalidate
        >
            <md-card :class="$style.loginCard" class="md-layout-item">
                <div :class="$style.logo">IBDb</div>

                <md-card-content :class="$style.content">
                    <md-button
                        :class="$style.googleBtn"
                        class="md-accent md-raised"
                    >
                        <img
                            :class="$style.googleIcon"
                            src="@/assets/img/google.svg"
                        />
                        Mit Google anmelden
                    </md-button>
                    <div :class="$style.loginWithTxt">
                        Oder mit E-Mail anmelden
                    </div>

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
                    <md-checkbox
                        :class="$style.rememberMe"
                        v-model="signIn.rememberMe"
                        >E-Mail-Adresse merken</md-checkbox
                    >
                    <md-checkbox
                        :class="$style.stayLoggedIn"
                        v-model="signIn.remainLoggedIn"
                        >Angemeldet bleiben</md-checkbox
                    >
                </md-card-content>

                <md-card-actions :class="$style.btnGrp" md-alignment="centered">
                    <md-button
                        :class="$style.loginBtn"
                        :disabled="isLoginDisabled"
                        @click="login()"
                        class="md-primary md-raised"
                        >Anmelden</md-button
                    >
                </md-card-actions>

                <md-divider />

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
