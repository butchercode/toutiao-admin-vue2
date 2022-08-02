<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="form" label-width="40px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择">
            <el-option label="全部" value="null"></el-option>
            <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="(channel, index) in channels"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-col :span="11">
            <el-date-picker
              v-model="rangeDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadArticles(1)">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">结果共{{ totalCount }}条数据</div>
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%"
        class="list-table"
        size="mini"
      >
        <el-table-column prop="date" label="封面" width="180">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.cover"
              fit="cover"
            ></el-image>
            <!-- <img
              v-if="scope.row.cover"
              class="article-cover"
              :src="scope.row.cover"
            />
            <img v-else class="article-cover" src="./no-cover.jpeg" /> -->
          </template>
        </el-table-column>
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column label="状态" width="180">
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type">{{
              articleStatus[scope.row.status].text
            }}</el-tag>
            <!-- <el-tag v-else-if="scope.row.status === 1" type="primary"
              >待审核</el-tag
            >
            <el-tag v-else-if="scope.row.status === 2" type="success"
              >审核通过</el-tag
            >
            <el-tag v-else-if="scope.row.status === 3" type="danger"
              >审核失败</el-tag
            >
            <el-tag v-else-if="scope.row.status === 4">已删除</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="$router.push('/publish?id='+scope.row.id.toString())"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="onDeleteArticle(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="pageSize"
        :current-page="page"
        background
        @current-change="onCurrentChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles, getArticleChannels, deleteArticle } from '@/api/article'

export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [{
        id: 1,
        cover: 'https://i3.meishichina.com/attachment/recipe/2022/07/20/2022072016582845426161.jpg?x-oss-process=style/c320',
        date: '2016-05-02',
        name: '王小虎',
        status: 0,
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        cover: 'https://i3.meishichina.com/attachment/recipe/2022/07/20/2022072016582844982031.jpg?x-oss-process=style/c320',
        date: '2016-05-04',
        name: '王小虎',
        status: 1,
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        cover: 'https://i3.meishichina.com/attachment/recipe/2022/07/20/2022072016582844982031.jpg?x-oss-process=style/c320',
        date: '2016-05-01',
        name: '王小虎',
        status: 2,
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        id: 4,
        cover: '',
        date: '2016-05-03',
        name: '王小虎',
        status: 3,
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      articles: [],
      articleStatus: [
        { text: '草稿', type: 'info' },
        { text: '待审核', type: '' },
        { text: '审核通过', type: 'success' },
        { text: '审核失败', type: 'warning' },
        { text: '已删除', type: 'danger' }
      ],
      totalCount: 1000,
      pageSize: 20,
      status: null, // 不传为全部
      channels: [
        // { name: 'c++', id: 1 },
        // { name: 'java', id: 2 }
      ],
      channelId: null, // 不传为全部
      rangeDate: null,
      page: 1 // 当前页
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles(1)
    this.loadArticleChannels()
  },
  mounted () { },
  methods: {
    loadArticles (page) {
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null
      }).then(res => {
        const { results, totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount
      })
    },
    onSubmit () {
      console.log('submit!')
    },
    onCurrentChange (page) {
      this.loadArticles(page)
    },
    loadArticleChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    onDeleteArticle (articleId) {
      this.$confirm('确认删除?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(articleId).then(res => {
          this.loadArticles(this.page)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="less">
.filter-card {
  margin-bottom: 30px;
}
.list-table {
  margin-bottom: 20px;
}
.article-cover {
  width: 100px;
  background-size: cover;
}
</style>
