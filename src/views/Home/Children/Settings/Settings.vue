<template>
    <div :id="$style.settings">
        <md-card :class="$style.mainContainer">
            <md-card-header :class="$style.header">
                <div class="md-headline">Einstellungen</div>
            </md-card-header>
            <md-card-content>
                <section :class="$style.imageContainer">
                    <div :class="$style.wrapper">
                        <img
                            class="md-elevation-3"
                            :src="userProfile.displayImagePath"
                            :class="$style.image"
                            alt=""
                        />
                        <md-button
                            :class="$style.editImageBtn"
                            class="md-raised md-accent md-fab"
                        >
                            <md-icon>create</md-icon>
                        </md-button>
                    </div>
                </section>
                <section>
                    <md-field>
                        <label>Name</label>
                        <md-input
                            v-model="form.name.value"
                            @input="checkChange('name')"
                        />
                    </md-field>
                    <md-button
                        class="md-raised md-primary"
                        :disabled="form.name.isDisabled"
                        >Speichern</md-button
                    >
                </section>
                <section>
                    <md-field>
                        <label>E-Mail-Adresse</label>
                        <md-input
                            v-model="form.email.value"
                            @input="checkChange('email')"
                        />
                    </md-field>
                    <md-button
                        class="md-raised md-primary"
                        :disabled="form.email.isDisabled"
                        >Speichern</md-button
                    >
                </section>
                <section>
                    <md-field :md-toggle-password="false">
                        <label>Passwort</label>
                        <md-input
                            disabled
                            v-model="form.password.value"
                            type="password"
                            @input="checkChange('email')"
                        />
                    </md-field>
                    <md-button class="md-raised md-primary"
                        >Ändern</md-button
                    >
                </section>
            </md-card-content>
        </md-card>
    </div>
</template>

<script src="./Settings.ts"></script>

<style src="./Settings.scss" lang="scss" module></style>
