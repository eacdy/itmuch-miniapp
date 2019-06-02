<template>
  <div class='header'>
    <img src="/static/img/unlogin.png" class='img'>
    <span class='span'>登录，享受技术之旅吧！</span>
    <!--<span class='span'>目前服务器性能不佳，近期解决..</span>-->
  </div>
</template>
<script>
  export default {
  };
</script>
<style lang='scss' scoped>
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    background-color: white;
    margin-bottom: 30px;
    .img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-top: 15px;
    }
    .span {
      margin-top: 10px;
    }
  }
</style>
