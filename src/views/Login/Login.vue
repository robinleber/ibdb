<template>
    <div :id="$style.login">
        <div class="md-layout">
            <div class="md-layout-item md-elevation-10" :class="$style.col1">
                <div :class="$style.container">
                    <div class="md-display-4" :class="$style.logo">IBDb</div>
                    <span class="md-caption" :class="$style.caption">Dein digitales Bücherregal</span>
                    <div :class="$style.introduction">
                        Auch gibt es niemanden, der den Schmerz an sich liebt, sucht oder wünscht, nur, weil er Schmerz
                        ist, es sei denn, es kommt zu zufälligen Umständen, in denen Mühen und Schmerz ihm große Freude
                        bereiten können.
                    </div>
                </div>
            </div>
            <div class="md-layout-item" :class="$style.col2">
                <form @keyup.enter="login()" @submit.prevent="login()" class="md-layout md-elevation-10" novalidate>
                    <md-card :class="$style.loginCard" class="md-layout-item">
                        <div :class="$style.loginTxt">
                            <span>
                                Login
                            </span>
                        </div>

                        <md-card-content :class="$style.content">
                            <md-button :class="$style.googleBtn" class="md-accent md-raised">
                                <img :class="$style.googleIcon" src="@/assets/images/google.svg" />
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
                            <el-link :class="$style.forgotPass" :underline="false" @click="resetPass()">
                                Passwort vergessen?
                            </el-link><br />
                            <md-checkbox :class="$style.rememberMe" v-model="signIn.rememberMe"
                                >E-Mail-Adresse merken</md-checkbox
                            >
                            <md-checkbox :class="$style.stayLoggedIn" v-model="signIn.remainLoggedIn"
                                >Angemeldet bleiben</md-checkbox
                            >
                        </md-card-content>

                        <md-card-actions :class="$style.btnGrp">
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
                            <el-link :underline="false" @click="$router.replace('SignUp')">Hier registrieren</el-link>
                        </div>
                    </md-card>
                </form>
            </div>
        </div>
    </div>
</template>

<script src="./Login.ts" lang="ts"></script>

<style src="./Login.scss" lang="scss" module></style>
