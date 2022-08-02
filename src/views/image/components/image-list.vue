<template>
  <div class="image-list">
    <div class="action-head">
      <el-radio-group v-model="collect" size="mini" @change="onCollectChange">
        <el-radio-button label="false" @click.native="loadImages(false)"
          >全部</el-radio-button
        >
        <el-radio-button label="true" @click.native="loadImages(true)"
          >收藏</el-radio-button
        >
      </el-radio-group>
      <el-button
        size="mini"
        type="success"
        @click="dialogUploadVisible = true"
        v-if="isShowAdd"
        >上传素材</el-button
      >
    </div>
    <el-row :gutter="50">
      <el-col
        :xs="12"
        :sm="6"
        :md="6"
        :lg="4"
        v-for="(img, index) in images"
        :key="index"
        class="image-item"
        @click.native="selected = index"
      >
        <el-image
          style="height: 100px width: 400px;"
          :src="img.url"
          fit="cover"
        ></el-image>
        <div class="selected" v-if="isShowSelected && selected === index"></div>
        <div class="image-action" v-if="isShowAction">
          <el-button
            type="warning"
            circle
            size="small"
            :icon="img.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
            @click="onCollect(img)"
          >
          </el-button>
          <el-button
            type="danger"
            circle
            size="small"
            icon="el-icon-delete-solid"
            @click="onDelete(img)"
          ></el-button>
        </div>
      </el-col>
    </el-row>

    <el-pagination
      layout="prev, pager, next"
      :total="totalCount"
      :page-size="pageSize"
      :current-page.sync="page"
      background
      @current-change="onPageChange"
    >
    </el-pagination>
    <el-dialog
      title="上传素材"
      :visible.sync="dialogUploadVisible"
      :append-to-body="true"
    >
      <el-upload
        class="upload-demo"
        drag
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        :headers="uploadHeaders"
        name="image"
        :on-success="onUploadSuccess"
        :show-file-list="false"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImages, collectImage, deleteImage } from '@/api/image'

export default {
  name: 'ImageList',
  components: {},
  props: {
    isShowAdd: {
      type: Boolean,
      default: true
    },
    isShowAction: {
      type: Boolean,
      default: true
    },
    isShowSelected: {
      type: Boolean,
      default: false
    }
  },
  data () {
    // const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false, // 默认查询全部
      images: [
        { url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', is_collected: false },
        { url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', is_collected: true },
        { url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', is_collected: false },
        { url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', is_collected: true },
        { url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', is_collected: true },
        { url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', is_collected: false },
        { url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', is_collected: false },
        { url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', is_collected: true }
      ],
      dialogUploadVisible: false,
      uploadHeaders: {
        // Authorizaion: `Bear ${user.token}`
      },
      totalCount: 50,
      pageSize: 3,
      page: 1,
      selected: null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImages(1)
  },
  mounted () { },
  methods: {
    loadImages (page = 1) {
      this.page = page
      getImages({
        collect: this.collect,
        page: this.page,
        per_page: this.pageSize
      }).then(res => {
        this.images = res.data.data.results
      })
    },
    onCollectChange (value) {
      this.loadImages(1, value)
      console.log(value)
    },
    onUploadSuccess () {
      this.dialogUploadVisible = false
      this.loadImages(false)
      this.$message({
        type: 'success',
        message: '上传成功'
      })
    },
    onPageChange (page) {
      this.loadImages(page)
    },
    onCollect (img) {
      collectImage(img.id, !img.is_collected).then(res => {
        img.is_collected = !img.is_collected
      })
    },
    onDelete (img) {
      deleteImage(img.id).then(res => {
        this.loadImages(this.page)
      })
    }
  }
}
</script>

<style lang="less">
.action-head {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.image-item {
  position: relative;
}
.image-action {
  height: 40px;
  background-color: rgba(204, 204, 204, 0.5);
  position: absolute;
  bottom: 4px;
  left: 25px;
  right: 25px;
  font-size: 25px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
}
.selected {
  background: url(./selected.png) no-repeat;
  background-size: cover;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
