Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/index/index",
      text: "工具",
      iconPath: "/static/images/tool.png",
      selectedIconPath: "/static/images/tool-selected.png",
    }, {
      pagePath: "/pages/jumpResume/index",
      text: "个人简历",
      iconPath: "/static/images/resume.png",
      selectedIconPath: "/static/images/resume-selected.png",
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      console.log(url, data.index, 'tet url')
      wx.switchTab({ url });
      this.setData({
        selected: data.index,
      });
    }
  }
})