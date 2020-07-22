<template>
    <div
        :class="$style.login"
        v-loading="isLoading"
        element-loading-text="Anmelden..."
        element-loading-background="#000000CC"
    >
        <div :class="$style.header">
            <img :class="$style.logo" height="125px" src="@/assets/logo.svg">
            <span :class="$style.label">Internet Book Database</span>
        </div>
        <el-card :class="$style.signInContainer">
            <span :class="$style.cardHeader" slot="header">
                <el-row>
                    <el-col :span="12">Anmelden</el-col>
                    <el-col :span="12" style="padding-left: 1em;">Registrieren</el-col>
                </el-row>
            </span>
            <el-row :class="$style.userData">
                <el-col :class="$style.signIn" :span="12">
                    <el-form>
                        <el-form-item label="E-Mail">
                            <el-input v-model="signIn.user" />
                        </el-form-item>
                        <el-form-item label="Passwort">
                            <el-input v-model="signIn.pass" type="password" show-password />
                        </el-form-item>
                        <!-- <el-form-item>
                            <el-checkbox v-model="signIn.rememberMe">E-Mail-Adresse merken</el-checkbox>
                            <el-checkbox v-model="signIn.remainLoggedIn">Angemeldet bleiben (180 Tage)</el-checkbox>
                        </el-form-item> -->
                        <el-form-item>
                            <el-button :class="$style.submitBtn" @click="$router.push('Home')" type="primary">Anmelden</el-button>
                        </el-form-item>
                        <el-button style="width: 100%; border: 1px solid #148dff" @click="$router.push('Home')">
                            <img src="https://www.shareicon.net/data/256x256/2016/07/10/119930_google_512x512.png" style="align-items: middle;" width="16px" alt="">
                            Mit Google anmelden
                        </el-button>
                    </el-form>
                </el-col>
                <el-col :class="$style.signUp" :span="12">
                    <el-form>
                        <el-form-item label="E-Mail">
                            <el-input v-model="signUp.user" />
                        </el-form-item>
                        <el-form-item label="Passwort">
                            <el-input v-model="signUp.pass" type="password" show-password />
                        </el-form-item>
                        <el-form-item label="Passwort wiederholden">
                            <el-input v-model="signUp.passRepeat" type="password" show-password />
                        </el-form-item>
                        <el-button :class="$style.submitBtn" type="primary">Registrieren</el-button>
                    </el-form>
                </el-col>
            </el-row>
            <el-link type="primary" :underline="false" :class="$style.forgotPassword">Passwort vergessen?</el-link>
        </el-card>
    </div>
</template>

<script src="./Login.ts" lang="ts">
</script>

<style src="./Login.scss" lang="scss" module>
</style>