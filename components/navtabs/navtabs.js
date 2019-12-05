const defaultLogoHeight = 100,
    defaultLogoMarginTop = 65
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },

    properties: {
        scrollTop: {
            type: 'number',
            observer: function(scrollTop) {
                const logoHeight = Math.min(defaultLogoHeight, Math.max(defaultLogoHeight - scrollTop, 1))
                const logoMarginTop = defaultLogoMarginTop + defaultLogoHeight - logoHeight



                this.setData({
                    logoHeight,
                    logoMarginTop,
                    isCircleLogoDisplay: logoHeight < 5
                })
            }
        }
    },

    data: {
        currentTab: 1,
        logoHeight: defaultLogoHeight,
        logoMarginTop: defaultLogoMarginTop,
        isCircleLogoDisplay: false,
        windowWidth: wx.getSystemInfoSync().windowWidth,
    },

    methods: {
        onTabSelected: function(e) {
            let tabId = +e.target.dataset.tabid
            if (Number.isFinite(tabId) && !Number.isNaN(tabId)) {
                this.setData({
                    currentTab: tabId
                })
            }
        },

        calcBgPositionX: function() {
            const oriLogoWidth = 945,
                oriLogoHeight = 331, // 计算长宽比
                borderWidth = 20

            const { windowWidth } = this.data
            const logoBgPositionX = (windowWidth - 2 * borderWidth - oriLogoWidth / oriLogoHeight * defaultLogoHeight) / 2
            this.setData({
                logoBgPositionX,
            })
        }
    },

    attached: function(e) {
        this.calcBgPositionX()
    }
})