<template>
  <div :class="$style.home">
    <el-menu default-active="1" :class="$style.navBar" mode="horizontal">
        <img :class="$style.navItem" src="../assets/logo.svg" style="margin-left: 10px">
        <el-menu-item index="1" :class="$style.navItem">
          <i class="fas fa-book" /> 
          <span>Bücher</span>
        </el-menu-item>
        <el-menu-item index="2" :class="$style.navItem">
          <i class="fas fa-user" /> 
          <span>Profil</span>
        </el-menu-item>
        <el-menu-item index="3" :class="$style.navItem">
          <i class="fas fa-cogs" /> 
          <span>Einstellungen</span>
        </el-menu-item>
        <el-input
          :class="[$style.search, $style.navItem]"
          placeholder="Suche..."
          v-model="navBar.search"
        >
        </el-input>
        <el-button :class="$style.searchBtn" type="primary" icon="fas fa-search" />
        <div :class="$style.lastItem">
          <span>Hallo, Robin</span>
          <el-avatar size="large" />
        </div>
    </el-menu>
  </div>
</template>

<script src="./Home.ts" lang="ts"></script>

<style src="./Home.scss" lang="scss" module></style>