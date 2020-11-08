//index.js
const app = getApp()

Page({
  data: {
    navigatorList: [{
      title: '日历管理',
      url: '../calendar/calendar',
      icon: 'icongongzuoriliguanli',
    }, {
      title: '滚动加载',
      url: '../scrollLoad/scrollLoad',
      icon: 'icongengduo',
    }, {
      title: '添加水印',
      url: '../watermark/watermark',
      icon: 'iconshuiyin',
    }, {
      title: '云开发列表',
      url: '../cloudList/cloudList',
      icon: 'iconyunkaifalogo',
    }]
  },

  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
  },
})