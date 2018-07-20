import React, { Component } from "react";
import "./home.css"
import { showModal, hideModal } from './index.js'
import { connect } from 'react-redux'

class Home extends Component {

//renders the pictures in the rows and columns from the state
  gridCreator() {
    let picturesWrapper = [];
    let mappedPictures = this.props.pictures.map((pic) => {
      return(
          <div key={pic.id} className="cell">
            <img id={pic.id} src={pic.pictures}
             className="responsiveImage"
             alt={pic.description}
             onClick={(event) => this.props.activateModal(event)} 
            />
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

  render() {
    return (
      <div>
        <h2>Click on picture to see the captured moment of life</h2>
        <br/>
        <div className="picturesContainer">
         {this.gridCreator()}
        </div>
   {/* The modal code goes here */}
        <div id="myModal" className="modal" style={this.props.modalShown ? {display: "block"} : {display: "none"}}>
          <span className="close" onClick={(event) => this.props.deactivateModal(event)}>&times;</span>
          <img className="modalContent" src={this.props.modalImgSrc} id="image" alt="unopened moment of life"/>
          <div id="caption">{this.props.modalDesc == null ? "Captured moment of life" : this.props.modalDesc}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pictures: state.pictures,
    modalShown: state.modalShown,
    modalImgSrc: state.modalImgSrc,
    modalId: state.modalId,
    modalDesc: state.modalDesc
  }
}

const mapDispatchToProps = dispatch => {
  return {
    activateModal: event => {
      dispatch(showModal(event))},
    deactivateModal: event => {
      dispatch(hideModal(event))}
    }
  }

//connector function
export default connect(mapStateToProps, mapDispatchToProps)(Home)