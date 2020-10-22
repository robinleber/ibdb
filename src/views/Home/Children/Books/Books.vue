<template>
    <div :class="$style.books">
        <md-card :class="$style.filter">
            <md-card-header :class="$style.filterHeader">
                <md-card class="md-primary" :class="$style.filterHeaderCard">
                    <md-icon :class="$style.filterIcon">filter_alt</md-icon>
                    <br />
                    <span class="md-subheading" :class="$style.filterTxt"
                        >Filter</span
                    >
                </md-card>
            </md-card-header>
            <md-card-content :class="$style.filterContent">
                <md-field style="margin-bottom: 40px;" md-clearable>
                    <label>Suchen</label>
                    <md-input v-model="searchInput" />
                </md-field>
                <md-divider style="position: absolute; left: 0; right: 0;" />
                <md-field style="margin-top: 55px;">
                    <label>Genre</label>
                    <md-select v-model="filters[0].value" multiple md-dense>
                        <md-option
                            :key="index"
                            v-for="(genre, index) in filters[0].children"
                            :value="genre.label"
                        >
                            {{ genre.label }}
                        </md-option>
                    </md-select>
                </md-field>
                <md-field>
                    <label>Autor</label>
                    <md-select
                        v-model="filters[1].value"
                        multiple
                        md-dense
                        clearable
                    >
                        <md-option
                            :key="index"
                            v-for="(author, index) in filters[1].children"
                            :value="author.label"
                        >
                            {{ author.label }}
                        </md-option>
                    </md-select>
                </md-field>
                <md-field>
                    <label>Verlag</label>
                    <md-select
                        v-model="filters[2].value"
                        multiple
                        md-dense
                        clearable
                    >
                        <md-option
                            :key="index"
                            v-for="(publisher, index) in filters[2].children"
                            :value="publisher.label"
                        >
                            {{ publisher.label }}
                        </md-option>
                    </md-select>
                </md-field>
                <div :class="$style.pagesWrapper">
                    <md-field :class="$style.pagesField" md-clearable>
                        <label>Min. Seiten</label>
                        <md-input
                            :class="$style.pagesInput"
                            @keyup="
                                validateInput('minValue'), checkBookLength()
                            "
                            v-model="filters[3].value"
                            type="number"
                        ></md-input>
                    </md-field>
                    <md-field :class="$style.pagesField" md-clearable>
                        <label>Max. Seiten</label>
                        <md-input
                            :class="$style.pagesInput"
                            @keyup="validateInput('maxValue')"
                            @blur="checkBookLength()"
                            v-model="filters[4].value"
                            type="number"
                        ></md-input>
                    </md-field>
                </div>
                <md-field>
                    <label>Franchise</label>
                    <md-select
                        v-model="filters[5].value"
                        multiple
                        md-dense
                        clearable
                    >
                        <md-option
                            :key="index"
                            v-for="(franchise, index) in filters[5].children"
                            :value="franchise.label"
                        >
                            {{ franchise.label }}
                        </md-option>
                    </md-select>
                </md-field>
            </md-card-content>
            <md-card-actions
                style="position: absolute; width: 100%; bottom: 0;"
            >
                <md-button
                    @click="resetFilter()"
                    class="md-raised md-accent"
                    style="width: 100%;"
                >
                    Filter zurücksetzen
                </md-button>
            </md-card-actions>
        </md-card>
        <div :class="$style.mainView">
            <md-empty-state
                :class="$style.emptyState"
                class="md-accent"
                md-description="Du hast noch keine Bücher in deiner Bibliothek"
                md-icon="collections_bookmark"
                md-label="Gähnende Leere"
                md-rounded
                v-if="books.length < 1 && !isLoading"
            >
            </md-empty-state>

            <div
                :class="$style.loadingScreen"
                class="md-elevation-3"
                v-if="isLoading"
            >
                <md-progress-spinner md-mode="indeterminate" />
                <span :class="$style.loadingMessage">Lade Bibliothek</span>
            </div>

            <div :class="$style.fnBar">
                <md-button
                    v-if="!isIsbnInput"
                    :class="$style.addBookBtn"
                    class="md-accent md-raised"
                    @click="showAddBook()"
                >
                    <md-icon>library_add</md-icon>
                    <span>&nbsp;Buch hinzufügen</span>
                </md-button>

                <md-field
                    v-if="isIsbnInput"
                    :class="[$style.isbnInputField, getValidationClass('isbn')]"
                    md-clearable
                >
                    <span :class="$style.prefix">ISBN</span>
                    <md-input
                        v-model="isbnInput"
                        maxlength="13"
                        ref="isbnInput"
                        @keyup="checkIsbnValidity()"
                        @blur="checkIsbnValidity()"
                        @keyup.enter="addBook()"
                    />
                    <span class="md-error" v-if="!$v.isbnInput.required"
                        >Bitte eine ISBN eingeben</span
                    >
                    <span class="md-error" v-if="!$v.isbnInput.between"
                        >ISBN muss entweder 10 oder 13 Zeichen enthalten</span
                    >
                </md-field>

                <md-button
                    class="md-accent md-raised"
                    v-if="isIsbnInput"
                    @click="cancelAddBook()"
                >
                    Abbrechen
                </md-button>

                <md-button
                    v-if="isIsbnInput"
                    @click="addBook()"
                    class="md-primary md-raised"
                    :disabled="isbnInput == ''"
                >
                    Hinzufügen
                </md-button>

                <md-menu
                    :md-offset-x="0"
                    :md-offset-y="10"
                    v-if="!isIsbnInput"
                    :class="$style.sortBtn"
                    :mdCloseOnSelect="false"
                >
                    <md-button class="md-raised md-accent" md-menu-trigger>
                        <md-icon>filter_list</md-icon>
                        <span>&nbsp;Sortieren</span>
                    </md-button>

                    <md-menu-content>
                        <md-menu-item
                            @click="sortSelected = condition.value"
                            v-for="(condition, index) in sortConditions"
                            :key="index"
                        >
                            <span
                                :class="
                                    sortSelected == condition.value
                                        ? $style.strong
                                        : ''
                                "
                            >
                                {{ condition.label }}
                            </span>
                        </md-menu-item>
                    </md-menu-content>
                </md-menu>

                <div v-if="!isIsbnInput" :class="$style.readingStateWrapper">
                    <md-radio
                        :class="$style.readingState"
                        v-model="readingState"
                        value="read"
                        >Gelesen</md-radio
                    >
                    <md-radio
                        :class="$style.readingState"
                        v-model="readingState"
                        value="reading"
                        >Am Lesen</md-radio
                    >
                    <md-radio
                        :class="$style.readingState"
                        v-model="readingState"
                        value="notRead"
                        >Nicht gelesen</md-radio
                    >
                </div>

                <span
                    v-if="isFilter && !isIsbnInput"
                    :class="$style.filteredTxt"
                >
                    * gefiltert *
                </span>
            </div>

            <md-content :class="$style.bookGallery" class="md-scrollbar">
                <div
                    :class="$style.book"
                    v-for="(book, index) in books"
                    :key="index"
                    class="md-elevation-3"
                >
                    <md-ripple :class="$style.bookContent">
                        <div
                            :class="$style.imageNotFoundContainer"
                            v-if="!coverUrls"
                        >
                            <md-empty-state
                                :class="$style.imageNotFound"
                                class="md-primary"
                                md-icon="image_not_supported"
                                md-label="Bild konnte nicht geladen werden"
                            />
                        </div>
                        <img
                            :class="$style.bookCover"
                            :src="coverUrls[index]"
                            v-else
                        />
                    </md-ripple>
                </div>
            </md-content>
        </div>
    </div>
</template>

<script src="./Books.ts" lang="ts"></script>

<style src="./Books.scss" lang="scss" module></style>
