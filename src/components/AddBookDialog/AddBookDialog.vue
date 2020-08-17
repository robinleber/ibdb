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
            <div md-dynamic-height :class="$style.scanIsbnBtnContainer">
              <label :class="$style.isbnInputLabel">ISBN einscannen</label>
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
              :disabled="isbnInput == ''"
            >
              <md-icon>check</md-icon>Bestätigen
            </md-button>
          </div>
        </div>
      </md-step>
      <md-step
        id="second"
        md-label="Buch auswählen"
        :md-done-sync="steps[1].step"
        :class="$style.secondStep"
      ></md-step>
      <md-step
        id="third"
        md-label="Buchinfo überprüfen"
        :md-done.sync="steps[2].step"
        :class="$style.thirdStep"
      >
        <div class="md-layout">
          <div class="md-layout-item">
            <img
              :class="$style.cover"
              width="300"
              src="https://www.randomhouse.de/content/edition/covervoila_hires/Paolini_CEragon_1Das_Vermaechtnis_der_194473.jpg"
              class="md-elevation-3"
            />
          </div>
          <div class="md-layout-item md-size-1">
            <md-field>
              <label>Titel</label>
              <md-input v-model="bookInfo.volumeInfo.title" />
            </md-field>
            <div :class="$style.isbnWrapper">
              <md-chip md-clickable class="md-primary"
                ><strong>ISBN-13</strong>&nbsp;9783608939811</md-chip
              >
              <md-chip md-clickable class="md-primary"
                ><strong>ISBN-10</strong>&nbsp;3608939811</md-chip
              >
            </div>
            <md-field>
              <label>Autoren</label>
              <md-input :value="getAuthors(bookInfo.volumeInfo.authors)" />
            </md-field>
          </div>
        </div>
      </md-step>
    </md-steppers>
    <div :class="$style.btns">
      <md-button
        class="md-accent md-raised"
        :class="$style.cancelBtn"
        @click="cancel()"
        >Abbrechen</md-button
      >
      <div :class="$style.rightBtns" v-if="steps[0].step == true">
        <md-button
          @click="
            steps[0].step = false;
            activeStep = 'first';
          "
          :class="$style.backBtn"
          class="md-raised"
          >Zurück</md-button
        >
        <md-button :class="$style.doneBtn" class="md-primary md-raised"
          >Fertig!</md-button
        >
      </div>
    </div>
  </md-dialog>
</template>

<script src="./AddBookDialog.ts" lang="ts"></script>

<style src="./AddBookDialog.scss" lang="scss" module></style>
