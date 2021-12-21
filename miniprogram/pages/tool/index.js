//index.js
// colors: ['#00C559', '#00B4FF', '#FE9C25', '#FE6E25', '#91D064', '#626FFF']

Page({
  data: {
    navigatorList: [{
      title: '日历管理',
      describe: '基于原生 Date',
      url: '/packageTool/pages/calendar/index',
      icon: 'icongongzuoriliguanli',
      bgColor: '#00C559',
    }, {
      title: '滚动加载',
      describe: '基于 onReachBottom',
      url: '/packageTool/pages/scrollLoad/index',
      icon: 'icongengduo',
      bgColor: '#00B4FF',
    }, {
      title: '自定义水印',
      isNew: true,
      describe: '使用 svg 标签实现',
      url: '/packageTool/pages/watermark/index',
      icon: 'iconshuiyin',
      bgColor: '#FE9C25',
    }, {
      title: '云开发列表',
      describe: '基于微信云开发平台',
      url: '/packageTool/pages/cloudList/index',
      icon: 'iconyunkaifalogo',
      bgColor: '#FE6E25',
    }, {
      title: '视频播放',
      tips: '待实现',
      describe: '待实现...',
      url: '/packageTool/pages/videoPlay/index',
      icon: 'iconshipin',
      bgColor: '#626FFF',
    }, {
      title: '即将开放',
      describe: '待开发功能/效果',
      url: '/packageTool/pages/upgrade/index',
      icon: 'iconshengji',
      bgColor: '#52c41a',
    }],
    layoutValue: false,
  },

  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
    this.initLayout();
  },

  initLayout: function () {
    wx.getStorage({
      key: 'tool-layout',
      success: (res) => {
        this.setData({ layoutValue: res.data === 'card' })
      }
    })
  },

  switchLayout(e) {
    wx.setStorage({
      key: "tool-layout",
      data: e.detail.value ? 'card' : 'list'
    })
    this.setData({
      layoutValue: e.detail.value,
    });
  },

  onLoad: function () {
  },
});
