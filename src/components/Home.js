import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import Header from './Header';
import NewPost from './NewPost';
import ContPistolRifle from './ContPistolRifle';

class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            resultsRP: []
        }
    }
    //gets items from server
    componentDidMount() {
        fetch(`https://the-social-reloader-server.herokuapp.com/home`)
      .then(response => response.json())
      .then(data => 
        this.handleData(data)
      );
    }
    //sorts the items by random and put the items in the state
    handleData = (data) => {
        let final = data
                        .map((a) => ({sort: Math.random(), value: a}))
                        .sort((a, b) => a.sort - b.sort)
                        .map((a) => a.value)
        this.setState({
            resultsRP: final
        })
        console.log(final)
    }
    render() {
        return(
               <div className="Container">
                   <main>
                           <NewPost />
                           <section className="sub-content">
                               {this.state.resultsRP.map(data => {
                                    return <ContPistolRifle page={data.id} img={data.img} name={data.name} user={data.user} cal={data.caliber} bullet={data.bullet} powder={data.powder} primer={data.primer} brandcase={data.brandcase} price={data.price} fps={data.fps} min={data.min} avg={data.avg} max={data.max}  />
                               })}
                           </section>
                   </main>
               </div>
        )
    }
}

export default Home;
