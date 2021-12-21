// pages/watermark/index.js
import { getWatermark } from '../../../components/utils/index.js';

// const app = getApp();
const defaultValue = `${new Date().toLocaleDateString()} Svg水印`

Page({

  /**
   * 页面的初始数据
   */
  data: {
    watermarkBck: getWatermark({ text: defaultValue }),
    inputValue: defaultValue,
  },

  addWatermark: function () {
    const value = this.data.inputValue;
    this.setData({
      watermarkBck: value ? getWatermark({ text: value }) : '',
    });
  },

  removeWatermark: function () {
    this.setData({
      watermarkBck: '',
    })
  },

  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
});