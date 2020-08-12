<template>
    <md-dialog :md-active.sync="isAddBookDialogVisible" :class="$style.addBook">
        <md-dialog-title>Buch hinzufügen</md-dialog-title>
        <md-steppers :md-active-step.sync="activeStep" :class="$style.stepper">
            <md-step
                :class="$style.firstStep"
                id="first"
                md-label="ISBN"
                :md-done.sync="steps[0].step"
            >
                <div class="md-layout">
                    <div class="md-layout-item">
                        <div
                            md-dynamic-height
                            :class="$style.scanIsbnBtnContainer"
                        >
                            <label :class="$style.isbnInputLabel"
                                >ISBN einscannen</label
                            >
                            <md-button
                                name="scanIsbnBtn"
                                class="md-accent md-raised"
                                :class="$style.scanIsbnBtn"
                            >
                                <i class="fas fa-barcode" />
                            </md-button>
                        </div>
                    </div>
                    <div class="md-layout-item">
                        <md-field :class="$style.isbnInputField">
                            <label>ISBN</label>
                            <md-input @input="isNumber()" v-model="isbnInput" />
                        </md-field>
                        <md-button
                            :class="$style.submitIsbnBtn"
                            @click="setDone(0, 'second')"
                            class="md-raised md-primary"
                        >
                            <md-icon>check</md-icon>Bestätigen
                        </md-button>
                    </div>
                </div>
            </md-step>
            <md-step
                id="second"
                md-label="Buchinfo überprüfen"
                :md-done.sync="steps[1].step"
                :class="$style.secondStep"
            >
                <div :class="$style.isbnWrapper">
                    <md-chip
                        md-clickable
                        :class="$style.isbn13"
                        class="md-elevation-3 md-accent"
                    >
                        <strong>ISBN-13</strong>
                        <span @click="$event.target.select()">
                            9876112550091
                        </span>
                    </md-chip>
                    <md-chip
                        md-clickable
                        :class="$style.isbn10"
                        class="md-elevation-3 md-accent"
                    >
                        <strong>ISBN-10</strong>
                        <span @click="$event.target.select()">
                            6112550710
                        </span>
                    </md-chip>
                </div>
                <div class="md-layout" :class="$style.topBookInfo">
                    <div class="layout-item" :class="$style.bookCover">
                        <img
                            class="md-elevation-3"
                            style="height: 300px; border-radius: .25em"
                            src="https://www.randomhouse.de/content/edition/covervoila_hires/Paolini_CEragon_1Das_Vermaechtnis_der_194473.jpg"
                        />
                    </div>
                    <div class="layout-item" :class="$style.bookInfo">
                        <md-field>
                            <label>Titel</label>
                            <md-input
                                value="Eragon - Das Vermächtnis der Drachenreiter"
                            ></md-input>
                        </md-field>
                        <md-field>
                            <label>Autor</label>
                            <md-input value="Christopher Paolini"></md-input>
                        </md-field>
                        <div style="margin-bottom: 20px;">
                            <label style="font-size: 12px; color: lightgray">
                                Genres
                            </label>
                            <br />
                            <el-tag type="success" effect="dark"
                                >Juvenile Fiction</el-tag
                            >&nbsp;
                            <el-tag type="danger" effect="dark">Fantasy</el-tag>
                        </div>
                        <md-field>
                            <label>Seitenzahl</label>
                            <md-input value="800"> </md-input>
                            <span class="md-suffix">Seiten</span>
                        </md-field>
                    </div>
                </div>
                <md-content
                    style="width: 450px; margin-bottom: 13px;"
                    class="md-scrollbar"
                    >Als Eragon auf der Jagd einen blauen Stein findet, ahnt er
                    nicht, dass dieser Fund sein Leben verändern wird. Er freut
                    sich, denn vielleicht kann er den Stein gegen Essen für
                    seine Familie eintauschen. Doch dann entschlüpft dem Stein
                    ein Drachenjunges und beschert Eragon ein Vermächtnis, das
                    älter ist als die Welt selbst.
                </md-content>
                <el-rate
                    disabled
                    score-template="{value}"
                    show-score
                    text-color="#ffbb00"
                    :value="4"
                />
            </md-step>
        </md-steppers>
        <md-button :class="$style.cancelBtn" @click="cancel()"
            >Abbrechen</md-button
        >
    </md-dialog>
</template>

<script src="./AddBookDialog.ts" lang="ts"></script>

<style src="./AddBookDialog.scss" lang="scss" module></style>
