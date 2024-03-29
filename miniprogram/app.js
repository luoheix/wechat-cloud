//app.js
const myCloudPath = 'https://6865-heixongjun-ok4ws-1302448573.tcb.qcloud.la';

App({
  globalData: {
    noImg: `${myCloudPath}/wechat/noImg.png`, // 暂无图片
    imgErr: `${myCloudPath}/wechat/imgErr.png`, // 图片加载错误
    myCloudPath, // 云开发存储地址
  },

  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    // this.globalData = {}
  },

  // 删除头像文件
  onDeleteImg: function (imgId) {
    return new Promise(resolve => {
      wx.cloud.deleteFile({
        fileList: [imgId],
        success: res => {
          console.log('[数据库] [删除头像文件] 成功：', res);
          resolve(true);
        },
        fail: (err) => {
          console.error('[数据库] [删除头像文件] 失败：', err);
          resolve(false);
        },
      });
    });
  },
});