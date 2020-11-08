// pages/addCloudList/addCloudList.js
Page({
  data: {
    address: [],
    date: '',
    time: '',
    likeList: [{
      type: '运动类',
      children: [{
        code: '0101',
        title: '跑步',
      }, {
        code: '0102',
        title: '游泳',
      }]
    }, {
      type: '娱乐类',
      children: [{
        code: '0201',
        title: '听歌',
      }, {
        code: '0202',
        title: '绘画',
      }, {
        code: '0203',
        title: '看电影',
      }]
    }, {
      type: '网游类',
      children: [{
        code: '0301',
        title: '英雄联盟',
      }, {
        code: '0302',
        title: '我的世界',
      }],
    }],
  },

  onLoad: function (options) {

  },

  onReady: function () {

  },

  formReset: function () {

  },

  changeAddress: function (e) {
    this.setData({
      address: e.detail.value
    });
  },

  changeDate: function (e) {
    this.setData({
      date: e.detail.value
    });
  },

  changeTime: function (e) {
    this.setData({
      time: e.detail.value
    });
  },

  // 新增提交
  formSubmit: function (e) {
    const { name, age, sex, isStudent, address, like, otherLike, date, time } = e.detail.value;
    // 处理爱好
    const likeParam = like.map(item => {
      const [type, title, code] = item.split(',');
      return {
        type,
        title,
        code,
      };
    });
    // 添加其他爱好
    if (otherLike) {
      likeParam.push({
        type: '其他类',
        code: 'other',
        title: otherLike,
      })
    }
    const params = {
      name,
      age,
      sex,
      isStudent,
      address,
      like: likeParam,
      searchTime: `${date} ${time}:00`,
    };
    console.log(params, 'submit');
    this.addCloudList(params);
  },

  // 上传云数据库
  addCloudList: function (data) {
    const db = wx.cloud.database();
    wx.showLoading({
      title: 'loading...',
      duration: 30000
    });
    db.collection('testList').add({
      data,
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          icon: 'success',
          title: '新增成功',
        });
        wx.navigateBack();
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        });
        console.error('[数据库] [新增记录] 失败：', err);
      }
    });
  },
})