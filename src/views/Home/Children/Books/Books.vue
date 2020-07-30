<template>
  <div :class="$style.books">
    <div :class="$style.fnBar" v-if="bookList.length">
      <md-button class="md-primary md-raised">
        <md-icon>library_add</md-icon>
        <span>&nbsp;Buch hinzufügen</span>
      </md-button>

      <md-menu :md-offset-x="0" :md-offset-y="10">
        <md-button
          class="md-raised md-accent"
          md-menu-trigger
          style="margin-top: 6px; margin-right: 8px;"
        >
          <md-icon style="color: #fafafa">filter_list</md-icon>
          <span>&nbsp;Sortieren</span>
        </md-button>

        <md-menu-content>
          <md-menu-item
            :class="sortSelected == 'title' ? $style.strong : null"
            @click="sort('title')"
          >Titel</md-menu-item>
          <md-menu-item
            :class="sortSelected == 'author' ? $style.strong : null"
            @click="sort('author')"
          >Autor</md-menu-item>
          <md-menu-item
            :class="sortSelected == 'pages' ? $style.strong : null"
            @click="sort('pages')"
          >Seitenzahl</md-menu-item>
          <md-menu-item
            :class="sortSelected == 'publish' ? $style.strong : null"
            @click="sort('publish')"
          >Datum (Veröffentlichung)</md-menu-item>
          <md-menu-item
            :class="sortSelected == 'added' ? $style.strong : null"
            @click="sort('added')"
          >Datum (Buch Hinzugefügt)</md-menu-item>
        </md-menu-content>
      </md-menu>

      <md-menu :md-offset-x="0" :md-offset-y="10">
        <md-button
          class="md-raised"
          md-menu-trigger
          :mdCloseOnClick="false"
          :mdCloseOnSelect="false"
          style="background-color: #a26ea8; color: #fafafa; margin-top: 6px;"
        >
          <md-icon style="color: #fafafa">filter_alt</md-icon>
          <span>&nbsp;Filtern</span>
        </md-button>

        <md-menu-content>
          <md-menu-item>
            <md-checkbox v-model="filter" value="title">Titel</md-checkbox>
          </md-menu-item>
          <md-menu-item>
            <md-checkbox v-model="filter" value="author">Autor</md-checkbox>
          </md-menu-item>
          <md-menu-item>
            <md-checkbox v-model="filter" value="pages">Seitenzahl</md-checkbox>
          </md-menu-item>
          <md-menu-item>
            <md-checkbox v-model="filter" value="publish">Datum (Veröffentlichung)</md-checkbox>
          </md-menu-item>
          <md-menu-item>
            <md-checkbox v-model="filter" value="added">Datum (Buch Hinzugefügt)</md-checkbox>
          </md-menu-item>
        </md-menu-content>
      </md-menu>
    </div>

    <md-empty-state
      :class="$style.emptyState"
      class="md-accent"
      md-description="Du hast noch keine Bücher in deiner Bibliothek"
      md-icon="collections_bookmark"
      md-label="Gähnende Leere"
      md-rounded
      v-if="!bookList.length"
    >
      <md-button class="md-primary md md-raised">
        <md-icon>library_add</md-icon>
        <span>&nbsp;Buch hinzufügen</span>
      </md-button>
    </md-empty-state>

    <md-content :class="$style.bookWrapper" v-if="bookList.length" class="md-scrollbar">
      <el-tooltip
        :content="`${book.atPage}/${book.pages} │ ${getProgress(book.pages, book.atPage)}%`"
        :key="index"
        effect="light"
        v-for="(book, index) in bookList"
      >
        <md-card :class="$style.book">
          <md-ripple>
            <md-card-media-cover :class="$style.cover">
              <md-card-media ratio="5:3">
                <img :src="book.volumeInfo.imageLinks.thumbnail" />
              </md-card-media>
            </md-card-media-cover>

            <div :class="$style.info">
              <span :class="$style.title">{{ book.volumneInfo.title }}</span>
              <br />

              <div :class="$style.author">{{ getAuthors(book.volumeInfo.authors) }}</div>

              <div :class="$style.genreWrapper">
                <el-tag
                  :class="$style.genre"
                  :color="getGenreColor(genre)"
                  :key="index"
                  effect="dark"
                  size="small"
                  v-for="(genre, index) in book.volumeInfo.categories"
                >{{ genre }}</el-tag>
              </div>

              <el-rate
                :class="$style.rating"
                disabled
                score-template="{value}"
                show-score
                text-color="#ffbb00"
                v-model="book.volumeInfo.averageRating"
              />
            </div>
          </md-ripple>

          <md-progress-bar md-mode="determinate" :md-value="getProgress(book.pages, book.atPage)" />
        </md-card>
      </el-tooltip>
    </md-content>

    <el-pagination
      :class="$style.pagination"
      :page-size="18"
      :total="bookList.length"
      background
      hide-on-single-page
      layout="prev, pager, next"
    />

    <add-book-dialog :dialogVisible="addBookDialogVisible" />
  </div>
</template>

<script src="./Books.ts" lang="ts"></script>

<style src="./Books.scss" lang="scss" module></style>
