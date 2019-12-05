// components/company_item/company_item.js
Component({
    properties: {
        company: {
            type: 'object',
            observer: function(n, o) {
                n && this.setData({
                    ...n
                })
            }
        }
    },
    data: {

    },
    methods: {
        companyShowDesc: function() {
            this.setData({
                showDesc: !this.data.showDesc,
            })
        },
        companyChosen: function(e) {
            // console.log(e)
            const id = e.currentTarget.dataset.id

            if (id) {
                this.triggerEvent('chosen', { id })
            }
        },
    },
    attached: function() {

        // console.log('============================', this.properties)

        this.setData({
            ...this.properties.company
        })
    }
})