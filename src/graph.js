
import * as d3 from 'd3'

class Graph {

    constructor (elementId) {

        this.svg = d3.select('#' + elementId)

        this.width = 0
        this.height = 0

        this.tmin = d3.timeYear.offset(new Date(), -3)
        this.tmax = new Date()

        this.users = []

    }

    resize ({ width, height }) {
        this.width = width
        this.height = height
        this._draw()
    }

    addUser (user) {
        const _user = user.map(d => {
            d['t'] = new Date(d.ratingUpdateTimeSeconds*1000)
            return d
        })
        this.users.push(user)
    }

    _draw () {

        const ymin = 0
        const ymax = 4000

        const tscale = d3.scaleTime().domain([ this.tmin, this.tmax ]).range([ 0, this.width ])
        const yscale = d3.scaleLinear().domain([ ymin, ymax ]).range([ this.height, 0 ])

        for (const user of this.users) {

            const points = this.svg.selectAll('circle').data(user)

            points.enter()
                .append('circle')
                .attr('cx', d => tscale(d.t))
                .attr('cy', d => yscale(d.newRating))
                .attr('r', 3)
                .attr('fill', d3.rgb(245, 225, 174))

            points
                .attr('cx', d => tscale(d.t))
                .attr('cy', d => yscale(d.newRating))

        }

    }

}

export default Graph