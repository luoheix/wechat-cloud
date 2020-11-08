Page({
  data: {
    testList: [],
  },

  onLoad: function (options) {

  },

  onShow: function () {
    const db = wx.cloud.database();
    // 查询当前用户所有的 blogs
    wx.showLoading({ title: 'loading...', duration: 30000 });
    db.collection('testList').get({
      success: res => {
        wx.hideLoading();
        this.setData({
          testList: res.data || [],
        });
        console.log('[数据库] [查询记录] 成功: ', res);
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        });
        console.error('[数据库] [查询记录] 失败：', err);
      }
    });
  },

  jumpAdd: function () {
    wx.navigateTo({
      url: './addCloudList/addCloudList',
    })
  },
});