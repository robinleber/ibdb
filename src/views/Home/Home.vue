<template>
  <div :class="$style.home">
    <el-menu default-active="1" :class="$style.navBar" mode="horizontal" router>
        <img :class="$style.navItem" src="@/assets/logo.svg" style="margin-left: 10px">
        <el-menu-item index="1" :class="$style.navItem" route="Books">
          <i class="fas fa-book" /> 
          <span>Bücher</span>
        </el-menu-item>
        <el-menu-item index="2" :class="$style.navItem" route="Profile">
          <i class="fas fa-user" /> 
          <span>Profil</span>
        </el-menu-item>
        <el-menu-item index="3" :class="$style.navItem" route="Settings">
          <i class="fas fa-cogs" /> 
          <span>Einstellungen</span>
        </el-menu-item>
        <el-input
          :class="[$style.searchInput, $style.navItem]"
          placeholder="Suche..."
          v-model="navBar.search"
        >
          <el-button slot="append" :class="$style.searchBtn" type="primary" icon="fas fa-search" />
        </el-input>
        <div :class="$style.lastItem">
          <span>Hallo, {{ username }}</span>
          <el-dropdown trigger="click" slot="dropdown">
            <el-avatar :class="$style.avatar">
              <img src="@/assets/avatar.png">
            </el-avatar>
            <el-dropdown-menu>
              <el-dropdown-item>
                  <router-link to="login">
                    <i class="fas fa-sign-out-alt" />
                    <span>Abmelden</span>
                  </router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
    </el-menu>
    <router-view :class="$style.routerView" />
  </div>
</template>

<script src="./Home.ts" lang="ts"></script>

<style src="./Home.scss" lang="scss" module></style>