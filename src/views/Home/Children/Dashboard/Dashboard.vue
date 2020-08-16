<template>
    <div :class="$style.dashboard">
        <md-card class="md-primary" :class="$style.bookCount">
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
        <md-card class="md-accent" :class="$style.pagesRead">
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
    </div>
</template>

<script src="./Dashboard.ts" lang="ts"></script>

<style src="./Dashboard.scss" lang="scss" module></style>
