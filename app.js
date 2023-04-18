//app.js
const myaudio = wx.createInnerAudioContext();

App({
  globalData: {
    userSystem: undefined,
    myaudio: undefined,
    musicInfo: {}
  },
  onLoad: function () {},
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {},
  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {},
  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {},
  onUnload: function (e) {
    myaudio.destroy(); //销毁这个实例
  },
  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {},
  /**
   * 获取接口数据
   */
  _getData(url) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        header: {
          'content-type': 'json' // 默认值
        },
        success: resolve,
        fail: reject
      })
    })
  },
  /**
   * 获取用户设备信息
   */
  _getUserSystem() {
    return new Promise((resolve, reject) => {
      const userSystem = this.globalData.userSystem;
      if (userSystem) {
        console.log('已有数据');
        resolve(userSystem)
      } else {
        console.log('没有数据');
        const sysInfo = wx.getSystemInfoSync();
        const menuInfo = wx.getMenuButtonBoundingClientRect();
        // px转换到rpx的比例
        const pxToRpxScale = 750 / sysInfo.windowWidth;
        // window的宽度
        const windowWidth = sysInfo.windowWidth * pxToRpxScale;
        // window的高度
        const windowHeight = sysInfo.windowHeight * pxToRpxScale;
        // 状态栏的高度
        const statusBarHeight = sysInfo.statusBarHeight * pxToRpxScale;
        // 导航栏的高度
        const navigationBarHeight = (menuInfo.top - sysInfo.statusBarHeight) * 2 + menuInfo.height;
        // 屏幕的高度
        const screentHeight = sysInfo.screenHeight * pxToRpxScale;

        // 合并 sysInfo 和 menuInfo
        this.globalData.userSystem = Object.assign(sysInfo, menuInfo);
        // 胶囊右边距离
        this.globalData.userSystem.right = sysInfo.windowWidth - menuInfo.right;
        // 胶囊底部距离
        this.globalData.userSystem.bottom = menuInfo.top - sysInfo.statusBarHeight;

        this.globalData.userSystem.windowWidth = windowWidth;
        this.globalData.userSystem.windowHeight = windowHeight;
        this.globalData.userSystem.navigationBarHeight = navigationBarHeight;
        this.globalData.userSystem.screentHeight = screentHeight;
        // // 底部tabBar的高度
        // this.globalData.userSystem.tabBarHeight = Math.abs(screentHeight - statusBarHeight - navigationBarHeight - windowHeight);
        // console.log(this.globalData.userSystem.tabBarHeight);
        resolve(this.globalData.userSystem);
      }
    })
  },
  /**
   * 下载文件
   */
  _downloadFile(url) {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: url,
        success: resolve,
        fail: reject
      })
    })
  },
  // 播放
  play(musicInfo) {
    return new Promise((resolve, reject) => {
      this.globalData.musicInfo = musicInfo;
      if (this.globalData.userSystem.platform == "ios") {
        myaudio.src = musicInfo.url;
        myaudio.play();
        return resolve(200);
      } else {
        this._downloadFile(musicInfo.url).then(res => {
          if (res.statusCode === 200) {
            myaudio.src = res.tempFilePath;
            myaudio.play();
            return resolve(200);
          }
        });
      }
    })
  },
  // 停止
  stop: function () {
    console.log('停止');
    myaudio.pause();
  },
})