import React, { Component } from "react";
import "./home.css"
import { connect } from 'react-redux'

class Home extends Component {
constructor(props) {
  super(props);
  this.state = {
    modalShown: false,
    modalImgSrc: "",
    modalDesc: ""
  }
}
  gridCreator() {
    let picturesWrapper = [];
    let mappedPictures = this.props.pictures.map((pic) => {
      return(
          <div key={pic.id} className="cell">
            <img src={pic.pictures} className="responsiveImage" alt="unopened moment of life" onClick={() => this.activateModal(pic.pictures, pic.description)} />
          </div>
      )
    });
    picturesWrapper.push(<div className="grid" key="0">{mappedPictures.slice(0, 7)}</div>)
    picturesWrapper.push(<div className="grid" key="1">{mappedPictures.slice(7, 13)}</div>)
    picturesWrapper.push(<div className="grid" key="2">{mappedPictures.slice(13, 19)}</div>)
    picturesWrapper.push(<div className="grid" key="3">{mappedPictures.slice(19, 25)}</div>)
    picturesWrapper.push(<div className="grid" key="4">{mappedPictures.slice(25, 31)}</div>)
  return picturesWrapper;
  }
  
  activateModal(src, description) {
    console.log(description);
    !this.state.modalShown ? this.setState({modalShown: true}) : this.setState({modalShown: false});
    
    !this.state.modalShown ? 
    this.setState({modalImgSrc: "", modalDesc: ""}) : 
    this.setState({modalImgSrc: src, modalDesc: description})

  }

  render() {
    return (
      <div>
        <h2>Enjoy pictures encapsulating moment of life:</h2>
        <br/>
        <div className="picturesContainer">
         {this.gridCreator()}
        </div>
   {/* The modal code goes here */}
        <div id="myModal" className="modal" style={this.state.modalShown ? {display: "block"} : {display: "none"}}>
          <span className="close" onClick={() => this.activateModal()}>&times;</span>
          <img className="modalContent" src={this.state.modalImgSrc} id="image" alt="unopened moment of life"/>
          <div id="caption">{this.state.modalDesc}</div>
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