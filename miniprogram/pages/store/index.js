// store.js
import { observable, action } from 'mobx-miniprogram'
export const store = observable({
  // store
  activeKey: 0,

  // 计算属性
  // get sum() {
  //   return this.numA + this.numB
  // },

  // actions
  setActiveKey: action(function (key) {
    this.activeKey = key
  })
})