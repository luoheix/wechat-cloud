//index.js
Page({
  data: {
  },

  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },

  onLoad: function () {

  },

  jumpResume: function () {
    wx.navigateTo({
      url: '/packageProfile/pages/home/index',
    });
  },
})