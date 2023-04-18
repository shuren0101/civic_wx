// components/navbar/navbar.js
const app = getApp();
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true, //启用插槽
  },
  /**
   * 组件的属性列表
   */
  properties: {
    back: {
      type: Boolean,
      default: false
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    userSystem: [],
  },
  created: function () {},
  attached: function () {
    app._getUserSystem().then(res => {
      this.setData({
        userSystem: res
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toPage: function () {
      wx.switchTab({
        url: '/pages/index/index'
      })
    },
  }
})