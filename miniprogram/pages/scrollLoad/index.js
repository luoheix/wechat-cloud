//index.js
const Mock = require('../../components/utils/mock-min');

// 获取mock列表
const getMockList = async ({ current = 1, pageSize = 10 }) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        code: 0,
        success: true,
        data: {
          current, // 当前页
          pageSize, // 每页个数
          pages: 4, // 总页数
          total: 32, // 总条数
          records: Mock.mock({
            'data|10': [
              {
                'index|+1': current,
                key: '@id()',
                name: '@cname()',
                'age|18-30': 18,
                address: '@county(true)',
                createTime: '@date(2020-MM-dd HH:mm:ss)',
              },
            ],
          }).data,
        },
      });
    }, 800);
  });
};

Page({
  data: {
    listData: {},
    loading: false,
  },

  onLoad: function () {

  },

  onReady: function () {
    this.getList({});
  },

  // 加载下一页
  onReachBottom: function () {
    // 页面移动到底部时触发
    if (this.data.listData.current < this.data.listData.pages) {
      this.getList({ current: this.data.listData.current + 1 });
    }
  },

  // 刷新列表
  onReload: function () {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    });
    this.getList({ current: 1 });
  },

  // 获取列表数据
  getList: async function (params) {
    this.setData({ loading: true });
    wx.showLoading({
      title: '加载中...',
    });
    const res = await getMockList(params);
    this.setData({ loading: false });
    wx.hideLoading();

    if (res && res.data) {
      const { listData } = this.data;
      // 追加下一页
      if (res.data.current > 1) {
        res.data.records = (listData.records || []).concat(res.data.records || []);
      }
      this.setData({ listData: res.data });
    } else {
      wx.showToast({
        title: res.msg || '请求失败',
        icon: 'warn',
        duration: 1000,
      });
    }
  }
})