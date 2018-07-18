import React, { Component } from "react";
import "./home.css"
import { connect } from 'react-redux'

class Home extends Component {
  gridCreator() {
    let picturesWrapper = [];
    let mappedPictures = this.props.pictures.map((pic) => {
      return(
          <div key={pic.id} className="picture responsiveImage">
            <img src={pic.pictures} alt="unopened moment of life" />
          </div>
      )
    });
    picturesWrapper.push(<div className="grid" key="0">{mappedPictures.slice(0, 6)}</div>)
    picturesWrapper.push(<div className="grid" key="1">{mappedPictures.slice(6, 11)}</div>)
    picturesWrapper.push(<div className="grid" key="2">{mappedPictures.slice(11, 16)}</div>)
    picturesWrapper.push(<div className="grid" key="3">{mappedPictures.slice(16, 21)}</div>)
    picturesWrapper.push(<div className="grid" key="4">{mappedPictures.slice(21, 26)}</div>)
    picturesWrapper.push(<div className="grid" key="5">{mappedPictures.slice(26, 31)}</div>)
  return picturesWrapper
  }
  
  
  render() {
    console.log(this.props.pictures)
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
  console.log(state.pictures)
  return {
  pictures: state.pictures
}
}



//connector
export default connect(mapStateToProps)(Home)