//index.js
// colors: ['#00C559', '#00B4FF', '#FE9C25', '#FE6E25', '#91D064', '#626FFF']

const app = getApp()

Page({
  data: {
    navigatorList: [{
      title: '日历管理',
      describe: '基于原生 Date',
      url: '../calendar/index',
      icon: 'icongongzuoriliguanli',
      bgColor: '#00C559',
    }, {
      title: '滚动加载',
      describe: '基于 onReachBottom',
      url: '../scrollLoad/index',
      icon: 'icongengduo',
      bgColor: '#00B4FF',
    }, {
      title: '添加水印',
      describe: '使用 svg 标签实现',
      url: '../watermark/index',
      icon: 'iconshuiyin',
      bgColor: '#FE9C25',
    }, {
      title: '云开发列表',
      describe: '基于微信云开发平台',
      url: '../cloudList/index',
      icon: 'iconyunkaifalogo',
      bgColor: '#FE6E25',
    }, {
      title: '视频播放',
      describe: '待实现...',
      url: '../videoPlay/index',
      icon: 'iconshipin',
      bgColor: '#626FFF',
    }],
    layoutValue: true,
  },

  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  switchLayout(e) {
    this.setData({
      layoutValue: e.detail.value,
    });
  },

  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/index',
      })
      return;
    }
  },
});
