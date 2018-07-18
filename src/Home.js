import React, { Component } from "react";
import "./home.css"
import { connect } from 'react-redux'

class Home extends Component {
  render() {
    console.log(this.props.pictures)
    return (
      <div>
        <h2>Enjoy randomly selected pictures for moments of life:</h2>
        <br/>
        <div className="picturesContainer">
         {this.props.pictures.map((pic) => {
           return(
             <div key={pic.id} className="onePicture">
               <div key={pic.id} className="picture">
                 <img src={pic.pictures} alt="unopened moment of life" />
                 <div className="pictureDescription">{pic.description == null ? "Captured moment oflife" : pic.description}</div>
               </div>
             </div>
           )
         })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.pictures)
  return {
  pictures: state.pictures
}
}



//connector
export default connect(mapStateToProps)(Home)