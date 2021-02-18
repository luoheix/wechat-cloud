//index.js
// const app = getApp();
// const { imgErr } = app.globalData;

// 云数据库id
const dbResumeId = 'luows-resume';

Page({
  data: {
    infoData: {},
    skillsList: [],
    workList: [],
    educationData: {},
    selfList: [],
  },

  onShow: function (options) {
    this.getInfo();
  },

  // 获取基本信息
  getInfo: function () {
    const db = wx.cloud.database();
    wx.showLoading({ title: 'loading...', duration: 30000 });
    db.collection(dbResumeId).get({
      success: res => {
        wx.hideLoading();
        if (res?.data) {
          this.saveData(res.data);
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

  saveData: function (data = []) {
    let infoData = {};
    let skillsList = [];
    let workList = [];
    let educationData = {};
    let selfList = [];
    data.forEach(item => {
      switch (item._id) {
        case 'info':
          infoData = item;
          break;
        case 'skills':
          skillsList = item?.records || [];
          break;
        case 'work-experience':
          workList = item?.records || [];
          break;
        case 'education':
          educationData = item;
          break;
        case 'self-assessment':
          selfList = item?.records || [];
          break;
        default:
          break;
      }
    });

    this.setData({
      infoData,
      skillsList,
      workList,
      educationData,
      selfList,
    });
  },

  previewImage: function (e) {
    const { value } = e.currentTarget.dataset;
    wx.previewImage({
      urls: [value],
    });
  },
})