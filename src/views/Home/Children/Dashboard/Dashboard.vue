<template>
    <div :class="$style.dashboard">
        <md-card class="md-primary md-elevation-3" :class="[$style.card, $style.bookCount]">
            <md-card-header>
                <md-card-header-text>
                    <div class="md-title">Bücher</div>
                    <div class="md-subhead">Anzahl Bücher</div>
                </md-card-header-text>
            </md-card-header>
            <md-card-content :class="$style.content">
                <span :class="$style.super">Du hast</span><br />
                <span :class="$style.counter">{{ bookCount }}</span><br />
                <div :class="$style.sub">Bücher in deiner Bibliothek</div>
            </md-card-content>
        </md-card>
        <md-card class="md-accent md-elevation-3" :class="[$style.card, $style.pagesRead]">
            <md-card-header>
                <md-card-header-text>
                    <div class="md-title">Seiten</div>
                    <div class="md-subhead">Seiten gelesen</div>
                </md-card-header-text>
            </md-card-header>
            <md-card-content :class="$style.content">
                <span :class="$style.super">Ingesamt</span><br />
                <span :class="$style.counter">{{ pagesRead }}</span><br />
                <div :class="$style.sub">Seiten gelesen</div>
            </md-card-content>
        </md-card>
        <md-card class="md-elevation-3" :class="[$style.card, $style.booksRead]">
            <md-card-header>
                <md-card-header-text>
                    <div class="md-title">Bücher</div>
                    <div class="md-subhead">Bücher gelesen</div>
                </md-card-header-text>
            </md-card-header>
            <md-card-content :class="$style.content">
                <span :class="$style.super">Ingesamt</span><br />
                <span :class="$style.counter">{{ booksRead }}</span><br />
                <div :class="$style.sub">Seiten gelesen</div>
            </md-card-content>
        </md-card>
        <md-card class="md-elevation-3" :class="[$style.card, $style.temp]">
            <md-card-header>
                <md-card-header-text>
                    <div class="md-title">Bücher</div>
                    <div class="md-subhead">Bücher gelesen</div>
                </md-card-header-text>
            </md-card-header>
            <md-card-content :class="$style.content">
                <span :class="$style.super">Ingesamt</span><br />
                <span :class="$style.counter">{{ booksRead }}</span><br />
                <div :class="$style.sub">Seiten gelesen</div>
            </md-card-content>
        </md-card>
    </div>
</template>

<script src="./Dashboard.ts" lang="ts"></script>

<style src="./Dashboard.scss" lang="scss" module></style>
