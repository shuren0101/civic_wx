//index.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userSystem: [],
    loading: true,
    imgUrls: [],
    list: [],
    singerList: [],
    rankList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      userSystem: app.globalData.userSystem
    })
    this._getHotMusicList();
    this._getSingerList();
    this._getRankList();
  },
  onShow: function () {
    // if (typeof this.getTabBar === 'function' &&
    //   this.getTabBar()) {
    //   this.getTabBar().setData({
    //     //就是页面显示出来后，让相应的tab改变颜色 图标等样式，也就是这一步可能造成的自定义tab会闪屏  
    //     selected: 3
    //   })
    // }
  },
  async _getHotMusicList() {
    let res = await app._getData('http://m.kugou.com/?json=true');
    let list = res.data.data.filter((item, index) => {
      item.album_sizable_cover = item.album_sizable_cover.replace('{size}', '240');
      return index <= 5;
    })
    this.setData({
      imgUrls: res.data.banner,
      list: list,
    })
  },
  async _getSingerList() {
    let res = await app._getData('http://m.kugou.com/singer/class&json=true');
    this.setData({
      singerList: res.data.list
    })
  },
  async _getRankList() {
    let res = await app._getData('http://m.kugou.com/rank/list&json=true');
    this.setData({
      rankList: res.data.rank.list.filter((item, index) => {
        item.banner7url = item.banner7url.replace('/{size}', '');
        return index <= 2;
      }),
      loading: false
    })
  },

  getMusicContent: function (e) {
    wx.navigateTo({
      url: '../Content/Content?hash=' + e.currentTarget.dataset.hash
    })
  },
})