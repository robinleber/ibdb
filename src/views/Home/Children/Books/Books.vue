<template>
  <div :class="$style.books">
    <div :class="$style.functionBar">
      <el-dropdown>
        <el-button type="text" :class="$style.sortBtn">
          <i class="fas fa-sort" />
          Sortieren nach
        </el-button>
        <el-dropdown-menu>
          <el-dropdown-item>
            <i class="fas fa-user" />
            Autor
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="fas fa-calendar-alt" />
            Erscheinungsdatum
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="fas fa-font" />
            Titel
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="fas fa-bookmark" />
            Leseposition
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div :class="$style.bookWrapper">
      <el-tooltip v-for="(book, index) in bookList" :key="index" :content="`${getProgress(book.pages, book.atPage)}%`">
        <div
            class="book"
            :class="$style.book"
          >
            <el-image
              fit="cover"
              :src="book.coverSrc"
              :class="$style.cover"
            />
            <div :class="$style.info">
              <span :class="$style.title">{{ book.title }}</span><br />
              <span :class="$style.author">
                {{ getAuthors(book.authors) }}
              </span>
            </div>
            <el-progress
              :show-text="false"
              :percentage="getProgress(book.pages, book.atPage)"
              color="#148ddf"
            />
        </div>
      </el-tooltip>
    </div>

  </div>
</template>

<script src="./Books.ts" lang="ts"></script>

<style src="./Books.scss" lang="scss" module></style>
