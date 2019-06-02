export default {
  onShareAppMessage() {
    return {
      title: 'IT牧场',
      desc: '阿里技术专家的学习笔记、干货分享，你值得拥有！',
      path: 'pages/share/list/main',
      imageUrl: '/static/img/xuanchuan.png',
      success() {
        console.log('分享成功');
      }
    };
  }
};
