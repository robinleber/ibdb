<template>
  <div :class="$style.books">
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-15" style="min-width: 100px;">
        <md-card :class="$style.filter" style="margin-top: 1em; height: 80vh;">
          <md-card-header :class="$style.filterHeader">
            <md-icon :class="$style.filterIcon">filter_alt</md-icon>
            <span :class="$style.filterTitle" class="md-title">Filter</span>
          </md-card-header>
          <md-card-content :class="$style.filterContent">
            <el-tree
              :class="$style.filterTree"
              :data="filters"
              :props="props"
              :load="loadNode"
              show-checkbox
              empty-text="Kein Filter vorhanden"
            />
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item">
        <div :class="$style.fnBar" v-if="bookList.length > 0">
          <md-button class="md-primary md-raised" @click="showAddBookDialog()">
            <md-icon>library_add</md-icon>
            <span>&nbsp;Buch hinzufügen</span>
          </md-button>

          <md-menu :md-offset-x="0" :md-offset-y="10">
            <md-button
              class="md-raised md-primary"
              md-menu-trigger
              style="margin-top: 6px; margin-right: 8px;"
            >
              <md-icon>filter_list</md-icon>
              <span>&nbsp;Sortieren</span>
            </md-button>

            <md-menu-content>
              <md-menu-item @click="sortSelected = 'title'">
                <span :class="sortSelected == 'title' ? $style.strong : ''">
                  Titel
                </span>
              </md-menu-item>
              <md-menu-item @click="sortSelected = 'author'">
                <span :class="sortSelected == 'author' ? $style.strong : ''">
                  Autor
                </span>
              </md-menu-item>
              <md-menu-item @click="sortSelected = 'pages'">
                <span :class="sortSelected == 'pages' ? $style.strong : ''">
                  Seitenzahl
                </span>
              </md-menu-item>
              <md-menu-item @click="sortSelected = 'publish'">
                <span :class="sortSelected == 'publish' ? $style.strong : ''">
                  Veröffentlichung
                </span>
              </md-menu-item>
              <md-menu-item @click="sortSelected = 'added'">
                <span :class="sortSelected == 'added' ? $style.strong : ''">
                  Buch Hinzugefügt
                </span>
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
          v-if="bookList.length < 1"
        >
          <md-button
            class="md-primary md md-raised"
            @click="showAddBookDialog()"
          >
            <md-icon>library_add</md-icon>
            <span>&nbsp;Buch hinzufügen</span>
          </md-button>
        </md-empty-state>

        <md-content
          :class="$style.bookWrapper"
          v-if="bookList.length > 0"
          class="md-scrollbar"
        >
          <el-tooltip
            :content="
              `${0}/${book.pageCount} │ ${getProgress(book.pageCount, 0)}%`
            "
            :key="index"
            effect="light"
            v-for="(book, index) in bookList"
          >
            <md-card :class="$style.book">
              <md-ripple>
                <md-card-media-cover :class="$style.cover">
                  <md-card-media ratio="5:3">
                    <img
                      :src="
                        `https://pictures.abebooks.com/isbn/${isbnList[index]}-us.jpg`
                      " 
                    />
                  </md-card-media>
                </md-card-media-cover>

                <div :class="$style.info">
                  <span :class="$style.title">{{ book.title }}</span>
                  <br />
                  <span v-if="book.subtitle">{{ book.subtitle }}</span>
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
                    <span :class="$style.publisher">{{ book.publisher }}</span>
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

                <md-progress-bar
                  md-mode="determinate"
                  :md-value="12"
                  :class="$style.progress"
                />
              </md-ripple>
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
      </div>
    </div>

    <add-book-dialog />
  </div>
</template>

<script src="./Books.ts" lang="ts"></script>

<style src="./Books.scss" lang="scss" module></style>
