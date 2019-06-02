<template>

  <div class="detail-wrapper">
    <div class="detail-header">
      <h1 class="title">{{share.title}}</h1>
      <div class="intro">
        <div class="author">作者：{{share.author}}</div>
        <div class="count">下载数：{{share.buyCount}}</div>
      </div>
    </div>
    <div class="content">
      <wxParse :content="summary" @preview="preview" @navigate="navigate"/>
    </div>
    <div class="download">
      <h3>下载地址</h3>
      <div>{{share.downloadUrl}}</div>
    </div>
  </div>

</template>
<script>
  import {request} from '@/utils/request';
  import {SHARE_POST_PREVIEW_URL} from "@/utils/api";
  import wxParse from 'mpvue-wxparse';
  import marked from 'marked';

  export default {
    components: {
      wxParse
    },
    data() {
      return {
        share: '',
        id: '',
        summary: ''
      }
    },

    methods: {
      preview(src, e) {
        // do something
      },
      navigate(href, e) {
        // do something
      },
      async fetchSharePostById() {
        let id = this.id;
        this.share = await request(
          SHARE_POST_PREVIEW_URL + `/${id}`,
          'GET',
          {}
        );
        let summary = this.share.summary;
        this.summary = marked(summary);
      }
    },
    onLoad() {
      this.id = this.$root.$mp.query.id;
      console.log('detail', this.id);
      this.fetchSharePostById();
    }
  }
</script>
<style lang="scss">
  @import url("~mpvue-wxparse/src/wxParse.css");

  .detail-wrapper {
    background: #eee;
    word-break: break-all;
    font-size: 14px;
    .detail-header {
      background: #fff;
      padding: 10px;
      .title {
        font-size: 18px;
      }
      .intro {
        display: flex;
        align-items: center;
        .author {
          margin: 10px 0 0 0;
          width: 49%;
          font-size: 14px;
        }
        .count {
          width: 49%;
          margin: 10px 0 0 0;
          font-size: 14px;
        }
      }
    }
    .content {
      background-color: #fff;
      margin-top: 10px;
      padding: 0 10px;
    }
    .download {
      background-color: #fff;
      margin-top: 10px;
      padding: 0 10px;
    }
  }
</style>
