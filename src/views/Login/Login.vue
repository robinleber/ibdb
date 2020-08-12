<template>
    <div
        :class="$style.login"
        element-loading-background="#000000CC"
        element-loading-text="Anmelden..."
        v-loading="isLoading"
    >
        <form
            novalidate
            class="md-layout md-elevation-10"
            @keyup.enter="$router.push('home')"
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
                        @click="$router.push('home')"
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
                <div :class="$style.notAMemberTxt">
                    Noch keinen Account?
                    <br />
                    <el-link :underline="false">Hier registrieren</el-link>
                </div>
            </md-card>
        </form>
    </div>
</template>

<script src="./Login.ts" lang="ts"></script>

<style src="./Login.scss" lang="scss" module></style>
