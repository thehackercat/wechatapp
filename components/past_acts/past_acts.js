//index.js
//获取应用实例
const app = getApp()
const handleRequestThenRoute = require('../../services/handleRequestThenRoute.js')
const getUserInfo = require('../../services/getUserInfo.js')

Component({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },

    methods: {
        //事件处理函数
        bindViewTap: function() {
            // wx.navigateTo({
            //   url: '../list/list'
            // })
        },
        bindMainBtnTap: function(e) {
            const actid = e.currentTarget.dataset.actid
            getUserInfo((res) => {
                this._handleUserReq(res, actid)
            })
        },

        _handleUserReq: handleRequestThenRoute,

        getUserInfo: function(e) {
            console.log(e)
            app.globalData.userInfo = e.detail.userInfo
            this.setData({
                userInfo: e.detail.userInfo,
                hasUserInfo: true
            })
        },
        onShareAppMessage: function() {
            return app.globalData.shareMsg
        },
    },
})