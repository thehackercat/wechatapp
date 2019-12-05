// components/searchbar/searchbar.js
Component({
  properties: {

  },
  
  data: {
    value: '',
  },
  
  methods: {
    search: function () {
      this.triggerEvent('search', { value: this.data.value })
    },

    clear: function () {
      this.setData(
        { value: '', },
        () => this.search()
      )
    },

    input: function (e) {
      this.setData({
        value: e.detail.value
      })
    }
  }
})
