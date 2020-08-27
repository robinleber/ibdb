<template>
    <div :class="$style.home">
        <!-- <el-menu
            :class="$style.navBar"
            active-text-color="#ff5252"
            background-color="#fafafa"
            class="md-elevation-3"
            default-active="1"
            mode="horizontal"
            router
            text-color="#002651"
        >
            <img
                :class="$style.logo"
                src="@/assets/img/logo_no_borders.svg"
                style="margin-left: 10px"
            />
            <el-menu-item index="1" :class="$style.navItem" route="Dashboard">
                <i class="fas fa-chart-line" />
                <span>Dashboard</span>
            </el-menu-item>
            <el-menu-item index="2" :class="$style.navItem" route="Books">
                <i class="fas fa-book" />
                <span>Bibliothek</span>
            </el-menu-item>
            <el-menu-item index="3" :class="$style.navItem" route="Authors">
                <i class="fas fa-feather-alt" />
                <span>Autoren</span>
            </el-menu-item>
            <md-field
                :class="$style.searchInput"
                md-clearable
                md-inline
                role="search"
            >
                <label>Suchen</label>
                <md-input v-model="navBar.search" />
            </md-field>
            <md-button class="md-icon-button md-primary md md-raised">
                <md-icon>search</md-icon>
            </md-button>
            <div :class="$style.lastItem">
                <span>Hallo, {{ username }}</span>
                <md-ripple :class="$style.avatarContent">
                    <md-menu :md-offset-x="0" :md-offset-y="10">
                        <img
                            :src="navBar.profileSrc"
                            :class="$style.avatar"
                            md-menu-trigger
                            v-if="false"
                        />
                        <img
                            src="@/assets/img/avatar_default.png"
                            :class="$style.avatar"
                            md-menu-trigger
                            v-if="navBar.profileSrc"
                        />

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
        </el-menu> -->
        <div :class="$style.menu" class="md-elevation-3">
            <img :class="$style.logo" src="@/assets/img/logo_no_borders.svg" />
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
                <span class="md-title"> Hallo, {{ username }} </span>
                <br />
                <span class="md-subheading" :class="$style.sub">Willkommen zurück</span>
            </span>
            <md-ripple :class="$style.menuRipple" class="md-elevation-3">
                <md-menu
                    :md-offset-x="0"
                    :md-offset-y="10"
                    :class="$style.avatar"
                >
                    <img
                        md-menu-trigger
                        src="@/assets/img/avatar.png"
                        v-if="navBar.profileSrc != ''"
                    />
                    <img :src="navBar.profileSrc" md-menu-trigger v-else />

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
