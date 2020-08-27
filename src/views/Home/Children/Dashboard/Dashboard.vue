<template>
    <div :class="$style.dashboard">
        <md-card :class="$style.statistics">
            <md-card-header :class="$style.header">
                <md-card class="md-accent" :class="$style.headerCard">
                    <md-icon :class="$style.headerIcon">analytics</md-icon>
                    <span class="md-headline">
                        Statistiken
                    </span>
                </md-card>
            </md-card-header>
            <md-card-content :class="$style.content">
                <md-card
                    class="md-elevation-0"
                    :class="[$style.card, $style.bookCount]"
                >
                    <md-card-header :class="$style.header" class="md-elevation-3s">
                        <md-card-header-text>
                            <div class="md-title">Bücher</div>
                            <div class="md-subhead">Anzahl Bücher</div>
                        </md-card-header-text>
                    </md-card-header>
                    <md-card-content :class="$style.content">
                        <span :class="$style.super">Du hast</span><br />
                        <span class="md-display-4" :class="$style.counter">{{ bookCount }}</span
                        ><br />
                        <div :class="$style.sub">
                            Bücher in deiner Bibliothek
                        </div>
                    </md-card-content>
                </md-card>
                <md-card
                    class="md-elevation-0"
                    :class="[$style.card, $style.pagesRead]"
                >
                    <md-card-header :class="$style.header" class="md-elevation-3s">
                        <md-card-header-text>
                            <div class="md-title">Seiten</div>
                            <div class="md-subhead">Seiten gelesen</div>
                        </md-card-header-text>
                    </md-card-header>
                    <md-card-content :class="$style.content">
                        <span :class="$style.super">Du hast</span><br />
                        <span class="md-display-4" :class="$style.counter">{{ pagesRead }}</span
                        ><br />
                        <div :class="$style.sub">Seiten gelesen</div>
                    </md-card-content>
                </md-card>
                <md-card
                    class="md-elevation-0"
                    :class="[$style.card, $style.booksRead]"
                >
                    <md-card-header :class="$style.header" class="md-elevation-3s">
                        <md-card-header-text>
                            <div class="md-title">Bücher</div>
                            <div class="md-subhead">Bücher gelesen</div>
                        </md-card-header-text>
                    </md-card-header>
                    <md-card-content :class="$style.content">
                        <span :class="$style.super">Du hast</span><br />
                        <span class="md-display-4" :class="$style.counter">{{ booksRead }}</span
                        ><br />
                        <div :class="$style.sub">Bücher gelesen</div>
                    </md-card-content>
                </md-card>
            </md-card-content>
        </md-card>
    </div>
</template>

<script src="./Dashboard.ts" lang="ts"></script>

<style src="./Dashboard.scss" lang="scss" module></style>
