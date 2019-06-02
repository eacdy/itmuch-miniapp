<template>
  <div>
    <div class="description">
      说明：投稿审核通过后会有积分奖励；资源被下载会有积分奖励；提交的资源不得包含广告、侵权信息，百度盘地址建议有密码。
    </div>
    <van-radio-group v-model="isOriginal">
      <van-cell-group>
        <van-cell title="原创" clickable data-name="true" @click="onIsOriginalClick">
          <van-radio name="true"/>
        </van-cell>
        <van-cell title="转载" clickable data-name="false" @click="onIsOriginalClick">
          <van-radio name="false"/>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <van-cell-group>
      <van-field
        v-model="title"
        clearable
        label="标题"
        @change="onTitleChange"
        placeholder="请输入标题">
      </van-field>
      <van-field
        v-model="author"
        clearable
        label="作者"
        @change="onAuthorChange"
        placeholder="请输入作者">
      </van-field>
      <van-field
        v-model="price"
        clearable
        type="number"
        label="价格"
        @change="onPriceChange"
        placeholder="请输入价格">
      </van-field>

      <van-field
        v-model="summary"
        clearable
        type="textarea"
        autosize="true"
        label="简介"
        @change="onSummaryChange"
        placeholder="介绍一下技术干货吧"></van-field>

      <van-field
        v-model="downloadUrl"
        clearable
        type="textarea"
        autosize="true"
        label="下载地址"
        @change="onDownloadUrlChange"
        placeholder="请输入下载地址"></van-field>
    </van-cell-group>
    <van-button type="danger" size="large" @click="submit">提交</van-button>
  </div>

</template>
<script>
  import {request} from '@/utils/request';
  import {SHARE_POST_CONTRIBUTE_URL, SHARE_POST_URL} from "@/utils/api";

  export default {
    data() {
      return {
        isOriginal: 'true',
        title: '',
        author: '',
        price: '',
        summary: '',
        downloadUrl: ''
      }
    },
    methods: {
      onIsOriginalClick(event) {
        this.isOriginal = event.mp.currentTarget.dataset.name;
      },
      onTitleChange(event) {
        this.title = event.mp.detail;
      },
      onAuthorChange(event) {
        this.author = event.mp.detail;
      },
      onPriceChange(event) {
        this.price = event.mp.detail;
      },
      onSummaryChange(event) {
        this.summary = event.mp.detail;
      },
      onDownloadUrlChange(event) {
        this.downloadUrl = event.mp.detail;
      },
      async submit() {
        let post = await request(
          SHARE_POST_CONTRIBUTE_URL,
          'POST',
          {
            isOriginal: this.isOriginal,
            title: this.title,
            author: this.author,
            price: this.price,
            summary: this.summary,
            downloadUrl: this.downloadUrl
          }
        );
        let thus = this;
        wx.showModal({
          title: '提示',
          content: '投稿成功，将在最快是速度审核资源！',
          cancelText: '继续投稿',
          confirmText: '前往预览',
          success(res) {
            thus.isOriginal = 'false';
            thus.title = '';
            thus.author = '';
            thus.price = '';
            thus.summary = '';
            thus.downloadUrl = '';
            if (res.confirm) {
              let id = post.id;
              wx.navigateTo({
                url: `/pages/share/preview/main?id=${id}`
              });
            }
          }
        });

      }
    }
  }
</script>
<style scoped>
  .description {
    padding: 15px;
    font-size: 14px;
  }
</style>
