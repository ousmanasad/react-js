/* ROOT Component of your App  */

import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

const Materialize = window.Materialize

const APP_TITLE = 'Star Wars Characters Info'
//update document title (displayed in the opened browser tab)
document.title = APP_TITLE

//web api utils
import { get, ENDPOINTS } from './utils/api'

//components
import SWCard from './components/SWCard'

class App extends Component {

    /* React state initialization DOCUMENTATION : https://facebook.github.io/react/docs/react-without-es6.html#setting-the-initial-state */

    constructor( props ) {
        super( props )
        this.state = {
            sw: undefined,
            name: ''
        }
    }


    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h1>{ APP_TITLE }</h1>
                    <img src={ logo } className="App-logo" alt="logo" />
                </div>

                <div className="App-content">
                    <div className="center-align">

                        <form onSubmit={ this.fetchSW }>

                            <div className="row" style={ { marginBottom: 0 } }>
                                <div className="input-field col s6 offset-s3">
                                    <input id="nameInput" type="text" value={ this.state.name } onChange={ this.handleChange } />
                                    <label htmlFor="nameInput">Name of the Star Wars Characters</label>
                                </div>
                            </div>

                            <button type="submit" className="waves-effect waves-light btn">
                                Informations
                            </button>

                        </form>

                    </div>

                    <div className="row" style={ { marginTop: 20 } } >
                        <div className="col s12 m6 offset-m3">
                            { this.displaySWInfo() }
                        </div>
                    </div>
                </div>

            </div>
        )
    }



    handleChange = ( event ) => {
        this.setState( {
            name: event.target.value
        } )
    }


    //method triggered by onSubmit event of the form or by onClick event of the "Weather?" button
    /* Arrow function syntax used for Autobinding, see details here : https://facebook.github.io/react/docs/react-without-es6.html#autobinding */
    fetchSW = async ( event ) => {

        event.preventDefault()

        /* ASYNC - AWAIT DOCUMENTATION : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/await */

        try {
            let _sw = await get( ENDPOINTS.SW_API_URL, {
                //YOU NEED TO PROVIDE YOUR "APIXU" API KEY HERE, see /utils/api.js file to grab the DOCUMENTATION file
                search: this.state.name
            } )
            this.setState({
         sw: _sw
})
          }


        catch ( error ) {
            Materialize.toast( error, 8000, 'error-toast' )
            console.log( 'Failed fetching data: ', error )
        }

    }


    displaySWInfo = () => {
        const sw = this.state.sw

        /*
            DATA FORMAT SENT BY THE API LOKKS LIKE THIS :

            {
                "pixabayPicture": string, //CUSTOM ADD VIA PIXABAY API CALL
                "location": {
                    "name": string,
                    "region": string,
                    "country": string,
                    "lat": number,
                    "lon": number,
                    "tz_id": string,
                    "localtime_epoch": number,
                    "localtime": string
                },
                "current": {
                    "temp_c": number,
                    "is_day": boolean,
                    "condition": {
                        "text": string,
                        "icon": string
                    },
                    "wind_kph": number
                }
            }

        */

        if ( sw ) {

            console.log(sw)

            var array = sw.results.map(function(element) {

              return <SWCard name={element.name}
				height={element.height}
				mass={element.mass}
				hair_color={element.hair_color}
				 />

})
        return array;


        }

        return null
    }

}

export default App
