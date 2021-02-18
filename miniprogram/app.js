//app.js
const myCloudPath = 'https://6865-heixongjun-ok4ws-1302448573.tcb.qcloud.la';

// 因为安全原因 svg 需转译以便作为背景图使用，也可直接在浏览器中打开
// 因为要保留 xvg 可读性，所以使用自定义方法进行转义
const svgToUrl = str => {
  return `data:image/svg+xml,${str
    .replace(/\n/g, '')
    .replace(/<!--(.*)-->/g, '') // 必须去掉注释
    .replace(/[\r\n]/g, ' ') // 最好去掉换行
    .replace(/"/g, "'") // 单引号是保留字符，双引号改成单引号减少编码
    .replace(/%/g, '%25')
    .replace(/&/g, '%26')
    .replace(/#/g, '%23')
    .replace(/{/g, '%7B')
    .replace(/}/g, '%7D')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')}`;
};

/**
 * 生成 svg 字符串
 * @param {object} options 参数
 * text 水印文字
 * <text> 属性（x y transform） 方向位置按需调整
 * <svg> 中fill属性决定字体颜色
 */
const getCanvasUrl = options => {
  const {
    text = `${new Date().toLocaleDateString()} Svg水印`,
    width = 187.5,
    height = 112.5,
    fontSize = 16,
    color = 'rgb(128,128,128)',
    fontFamily = 'inherit',
  } = options || {};
  return `<svg
    width="${width}"
    height="${height}"
    fill="${color}"
    xmlns="http://www.w3.org/2000/svg"
  >
    <text
      x="65%"
      y="55%"
      transform="rotate(-31, 100 100)"
      font-size="${fontSize}"
      font-family="${fontFamily}"
      text-anchor="middle"
      dominant-baseline="middle"
    >${text}</text>
  </svg>`;
};
App({
  globalData: {
    noImg: `${myCloudPath}/noImg.png`, // 暂无图片
    imgErr: `${myCloudPath}/imgErr.png`, // 图片加载错误
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

  getWatermark: function(options) {
    return `background: url("${svgToUrl(getCanvasUrl(options))}") repeat`;
  },
});