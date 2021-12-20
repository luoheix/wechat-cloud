// store.js
import { observable, action } from 'mobx-miniprogram'
export const store = observable({
  // store
  numList: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
  resumeData: {
    infoData: {},
    skillsList: [],
    simpleSkillsList: [],
    advantageList: [],
    workList: [],
    educationData: {},
    selfList: [],
    blogList: [],
    projectList: [],
  },

  // 计算属性
  // get sum() {
  //   return this.numA + this.numB
  // },

  // actions
  setStoreData: action(function (data) {
    const resumeData = {};
    Object.keys(data).forEach(item => {
      resumeData[item] = data[item]
    })
    this.resumeData = resumeData
  })
})