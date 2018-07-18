import React, { Component } from "react";
import "./home.css"
import { connect } from 'react-redux'

class Home extends Component {
  gridCreator() {
    let picturesWrapper = [];
    let mappedPictures = this.props.pictures.map((pic) => {
      return(
          <div key={pic.id} className="cell">
            <img src={pic.pictures} className="responsiveImage" alt="unopened moment of life" />
          </div>
      )
    });
    picturesWrapper.push(<div className="grid" key="0">{mappedPictures.slice(0, 7)}</div>)
    picturesWrapper.push(<div className="grid" key="1">{mappedPictures.slice(7, 13)}</div>)
    picturesWrapper.push(<div className="grid" key="2">{mappedPictures.slice(13, 19)}</div>)
    picturesWrapper.push(<div className="grid" key="3">{mappedPictures.slice(19, 25)}</div>)
    picturesWrapper.push(<div className="grid" key="4">{mappedPictures.slice(25, 31)}</div>)
  return picturesWrapper
  }
  
  
  render() {
    return (
      <div>
        <h2>Enjoy randomly selected pictures for moments of life:</h2>
        <br/>
        <div className="picturesContainer">
         {this.gridCreator()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  pictures: state.pictures
}
}



//connector
export default connect(mapStateToProps)(Home)