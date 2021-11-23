// pages/blog/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {
      headImg: 'https://6865-heixongjun-ok4ws-1302448573.tcb.qcloud.la/wechat/book-header.png',
      homepage: 'https://www.yuque.com/luowenshuai'
    },
    tabs: [{
      title: '精选'
    }, {
      title: '知识库'
    }, {
      title: '统计'
    }],
    activeKey: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 复制
  onCopy: function (e) {
    const { value } = e.currentTarget.dataset;
    wx.setClipboardData({
      data: value,
      // success (res) {
      //   wx.getClipboardData({
      //     success (res) {
      //       console.log(res.data) // data
      //     }
      //   })
      // }
    })
  },

  previewImage: function (e) {
    const { value } = e.currentTarget.dataset;
    wx.previewImage({
      urls: [value],
    });
  },

  switchTab(e) {
    const data = e.currentTarget.dataset;
    if (data.index !== this.data.selected) {
      this.setData({
        activeKey: data.index,
      });
    }
  }
})