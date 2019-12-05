const app = getApp(), globalData = app.globalData
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentTab: {
      type: 'string',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goSearch: function () {
      if (this.properties.currentTab === 'search') {
        return;
      }

      wx.redirectTo({
        url: '/pages/search/search',
      })
    },
    goVideos: function () {
      if (this.properties.currentTab === 'videos') {
        return
      }

      wx.redirectTo({
        url: '/pages/index_video/index_video',
      })
    }
  },
  // lifetimes
  attached: function () {
    console.log('attached', this.properties)
  },
})
