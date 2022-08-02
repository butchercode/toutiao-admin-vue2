<template>
  <div class="comment-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table :data="articles" style="width: 100%" stripe class="table-list">
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数">
        </el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数">
        </el-table-column>
        <el-table-column prop="date" label="状态">
          <template slot-scope="scope">
            {{ scope.row.comment_status ? "正常" : "关闭" }}
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="onStatusChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="totalCount"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles, updateCommentStatus } from '@/api/article'

export default {
  name: 'CommentIndex',
  components: {},
  props: {},
  data () {
    return {
      articles: [{
        title: '2016-05-02',
        total_comment_count: '王小虎',
        fans_comment_count: '上海市普陀区金沙江路 1518 弄',
        comment_status: true
      }, {
        title: '2016-05-02',
        total_comment_count: '王小虎',
        fans_comment_count: '上海市普陀区金沙江路 1518 弄',
        comment_status: false

      }, {
        title: '2016-05-02',
        total_comment_count: '王小虎',
        fans_comment_count: '上海市普陀区金沙江路 1518 弄',
        comment_status: true

      }, {
        title: '2016-05-02',
        total_comment_count: '王小虎',
        fans_comment_count: '上海市普陀区金沙江路 1518 弄',
        comment_status: true

      }],
      totalCount: 100,
      pageSize: 10,
      page: 1
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
  },
  mounted () { },
  methods: {
    handleSizeChange () {
      this.loadArticles(1)
    },
    handleCurrentChange (page) {
      this.loadArticles(page)
    },
    loadArticles (page = 1) {
      this.page = page
      getArticles({
        response_type: 'comment',
        page,
        per_page: this.pageSize
      }).then(res => {
        this.articles = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },
    onStatusChange (article) {
      updateCommentStatus(article.id.toString(), article.comment_status).then(res => {

      })
    }
  }
}
</script>

<style lang="less">
.table-list {
  margin-bottom: 30px;
}
</style>
