//index.js
const app = getApp()

Page({
  data: {
    navigatorList: [{
      title: '日历管理',
      url: '../calendar/calendar',
    }, {
      title: '滚动加载',
      url: '../calendar/calendar',
    }, {
      title: '添加水印',
      url: '../calendar/calendar',
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