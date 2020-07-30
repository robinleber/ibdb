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
      text-color="#323232"
    >
      <img :class="$style.logo" src="@/assets/logo_no_borders.svg" style="margin-left: 10px" />
      <el-menu-item index="1" :class="$style.navItem" route="Books">
        <i class="fas fa-book" />
        <span>Bibliothek</span>
      </el-menu-item>
      <el-menu-item index="4" :class="$style.navItem" route="Authors">
        <i class="fas fa-feather-alt" />
        <span>Autoren</span>
      </el-menu-item>
      <el-menu-item index="2" :class="$style.navItem" route="Profile">
        <i class="fas fa-user" />
        <span>Profil</span>
      </el-menu-item>
      <el-menu-item index="3" :class="$style.navItem" route="Settings">
        <i class="fas fa-cogs" />
        <span>Einstellungen</span>
      </el-menu-item>
      <md-field :class="$style.searchInput" md-clearable md-inline>
        <label>Suchen</label>
        <md-input v-model="navBar.search" />
      </md-field>
      <md-button class="md-icon-button md-primary md md-raised">
        <md-icon>search</md-icon>
      </md-button>
      <div :class="$style.lastItem">
        <span>Hallo, {{ username }}</span>
        <md-menu>
          <img src="@/assets/avatar.png" :class="$style.avatar" />

          <md-menu-content>
            <md-menu-item @click="$router.push('login')">
              <md-icon>exit_to_app</md-icon>
              <span>Abmelden</span>
            </md-menu-item>
          </md-menu-content>
        </md-menu>
      </div>
    </el-menu>
    <router-view :class="$style.routerView" />
  </div>
</template>

<script src="./Home.ts" lang="ts"></script>

<style src="./Home.scss" lang="scss" module></style>