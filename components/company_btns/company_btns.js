// components/company_btns/company_btns.js
Component({

  properties: {
    company: {
      type: 'object',
    },
    contactWho: {
      type: 'string'
    }
  },

  data: {

  },

  methods: {
    bindViewProfile: function () {
      var company = this.properties.company

      if (!company) {
        return
      }
      var companyId = company.id

      if (companyId) {
        wx.navigateTo({
          url: '/pages/full_detail/full_detail?companyId=' + companyId,
        })
      }
    },

    contactCompany: function () {
      this.saveOne(this.properties.company.ceoCode)
    },

    contactOfficer: function () {
      this.saveOne(this.properties.company.prCode)
    },

    saveOne: function (url) {
      console.log(this.properties.company)

      this.saveImageWrap(() => {
        this.downloadQrcode.call(this, url)
      })

    },
    alertError: function (err) {
      if (typeof err === 'string') {
        wx.showToast({
          title: err,
          icon: 'none',
        })
      } else {
        try {
          wx.showToast({
            title: JSON.stringify(err),
            icon: 'none',
          })
        } catch (e) {
          console.error(e)
        }
      }
    },

    downloadQrcode: function (url) {
      const company = this.properties.company;
      if (!url || typeof url !== 'string') {
        wx.showToast({
          title: '[' + company.name + ']的二维码保存失败',
          icon: 'none',
        })
        return
      }
      wx.showLoading({
        title: '正在下载',
      })

      wx.downloadFile({
        url,

        fail: (err) => {
          wx.hideLoading()
          this.alertError(err)
        },
        success: (res) => {

          wx.hideLoading()
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            // this.saveImageQueue({
            //   tempFilePath: res.tempFilePath,
            //   callback: callback,
            //   company: company,
            // })
            this.saveImageToAlbum(res.tempFilePath)
          }
        }
      })
    },

    saveImageToAlbum: function (path) {
      wx.saveImageToPhotosAlbum({
        filePath: path,
        success: (res) => {
          wx.showModal({
            title: '保存成功',
            content: '请在微信添加好友时，从相册选取二维码',
          })
        },
        fail: (err) => {

          wx.showToast({
            title: '[' + this.properties.company.name + ']的二维码保存失败',
            icon: 'none'
          })
        }
      })
    },

    saveImageWrap: function (fn) {
      wx.getSetting({
        success: res => {
          console.log(res)
          if (res.authSetting['scope.writePhotosAlbum']) {
            fn.call(this)
          } else {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success: res => {
                fn.call(this)
              }
            })
          }
        }
      })
    },
  }
})