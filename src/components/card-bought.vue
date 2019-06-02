<template>
  <a :href="detailUrl">
    <div class="itmuch-card">
      <div @click.stop="preview" class="thumb">
        <img :src="cover" class="img"
             mode="aspectFit"/>
        <div class="tag origin" v-if="share.isOriginal">
          原创
        </div>
        <div v-else class="tag reprint">
          转载
        </div>
      </div>
      <div class="detail">
        <div class="mid">
          <div class="title">
            {{share.title}}
          </div>
          <div class="summary">{{summary}}</div>
        </div>
        <div class="right">
          <div class="right">下载</div>
        </div>
      </div>
    </div>
  </a>
</template>
<script>
  import {BASE_API_URL} from "@/utils/api";

  export default {
    props: ['share'],
    computed: {
      detailUrl() {
        let id = this.share.id;
        return `/pages/share/buy-success/main?id=${id}`
      },
      cover() {
        return BASE_API_URL + '/' + this.share.cover
      },
      summary() {
        let summary = this.share.summary;
        if (summary && summary.length > 30) {
          summary = summary.substring(0, 30) + '...';
        }
        return summary;
      }
    },
    methods: {
      preview() {
        wx.previewImage({
          current: this.cover,
          urls: [this.cover]
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .itmuch-card {
    padding: 15px 15px;
    border-bottom: 1px dashed #ddd;
    display: flex;
    background-color: #fff;
    font-size: 14px;
    .thumb {
      width: 70px;
      height: 70px;
      position: relative;
      .img {
        z-index: 10;
        max-width: 100%;
        max-height: 100%;
      }
      .tag {
        color: #fff;
        padding: 2px 4px;
        position: absolute;
        top: 0;
        left: 0;
      }
      .origin {
        background-color: #ff4444;
      }
      .reprint {
        background-color: #3ebd00;
      }
    }
    .detail {
      padding-left: 15px;
      word-wrap: break-word;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .mid {
        .title {
          font-weight: bold;
        }
      }
      .right {
        width: 70px;
        text-align: right;
      }
    }
  }
</style>
