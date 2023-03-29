//index.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    list: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this._getHotMusicList();
  },
  async _getHotMusicList() {
    let res = await app._getData('http://m.kugou.com/?json=true');
    this.setData({
      imgUrls: res.data.banner,
      list: res.data.data
    })
  },
  getMusicContent: function (e) {
    wx.navigateTo({
      url: '../Content/Content?hash=' + e.currentTarget.dataset.hash
    })
  },
})