import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/resumeStore'

Component({
  behaviors: [storeBindingsBehavior],
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
  },
  data: {
    // 这里是一些组件内部数据
    // someData: {}
  },
  storeBindings: {
    store,
    fields: {
      resumeData: 'resumeData'
    },
    actions: {
      // buttonTap: 'update'
    },
  },
  methods: {
    // 这里是一个自定义方法
    // customMethod: function () { }

    // 复制
    onCopy: function (e) {
      const { value } = e.currentTarget.dataset;
      wx.setClipboardData({
        data: value,
        // success (res) {
        //   wx.getClipboardData({
        //     success (res) {
        //       console.log(res.data) // data
        //     }
        //   })
        // }
      })
    },
  }
})