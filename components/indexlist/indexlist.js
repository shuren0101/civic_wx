// components/indexlist.js
//获取应用实例
const app = getApp();

Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    getMusicContent: function (e) {
      wx.navigateTo({
        url: `/pages/Content/Content?musicInfo=${JSON.stringify(e.currentTarget.dataset.musicdetail)}`
      })
    },
  }
})