const app = getApp();
const { noImg, imgErr } = app.globalData;

Page({
  data: {
    noImg,
    testList: [],
  },

  refresh: false,

  onLoad: function (options) {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/index',
      })
      return;
    }
  },

  onShow: function () {
    if (this.refresh) {
      this.refresh = false;
    } else {
      this.getTestList();
    }
  },

  getTestList: function () {
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

  // 图片加载失败处理
  onImgErr: function (e) {
    const index = e.currentTarget.id;
    this.setData({
      [`testList[${index}].imgId`]: imgErr,
    });
  },

  previewImage: function (e) {
    const { value } = e.currentTarget.dataset;
    this.refresh = true;
    wx.previewImage({
      urls: [value],
    });
  },

  jumpAdd: function () {
    wx.navigateTo({
      url: './addCloudList/index',
    });
  },

  onEdit: function (e) {
    const id = e.currentTarget.id;
    wx.showActionSheet({
      itemList: ['编辑', '删除'],
      success: (res) => {
        console.log(res.tapIndex);
        if (res.tapIndex) {
          wx.showModal({
            title: '确认删除？',
            success: (res) => {
              if (res.confirm) {
                this.onDelete(id);
              } else if (res.cancel) {
                // console.log('用户点击取消');
              }
            },
          });
        } else {
          wx.navigateTo({
            url: `./addCloudList/index?id=${id}`,
          });
        }
      },
      fail: (res) => {
        // console.log(res.errMsg);
      },
    });
  },

  // 删除记录
  onDelete: async function (id) {
    const imgId = this.data.testList.find(item => item._id === id).imgId || '';
    const deleteImgSuccess = imgId ? await app.onDeleteImg(imgId) : true;
    if (deleteImgSuccess) {
      const db = wx.cloud.database();
      wx.showLoading({ title: 'loading...', duration: 30000 });
      db.collection('testList').doc(id).remove({
        success: (res) => {
          wx.showToast({
            icon: 'success',
            title: '删除成功',
            duration: 1000,
            success: () => {
              setTimeout(() => {
                this.getTestList();
              }, 1000);
            },
          });
          console.log('[数据库] [删除记录] 成功，记录 _id: ', res);
        },
        fail: (err) => {
          wx.showToast({
            icon: 'none',
            title: '删除记录失败！'
          });
          console.error('[数据库] [删除记录] 失败：', err);
        },
      });
    } else {
      wx.showToast({
        icon: 'none',
        title: '删除头像失败！'
      });
    }
  }
});