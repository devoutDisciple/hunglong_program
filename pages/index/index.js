// index.js
// 获取应用实例
const app = getApp();

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
      fail(res) {
        console.log(res, 111);
      },
      success(data) {
          console.log(data, 222);
      },
    });
  },
//   onFuck(hello) {
//     console.log(hello, 888);
//     console.log(this.selectComponent('#helloworld'));
//   },
    onClickBtn() {
      console.log(1232131);
      wx.requestSubscribeMessage({
        tmplIds: ['18g0GA2HP2hAebtcdUlkaheDd24_TwNcEb_mysGCywg',
        'JoVAkZQSbw1NIH4jJDDAA5n-62-MGii40s7VU2Hmcj0',
        'U5PKL1e1IdxY6IR3KTLyUUKAtrrF5g-IZuo5lb-hoCs'],
        success(errMsg, TEMPLATE_ID) {
            console.log('success---', errMsg, TEMPLATE_ID);
        },
        fail(errMsg, errCode) {
            console.log(errMsg, errCode, 999);
        },
      });
    // wx.navigateTo({
    //     url: '../my/my?hello=world&id=12',
    // });
  },
  onLoad() {
    wx.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline'],
      });

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: (res) => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          });
        },
      });
    }
  },
  getUserInfo(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },
});
