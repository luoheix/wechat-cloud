Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/tool/index",
      text: "工具",
      iconPath: "/static/images/tool.png",
      selectedIconPath: "/static/images/tool-selected.png"
    }, {
      pagePath: "/pages/blog/index",
      text: "博客文章",
      iconPath: "/static/images/blog.png",
      selectedIconPath: "/static/images/blog-selected.png"
    }, {
      pagePath: "/pages/resume/index",
      text: "个人简介",
      iconPath: "/static/images/person.png",
      selectedIconPath: "/static/images/person-selected.png"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      if (data.index !== this.data.selected) {
        const url = data.path;
        console.log(url, data.index, 'tet url')
        // this.setData({
        //   selected: data.index,
        // });
        wx.switchTab({ url });
      }
    }
  }
})