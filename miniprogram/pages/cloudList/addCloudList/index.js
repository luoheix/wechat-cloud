// pages/addCloudList/index.js
const app = getApp();
const { imgErr } = app.globalData;
import { generateUUID } from '../../../components/utils/index.js';

// 云数据库id
const dbTestId = 'testList';

Page({
  data: {
    id: '',
    testDetail: {
      imgId: '',
      address: [],
      date: '',
      time: '',
    },
    imgPath: '',
    likeList: [{
      type: '运动类',
      children: [{
        code: '0101',
        title: '跑步',
        checked: false,
      }, {
        code: '0102',
        title: '游泳',
        checked: false,
      }],
    }, {
      type: '娱乐类',
      children: [{
        code: '0201',
        title: '听歌',
        checked: false,
      }, {
        code: '0202',
        title: '绘画',
        checked: false,
      }, {
        code: '0203',
        title: '看电影',
        checked: false,
      }],
    }, {
      type: '网游类',
      children: [{
        code: '0301',
        title: '英雄联盟',
        checked: false,
      }, {
        code: '0302',
        title: '我的世界',
        checked: false,
      }],
    }],
  },

  onLoad: function (options) {
    if (options.id) {
      this.getTestDetail(options.id);
      this.setData({ id: options.id });
    }
  },

  onReady: function () {
  },

  // 图片加载失败处理
  onImgErr: function () {
    this.setData({
      ['testDetail.imgId']: imgErr,
    });
  },

  // 获取详情
  getTestDetail: function (id) {
    const db = wx.cloud.database();
    // 查询指定 id 详情
    wx.showLoading({ title: 'loading...', duration: 30000 });
    db.collection(dbTestId).doc(id).get({
      success: res => {
        wx.hideLoading();
        res?.data && this.handleDetail(res.data);
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

  // 处理详情
  handleDetail: function (detail) {
    const { likeList } = this.data;
    const { like: detailLike, searchTime, ...otherDetail } = detail;
    const [date, time] = (searchTime || '').split(' ');
    const otherLike = (detailLike || []).find(item => item.code === 'other')?.title || '';
    const newLikeList = likeList.map(item => ({
      ...item,
      children: item.children.map(it => ({
        ...it,
        checked: (detailLike || []).some(i => i.code === it.code),
      })),
    }));
    this.setData({
      testDetail: {
        ...otherDetail,
        date,
        time: time.slice(0, 5),
        otherLike,
      },
      likeList: newLikeList,
    });
  },

  changeAddress: function (e) {
    this.setData({
      'testDetail.address': e.detail.value
    });
  },

  changeDate: function (e) {
    this.setData({
      'testDetail.date': e.detail.value
    });
  },

  changeTime: function (e) {
    this.setData({
      'testDetail.time': e.detail.value
    });
  },

  // 重置表单
  formReset: function () {
    wx.navigateBack();
  },

  // 选择头像
  chooseImg: function () {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        const { tempFilePaths, tempFiles } = res;
        // console.log(res, 'uploadImg')
        console.log(res, tempFilePaths, tempFiles, 'uploadImg');
        this.setData({ imgPath: tempFilePaths[0] });
      },
    });
  },

  // 新增提交
  formSubmit: async function (e) {
    const { name, age, sex, isStudent, address, like, otherLike, date, time } = e.detail.value;
    const { id, testDetail, imgPath } = this.data;

    // 必填项校验
    if ((!testDetail.imgId && !imgPath) || !address.length || !age || !sex || !date || !time || (!like.length && !otherLike)) {
      wx.showToast({
        icon: 'none',
        title: '必填项不能为空！',
      });
      return;
    }

    // 上传头像
    const imgId = imgPath ? await this.onCloudImg(imgPath) : testDetail.imgId;
    if (!imgId) {
      wx.showToast({
        icon: 'none',
        title: '头像上传失败！'
      });
      return;
    }

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
      imgId,
      name,
      age: Number(age),
      sex,
      isStudent,
      address,
      like: likeParam,
      searchTime: `${date} ${time}:00`,
    };
    id ? this.editCloudList(id, params) : this.addCloudList(params);
  },

  // 云开发存储文件
  onCloudImg: function (filePath) {
    return new Promise((resolve) => {
      wx.cloud.uploadFile({
        cloudPath: `${generateUUID()}.png`, // 文件名
        filePath, // 小程序临时文件路径
        success: res => {
          // 云文件地址
          console.log('[存储] [头像文件] 成功 ')
          resolve(res.fileID);
        },
        fail: err => {
          console.error('[存储] [头像文件] 失败：', err);
          resolve(false);
        }
      });
    });
  },

  // 编辑云数据库
  editCloudList: async function (id, data) {
    const { imgId } = this.data.testDetail;
    // 删除原头像
    const deleteImgSuccess = imgId ? await app.onDeleteImg(imgId) : true;
    if (deleteImgSuccess) {
      const db = wx.cloud.database();
      wx.showLoading({
        title: 'loading...',
        duration: 30000
      });
      db.collection(dbTestId).doc(id).update({
        // data 传入需要局部更新的数据
        data,
        success: function (res) {
          wx.showToast({
            icon: 'success',
            title: '编辑成功',
            duration: 1000,
            success: () => {
              setTimeout(() => {
                wx.navigateBack();
              }, 1000);
            },
          });
          console.log('[数据库] [更新记录] 成功，记录 _id: ', res);
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '更新记录失败！'
          });
          console.error('[数据库] [更新记录] 失败：', err);
        },
      });
    } else {
      wx.showToast({
        icon: 'none',
        title: '删除头像失败！'
      });
    }
  },

  // 上传云数据库
  addCloudList: function (data) {
    const db = wx.cloud.database();
    wx.showLoading({
      title: 'loading...',
      duration: 30000
    });
    db.collection(dbTestId).add({
      data,
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          icon: 'success',
          title: '新增成功',
          duration: 1000,
          success: () => {
            setTimeout(() => {
              wx.navigateBack();
            }, 1000);
          },
        });
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res);
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败！'
        });
        console.error('[数据库] [新增记录] 失败：', err);
      },
    });
  },
})