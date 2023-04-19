// cunsom - tab - bar / index.js
const app = getApp()

Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    selected: {
      type: Number,
      default: 0
    }
  },
  data: {
    imgUrl: "",
    list: [{
        "tabId": "1",
        "pagePath": "/pages/index/index", //此处路径要写不带 ‘/’的
        "text": "主页", //tab名字
        "iconPath": "iconfont icon-yinfu2",
        "selectedIconPath": "iconfont icon-yinfu2" //选中时的tab图标
      },
      {
        "tabId": "2",
        "pagePath": "/pages/Content/Content",
        "text": "",
        "iconPath": "iconfont icon-Headphones",
        "selectedIconPath": "iconfont icon-Headphones"
      },
      {
        "tabId": "3",
        "pagePath": "/pages/List/musicList/musicList",
        "text": "排行",
        "iconPath": "iconfont icon-paihangbanggequ",
        "selectedIconPath": "iconfont icon-paihangbanggequ"
      },
    ],
  },
  methods: {
    setImg(imgSrc) {
      this.setData({
        imgUrl: imgSrc,
      })
    },
    toPage(e) {
      const pagepath = this.data.list[e.currentTarget.dataset.index].pagePath
      //切换tab时，改变路由地址
      wx.switchTab({
        url: pagepath
      })
    }
  }
})