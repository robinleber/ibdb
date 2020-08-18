<template>
    <div :class="$style.home">
        <el-menu
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
                src="@/assets/logo_no_borders.svg"
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
                            src="@/assets/avatar.png"
                            :class="$style.avatar"
                            md-menu-trigger
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
        </el-menu>
        <router-view :class="$style.routerView" />
    </div>
</template>

<script src="./Home.ts" lang="ts"></script>

<style src="./Home.scss" lang="scss" module></style>
