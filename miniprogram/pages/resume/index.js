//index.js
// const app = getApp();
// const { imgErr } = app.globalData;

// 云数据库id
const dbResumeId = 'luows-resume';
const infoId = 'personal-info';

Page({
  data: {
    personalInfo: {},
  },

  onShow: function (options) {
    this.getInfo();
  },

  // 获取基本信息
  getInfo: function () {
    const db = wx.cloud.database();
    wx.showLoading({ title: 'loading...', duration: 30000 });
    db.collection(dbResumeId).doc(infoId).get({
      success: res => {
        wx.hideLoading();
        if (res?.data) {
          this.setData({
            personalInfo: res.data,
          });
        }
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
})