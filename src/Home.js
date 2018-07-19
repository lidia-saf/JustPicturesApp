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
//renders the pictures in the rows and columns from the state
  gridCreator() {
    let picturesWrapper = [];
    let mappedPictures = this.props.pictures.map((pic) => {
      return(
          <div key={pic.id} className="cell">
            <img id={pic.id} src={pic.pictures} className="responsiveImage" description={pic.description} alt="unopened moment of life" onClick={(e) => this.activateModal(e)} />
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
  
  //shows and hides the modal for a particular picture on click
  activateModal(e) {
    console.log(e.target);
 //   !this.state.modalShown ? this.setState({modalShown: true, modalImgSrc: src, modalDesc: description}) : this.setState({modalShown: false, modalImgSrc: "", modalDesc: ""});
  }


  render() {
    return (
      <div>
        <h2>Click on picture to see the captured moment of life</h2>
        <br/>
        <div className="picturesContainer">
         {this.gridCreator()}
        </div>
   {/* The modal code goes here */}
        <div id="myModal" className="modal" style={this.state.modalShown ? {display: "block"} : {display: "none"}}>
          <span className="close" onClick={() => this.activateModal()}>&times;</span>
          <img className="modalContent" src={this.state.modalImgSrc} id="image" alt="unopened moment of life"/>
          <div id="caption">{this.state.modalDesc == null ? "Captured moment of life" : this.state.modalDesc}</div>
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