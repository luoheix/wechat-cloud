//index.js
Page({
  data: {
  },

  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },

  onLoad: function () {

  },

  jumpResume: function () {
    wx.navigateTo({
      url: '/packageA/pages/resume/index',
    });
  },
})