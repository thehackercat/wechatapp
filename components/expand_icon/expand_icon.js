// components/expand_icon/expand_icon.js
Component({
  /**
   * Component properties
   */
  properties: {
    active: {
      type: 'boolean'
    },
    expanded: {
      type: 'boolean',
      observer: function(newVal, oldVal) {
        console.log(arguments)
      }
    }
  },

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
  },

  ready: function () {
    console.log('filter', this.properties)
  },
  

})
