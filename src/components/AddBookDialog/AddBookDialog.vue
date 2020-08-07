<template>
  <md-dialog :md-active.sync="isAddBookDialogVisible" :class="$style.addBook">
    <md-dialog-title>Buch hinzufügen</md-dialog-title>
    <md-steppers :md-active-step.sync="activeStep" :class="$style.stepper">
      <md-step id="first" md-label="ISBN" :md-done.sync="first">
        <div class="md-layout">
          <div class="md-layout-item">
            <div md-dynamic-height :class="$style.scanIsbnBtnContainer">
              <label :class="$style.isbnInputLabel">ISBN einscannen</label>
              <md-button name="scanIsbnBtn" class="md-accent md-raised" :class="$style.scanIsbnBtn">
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
              @click="setDone('firstStep', 'secondStep')"
              class="md-raised md-primary"
            >
              <md-icon>check</md-icon>Bestätigen
            </md-button>
          </div>
        </div>
      </md-step>
      <md-step id="second" md-label="Buchinfo überprüfen" :md-done.sync="second">
        <div class="md-layout">
          <div class="layout-item">
            <img
              class="md-elevation-3"
              style="height: 300px; border-radius: .25em"
              src="https://www.randomhouse.de/content/edition/covervoila_hires/Paolini_CEragon_1Das_Vermaechtnis_der_194473.jpg"
            />
          </div>
          <div class="layout-item">
            <md-field>
              <label>Titel</label>
              <md-input disabled value="Eragon - Das Vermächtnis der Drachenreiter"></md-input>
            </md-field>
            <md-field>
              <label>Seiten</label>
              <md-input disabled value="800 Seiten"></md-input>
            </md-field>
          </div>
        </div>
        <md-field class="md-elevation-3">
              <label>Beschreibung</label>
          <md-textarea disabled></md-textarea>
        </md-field>
        <el-rate
          disabled
          score-template="{value}"
          show-score
          text-color="#ffbb00"
          value="4"
        />
      </md-step>
    </md-steppers>
    <md-button :class="$style.cancelBtn" @click="cancel()">Abbrechen</md-button>
  </md-dialog>
</template>

<script src="./AddBookDialog.ts" lang="ts">
</script>

<style src="./AddBookDialog.scss" lang="scss" module>
</style>