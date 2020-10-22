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
            <div :class="$style.append">
                <md-button
                    :class="$style.settingsLink"
                    @click="redirectRouter('/Settings')"
                    class="md-icon-button"
                >
                    <md-icon style="color: #fafafa;">settings</md-icon>
                </md-button>
                <img :class="$style.avatar" :src="getDisplayImagePath()" class="md-elevation-1" />
                <span class="md-title">{{ userProfile.name }} </span>
                <md-button
                    :class="$style.logout"
                    @click="showConfirm = true"
                    class="md-icon-button md-elevation-0"
                    md-menu-trigger
                >
                    <md-icon>exit_to_app</md-icon>
                </md-button>
            </div>
        </div>
        <md-dialog-confirm
            :md-active.sync="showConfirm"
            @md-cancel="showConfirm = false"
            @md-confirm="logout()"
            md-cancel-text="Abbrechen"
            md-confirm-text="Abmelden"
            md-title="Möchtest du dich wirklich abmelden?"
        />
        <router-view :class="$style.routerView" />
    </div>
</template>

<script src="./Home.ts" lang="ts"></script>

<style src="./Home.scss" lang="scss" module></style>
