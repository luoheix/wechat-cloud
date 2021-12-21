// 生成随机 uuid
export const generateUUID = () => {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

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
const defaultWidth = 187.5;
const defaultHeight = 112.5;
const getCanvasUrl = options => {
  const {
    text = `${new Date().toLocaleDateString()} Svg水印`,
    // width = defaultWidth,
    // height = defaultHeight,
    fontSize = 16,
    color = 'rgb(128,128,128)',
    fontFamily = 'inherit',
  } = options || {};
  const textLength = text.replace(/[^\x00-\xff]/g, 'xx').length * 10 / 18 + 8;
  // const textRatio = (textLength < 10 ? 10 : textLength) / 18;
  const textRatio = textLength / 18;
  const width = defaultWidth * textRatio;
  const height = defaultHeight * textRatio;
  return `<svg
    width="${width}"
    height="${height}"
    fill="${color}"
    xmlns="http://www.w3.org/2000/svg"
  >
    <text
      x="65%"
      y="55%"
      transform="rotate(-31, ${width * 100 / defaultWidth} ${height * 100 / defaultHeight})"
      font-size="${fontSize}"
      font-family="${fontFamily}"
      text-anchor="middle"
      dominant-baseline="middle"
    >${text}</text>
  </svg>`;
};


export const getWatermark = options => `background: url("${svgToUrl(getCanvasUrl(options))}") repeat`;