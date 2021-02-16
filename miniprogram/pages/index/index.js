//index.js
const app = getApp()

Page({
  data: {
    navigatorList: [{
      title: '日历管理',
      url: '../calendar/index',
      icon: 'icongongzuoriliguanli',
    }, {
      title: '滚动加载',
      url: '../scrollLoad/index',
      icon: 'icongengduo',
    }, {
      title: '添加水印',
      url: '../watermark/index',
      icon: 'iconshuiyin',
    }, {
      title: '云开发列表',
      url: '../cloudList/index',
      icon: 'iconyunkaifalogo',
    }]
  },

  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/index',
      })
      return
    }
  },
})