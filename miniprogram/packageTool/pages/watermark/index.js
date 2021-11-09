// pages/watermark/index.js
import { getWatermark } from '../../../components/utils/index.js';

// const app = getApp();
const waterUrl = getWatermark();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    watermarkBck: '',
  },

  addWatermark: function () {
    this.setData({
      watermarkBck: this.data.watermarkBck ? '' : waterUrl,
    });
  },
});