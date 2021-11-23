//index.js
import { getWatermark } from '../../components/utils/index';

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
    blogList: [],
    watermarkBck: getWatermark({ text: '骆文帅个人简介', color: 'rgb(128,128,128,0.5)' }),
  },

  refresh: false,

  onShow: function (options) {
    if (this.refresh) {
      this.refresh = false;
    } else {
      this.init();
    }
  },

  init: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
    this.getInfo();
  },

  // 获取基本信息
  getInfo: function () {
    const db = wx.cloud.database();
    wx.showLoading({ title: 'loading...', duration: 30000 });
    db.collection(dbResumeId).get({
      success: res => {
        wx.hideLoading();
        if (res.data) {
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
    let blogList = [];
    data.forEach(item => {
      switch (item._id) {
        case 'info':
          infoData = item;
          break;
        case 'skills':
          skillsList = item.records || [];
          break;
        case 'work-experience':
          workList = item.records.reverse() || [];
          break;
        case 'education':
          educationData = item;
          break;
        case 'self-assessment':
          selfList = item.records || [];
          break;
        case 'personal-blog':
          blogList = item.records || [];
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
      blogList,
    });
  },

  previewImage: function (e) {
    const { value } = e.currentTarget.dataset;
    this.refresh = true;
    wx.previewImage({
      urls: [value],
    });
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
})