import React, {Component} from 'react';
import Header from './Header';
import ContPistolRifle from './ContPistolRifle';
import ContShotgun from './ContShotgun';

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            resultsRifle: [],
            resultsShotgun: [],
            isThereData: false
        }
    }

    componentDidMount() {
        let path = window.location.search
        fetch(`http://localhost:8000/search${path}`)
      .then(response => response.json())
      .then(data => 
        this.handleState(data)
      );
    }

    handleState(data) {
        let riflePistolArr = []
        let shotgun = []
        data.map(data => {
            if(data.gauge === undefined) {
                riflePistolArr.push(data)
            } else {
                shotgun.push(data)
            }
        })
        if(data.length > 0) {
            this.setState({
                resultsRifle: riflePistolArr,
                resultsShotgun: shotgun,
                isThereData: true
            })
        } else {
            console.log("Nothing Found")
        }
    }

    render() {
        return(
            <body>
                <div className="Container">
                    <Header />
                    <main>
                        <section className="rps-sec">
                            <h2>Search Results</h2>
                            {(this.state.resultsShotgun.length !== 0) ? this.state.resultsShotgun.map(data => {
                                return <ContShotgun page={data.id} img={data.img} name={data.name} user={data.user} gauge={data.gauge} shot={data.shot} primer={data.primer} shell={data.shell} price={data.price} fps={data.fps} min={data.min} avg={data.avg} max={data.max}  />
                            }) : console.log('No Shotgun Found')}
                            {this.state.isThereData ? this.state.resultsRifle.map(data => {
                            return <ContPistolRifle page={data.id} img={data.img} name={data.name} user={data.user} cal={data.caliber} bullet={data.bullet} primer={data.primer} brandcase={data.brandcase} price={data.price} fps={data.fps} min={data.min} avg={data.avg} max={data.max}  /> })
                                : <h3>Sorry We Couldn't Find your Reloads</h3>}
                        </section>
                    </main>
                </div>
            </body>
        )
    }
}

export default Search