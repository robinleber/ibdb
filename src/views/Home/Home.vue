<template>
    <div :class="$style.home">
        <div :class="$style.menu" class="md-elevation-3">
            <div :class="$style.logo">IBDb</div>
            <md-tabs :class="$style.navBar" md-sync-route class="md-primary">
                <md-tab
                    id="tab-dashboard"
                    md-icon="dashboard"
                    md-label="Dashboard"
                    to="Dashboard"
                />
                <md-tab
                    id="tab-books"
                    md-icon="book"
                    md-label="Bibliothek"
                    to="Books"
                />
                <md-tab
                    id="tab-authors"
                    md-icon="history_edu"
                    md-label="Autoren"
                    to="Authors"
                />
                <md-tab
                    id="tab-favorites"
                    md-icon="favorite"
                    md-label="Favoriten"
                    to="Favorites"
                />
            </md-tabs>
            <span :class="$style.msg">
                <span class="md-title"> Hallo, {{ userName }} </span>
                <br />
                <span class="md-subheading" :class="$style.sub"
                    >Willkommen zurück</span
                >
            </span>
            <md-ripple :class="$style.menuRipple" class="md-elevation-3">
                <md-menu :md-offset-y="15" :class="$style.avatar">
                    <div style="height: 100%; width: 100%;" md-menu-trigger>
                        <img :src="profileImage[0]" v-if="profileImage" />
                        <img src="@/assets/img/avatar_default.png" v-else />
                    </div>

                    <md-menu-content>
                        <md-menu-item @click="$router.replace('profile')">
                            <md-icon>face</md-icon>
                            <span>Profil</span>
                        </md-menu-item>
                        <md-menu-item @click="$router.replace('settings')">
                            <md-icon>settings</md-icon>
                            <span>Einstellungen</span>
                        </md-menu-item>
                        <md-menu-item class="md-accent" @click="logout()">
                            <md-icon class="md-accent">exit_to_app</md-icon>
                            <span>Abmelden</span>
                        </md-menu-item>
                    </md-menu-content>
                </md-menu>
            </md-ripple>
        </div>
        <router-view :class="$style.routerView" />
    </div>
</template>

<script src="./Home.ts" lang="ts"></script>

<style src="./Home.scss" lang="scss" module></style>
