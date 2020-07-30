<template>
  <div :class="$style.authors">
    <el-row style="height: 100%;">
      <el-col :span="20">
        <div :class="$style.bookWrapper">
          <el-tooltip
            :content="`${book.atPage}/${book.pages} | ${getProgress(book.pages, book.atPage)}%`"
            :key="index"
            v-for="(book, index) in bookList"
          >
            <div :class="$style.book">
              <el-image fit="cover" :src="book.coverSrc" :class="$style.cover" />
              <div :class="$style.info">
                <span :class="$style.title">{{ book.title }}</span>
                <br />
                <div :class="$style.author">{{ getAuthors(book.authors) }}</div>
                <div :class="$style.genreWrapper">
                  <el-tag
                    :class="$style.genre"
                    :color="getGenreColor(genre)"
                    :key="index"
                    effect="dark"
                    v-for="(genre, index) in book.genres"
                  >{{ genre }}</el-tag>
                </div>
                <div :class="$style.partOf">
                  <span v-if="book.partOf[1] > -1">
                    <strong>{{ book.partOf[0] }}</strong>
                    Band {{ book.partOf[1] }}
                  </span>
                  <span v-if="book.partOf[1] < -1"></span>
                  <span v-if="book.partOf[1] == -1">
                    Teil der
                    <strong>{{ book.partOf[0] }}</strong> Reihe
                  </span>
                </div>
                <el-rate
                  :class="$style.rating"
                  disabled
                  score-template="{value}"
                  show-score
                  text-color="#ffbb00"
                  v-model="book.rating"
                />
              </div>
              <el-progress
                :percentage="getProgress(book.pages, book.atPage)"
                :show-text="false"
                color="#148ddf"
              />
            </div>
          </el-tooltip>
        </div>
        <el-pagination
          :class="$style.pagination"
          :page-size="12"
          :total="bookList.length"
          background
          layout="prev, pager, next"
        />
      </el-col>
      <el-col :span="4">
        <el-card :class="$style.sideBar">
          <div slot="header" :class="$style.header">Filter</div>
          <el-collapse accordion>
            <el-collapse-item
              :class="$style.filterItem"
              :key="filterIndex"
              :name="index"
              :title="filter.label"
              v-for="(filter, filterIndex) in filters"
              v-model="filter.value"
            >
              <div v-if="filter.type == 'check'">
                <el-checkbox
                  :key="index"
                  v-for="(option, index) in filter.options"
                  v-model="option.value"
                >{{ option.label }}</el-checkbox>
              </div>
              <div v-if="filter.type == 'input'">
                <el-input
                  :key="index"
                  size="small"
                  style="margin-bottom: 5px;"
                  v-for="(option, index) in filter.options"
                  v-model="option.value"
                >
                  <template slot="prepend">{{ option.label }}</template>
                </el-input>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </el-row>
    <add-book-dialog :dialogVisible="addBookDialogVisible" />
  </div>
</template>

<script src="./Authors.ts" lang="ts"></script>

<style src="./Authors.scss" lang="scss" module></style>
