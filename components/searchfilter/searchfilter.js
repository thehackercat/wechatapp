// all filters. key encoded
const filters = {
  round: [
    { key: 'Pre-A', name: 'Pre-A轮', },
    { key: 'A', name: 'A轮', },
    { key: 'A+', name: 'A+轮', },
    { key: 'B', name: 'B轮', },
    { key: 'B+', name: 'B+轮', },
    { key: 'C', name: 'C轮', },
    { key: 'C+', name: 'C+轮', },
    { key: 'D', name: 'D轮', },
    { key: 'D+', name: 'D+轮', },
    { key: 'E', name: 'E轮', },
    { key: 'F', name: 'F轮', },
    { key: 'Pre-IPO', name: 'Pre-IPO轮', },
  ].map(obj => ({ name: obj.name, key: encodeURIComponent(obj.key) })),
  currency: [
    { key: 'dollar', name: '美元', },
    { key: 'rmb', name: '人民币', },
  ],
  category: [
    { name: '企业服务' },
    { name: '大消费' },
    { name: '医疗健康' },
    { name: '硬件' },
    { name: '文化娱乐' },
    { name: '教育' },
    { name: '金融' },
    { name: '汽车交通' },
    { name: '房产服务' },
    { name: '物流' },
    { name: '农业' },
    { name: '区块链' },
  ].map(obj => ({ name: obj.name, key: encodeURIComponent(obj.name) }))
}

const panels = Object.keys(filters)

// components/filter/searchfilter.js
Component({
  properties: {

  },

  data: {
    currentFilter: 'all',
    offsetLeft: 0,
    expanded: false,
    filters,
    panels,
    panelLeftOffset: 0,
    filterSelect: {
      round: false,
      currency: false,
      category: false,
    }
  },

  methods: {

    /**
     * n个panel, offset应该是 -1/(n-1) * 100%
     */
    calcPanelLeftOffset: function (name) {
      const index = panels.indexOf(name)
      console.log(name, index);
      return -1 / panels.length * index * 100 + '%'
    },

    tapOption: function (e) {
      const option = e.currentTarget.dataset.option,
        panel = e.currentTarget.dataset.panel

      if (!panel || !option) {
        return
      }

      let panels = this.data.filters[panel].slice(0)

      panels.forEach((opt) => {
        if (opt.key === option) {
          opt.selected = !opt.selected // 取反
        }
      })

      let hasSelectedChild = panels.some(opt => opt.selected === true)

      this.setData(
        {
          filters: {
            ...this.data.filters,
            [panel]: panels,
          },
          filterSelected: {
            ...this.data.filterSelected,
            [panel]: hasSelectedChild
          }
        },
        this.emitFilters
      )
    },

    /**
     * 把选中的filter decode之后, 发送事件通知父组件
     */
    emitFilters: function () {

      let allSelected = {}

      panels.forEach(panel => {
        const { filters } = this.data

        if (Array.isArray(filters[panel])) {
          filters[panel].forEach(opt => {
            if (opt.selected === true) {
              allSelected[panel] = allSelected[panel] || []
              allSelected[panel].push(decodeURIComponent(opt.key))
            }
          })
        }
      })

      this.triggerEvent(
        'change',
        { filters: allSelected }
      )
    },

    onTabClick: function (e) {

      const tabFilter = e.currentTarget.dataset.filtername

      if (tabFilter === 'all') {
        this.reset();
      }

      if (this.data.currentFilter === tabFilter) {
        this.setData({
          expanded: !this.data.expanded && tabFilter !== 'all',
        })
      } else {
        this.setData({
          offsetLeft: e.currentTarget.offsetLeft,
          currentFilter: tabFilter,
          expanded: tabFilter !== 'all',
          panelLeftOffset: this.calcPanelLeftOffset(tabFilter),
        })
      }
    },

    reset: function () {

      let filterSelected = {}

      panels.forEach(panel => {

        filterSelected[panel] = false

        filters[panel].forEach(opt => {
          opt.selected = false
        })
      })

      this.setData(
        {
          filters,
          filterSelected,
        },
        this.emitFilters
      )
    }
  }
})