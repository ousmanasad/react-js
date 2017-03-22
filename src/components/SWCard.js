import React, { Component } from 'react'

import './SWCard.css'

class SWCard extends Component {

    render() {

        const { name, height, mass, hair_color } = this.props

        return (
            <div className="card horizontal" style={ { margin: 'auto' } }>
                <div className="card-image weather-img-container">
                    <span className="card-title" style={ { fontSize: 36 } }>
                        { name}
                    </span>
                </div>
                <div className="card-stacked">
                    <div className="card-content">

                        <div className="sw-data">
                            <p>
                                <span>{ name }</span>
                            </p>
                            <p>
                                <span>{ height} </span>
                            </p>
                            <p>
                                <span>{ mass}</span>
                            </p>
                            <p>
                                <span>{ hair_color}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default SWCard
