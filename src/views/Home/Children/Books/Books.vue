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
                <md-field style="margin-bottom: 40px;">
                    <label>Suchen</label>
                    <md-input v-model="filter" />
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
                <md-field>
                    <label>Min. Buchlänge</label>
                    <md-input
                        v-model="filters[3].minValue"
                        @input="validateInput('minValue')"
                    />
                    <span class="md-suffix">Seiten</span>
                </md-field>
                <md-field>
                    <label>Max. Buchlänge</label>
                    <md-input
                        v-model="filters[3].maxValue"
                        @input="validateInput('maxValue')"
                        @click="event.target.setSelectionRange(0, 1)"
                        @blur="checkBookLength()"
                    />
                    <span class="md-suffix">Seiten</span>
                </md-field>
                <md-field>
                    <label>Franchise</label>
                    <md-select
                        v-model="filters[4].value"
                        multiple
                        md-dense
                        clearable
                    >
                        <md-option
                            :key="index"
                            v-for="(franchise, index) in filters[4].children"
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
                v-if="bookList.length < 1 && !isLoading"
            >
                <md-button
                    class="md-primary md md-raised"
                    @click="showAddBookDialog()"
                >
                    <md-icon>library_add</md-icon>
                    <span>&nbsp;Buch hinzufügen</span>
                </md-button>
            </md-empty-state>

            <div :class="$style.loadingScreen" v-if="isLoading">
                <md-progress-spinner md-mode="indeterminate" />
                <span :class="$style.loadingMessage">Lade Bibliothek</span>
            </div>

            <div :class="$style.fnBar" v-if="bookList.length > 0">
                <md-button
                    :class="$style.addBookBtn"
                    class="md-accent md-raised"
                    @click="showAddBookDialog()"
                >
                    <md-icon>library_add</md-icon>
                    <span>&nbsp;Buch hinzufügen</span>
                </md-button>

                <md-menu
                    :md-offset-x="0"
                    :md-offset-y="10"
                    :class="$style.sortBtn"
                >
                    <md-button class="md-raised md-accent" md-menu-trigger>
                        <md-icon>filter_list</md-icon>
                        <span>&nbsp;Sortieren</span>
                    </md-button>

                    <md-menu-content>
                        <md-menu-item @click="sortSelected = 'title'">
                            <span
                                :class="
                                    sortSelected == 'title' ? $style.strong : ''
                                "
                            >
                                Titel
                            </span>
                        </md-menu-item>
                        <md-menu-item @click="sortSelected = 'author'">
                            <span
                                :class="
                                    sortSelected == 'author'
                                        ? $style.strong
                                        : ''
                                "
                            >
                                Autor
                            </span>
                        </md-menu-item>
                        <md-menu-item @click="sortSelected = 'pages'">
                            <span
                                :class="
                                    sortSelected == 'pages' ? $style.strong : ''
                                "
                            >
                                Seitenzahl
                            </span>
                        </md-menu-item>
                        <md-menu-item @click="sortSelected = 'publish'">
                            <span
                                :class="
                                    sortSelected == 'publish'
                                        ? $style.strong
                                        : ''
                                "
                            >
                                Veröffentlichung
                            </span>
                        </md-menu-item>
                        <md-menu-item @click="sortSelected = 'added'">
                            <span
                                :class="
                                    sortSelected == 'added' ? $style.strong : ''
                                "
                            >
                                Buch Hinzugefügt
                            </span>
                        </md-menu-item>
                    </md-menu-content>
                </md-menu>
            </div>
            <span
                v-if="
                    filter != '' ||
                        filters[0].value != '' ||
                        filters[1].value != '' ||
                        filters[2].value != ''
                "
                :class="$style.filteredTxt"
            >
                * gefiltert *
            </span>

            <md-content
                :class="$style.bookWrapper"
                v-if="bookList.length > 0"
                class="md-scrollbar"
            >
                <md-card
                    :class="$style.book"
                    :key="index"
                    v-for="(book, index) in bookList"
                >
                    <md-ripple>
                        <md-card-media-cover :class="$style.cover">
                            <md-card-media ratio="5:3">
                                <img
                                    :src="
                                        `http://covers.openlibrary.org/b/isbn/${isbnList[index]}-L.jpg`
                                    "
                                />
                            </md-card-media>
                        </md-card-media-cover>

                        <div :class="$style.info">
                            <span v-if="book.subtitle">{{
                                book.subtitle
                            }}</span>
                            <div :class="$style.author">
                                {{ getAuthors(book.authors) }}
                            </div>

                            <div :class="$style.genreWrapper">
                                <el-tag
                                    :class="$style.genre"
                                    :color="getGenreColor(genre)"
                                    :key="index"
                                    effect="dark"
                                    size="small"
                                    v-for="(genre, index) in book.categories"
                                    >{{ genre }}</el-tag
                                >
                            </div>
                            <div :class="$style.lastItems">
                                <span :class="$style.publisher">{{
                                    book.publisher
                                }}</span>
                                <el-rate
                                    :class="$style.rating"
                                    disabled
                                    score-template="{value}"
                                    show-score
                                    text-color="#ffbb00"
                                    v-model="book.averageRating"
                                />
                            </div>
                        </div>

                        <md-tooltip>{{
                            `${0}/${book.pageCount} | ${getProgress(
                                book.pageCount,
                                0
                            )}%`
                        }}</md-tooltip>

                        <div :class="$style.bottom">
                            <span :class="$style.title">{{ book.title }}</span>
                        </div>

                        <md-progress-bar
                            md-mode="determinate"
                            :md-value="12"
                            :class="$style.progress"
                        />
                    </md-ripple>
                </md-card>
            </md-content>

            <el-pagination
                :class="$style.pagination"
                :page-size="18"
                :total="bookList.length"
                background
                hide-on-single-page
                layout="prev, pager, next"
            />
        </div>

        <add-book-dialog />
    </div>
</template>

<script src="./Books.ts" lang="ts"></script>

<style src="./Books.scss" lang="scss" module></style>
