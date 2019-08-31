<template>

  <div class="detail-wrapper">
    <div class="detail-header">
      <h1 class="title">{{share.title}}</h1>
      <div class="intro">
        <div class="author">作者：{{share.author}}</div>
        <div class="author">发布人：{{share.username}}</div>
        <div class="count">下载数：{{share.buyCount}}</div>
      </div>
    </div>
    <div class="content">
      <wxParse :content="summary" @preview="preview" @navigate="navigate"/>
    </div>
    <div slot="footer">
      <van-submit-bar
        :price="share.price * 100"
        label="积分"
        button-text="兑换" currency="฿"
        @click="buy()"></van-submit-bar>
    </div>
    <van-toast id="van-toast"/>

  </div>

</template>
<script>
  import {request} from '@/utils/request';
  import {SHARE_POST_URL} from "@/utils/api";
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
          SHARE_POST_URL + `/${id}`,
          'GET',
          {}
        );
        let summary = this.share.summary;
        console.log('summary', summary);
        this.summary = marked(summary);
      },
      async buy() {
        let id = this.id;
        await request(
          SHARE_POST_URL + `/exchange/${id}`,
          'GET',
          {}
        );
        wx.navigateTo({
          url: `/pages/share/buy-success/main?id=${id}`
        });
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
  }
</style>
