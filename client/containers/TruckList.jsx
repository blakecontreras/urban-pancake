import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { bindActionCreators } from 'redux';
import TruckItem from '../components/TruckItem.jsx';
import { FetchTrucks } from '../actions/FetchTrucks';
import { FetchEvents } from '../actions/FetchEvents';

let selectedTruck = "";
class TruckList extends Component {
  // Runs FetchTrucks immediately so that the state will be up to date before the content starts to load
  componentWillReceiveProps(nextProps){
    // console.log("[truck list] nextprops: ", nextProps.currentTruck.currentTruck)
    if(nextProps.currentTruck.currentTruck){
      selectedTruck = nextProps.currentTruck.currentTruck;
      this.render();
    }
  };

  componentWillMount() {
    this.props.FetchTrucks();
    this.props.FetchEvents();
  };

  // Iterates over each truck in the database
  renderTrucks(truck) {
    var handle;
    if(truck._id==="user"){
      handle = '';
    }
    else{
      handle = truck.handle.slice(1, truck.handle.length); 
    }
   
    if(selectedTruck == truck.name){
      return  <div className="selected"><Link to={"/truckview/" + handle} key={truck._id} > <TruckItem truck={truck} /></Link></div>
    } else {
      return  <div className="not-selected"><Link to={"/truckview/" + handle} key={truck._id} > <TruckItem truck={truck} /></Link></div>
    }
  };

  // Iterates over each event in the database
  renderEvents(event) {
    var handle = event.handle.slice(1, event.handle.length); 
    event.yelpInfo = {name: null, yelpBizID: null, starsRating: null, review_count: null, custReview: null, photo: null,categories: null};

    if(selectedTruck == event.name){
      return  <div className="selected"><Link to={"/eventview/" + handle} key={event._id} > <TruckItem truck={event} /></Link></div>
    } else {
      return  <div className="not-selected"><Link to={"/eventview/" + handle} key={event._id} > <TruckItem truck={event} /></Link></div>
    }
  };

  // Maps truck prop to TruckItem
  render() {
    console.log("render TruckList this.props", this.props);

    return (
      <div className="truck-list well container-well">
        {this.props.trucks.map(truck => this.renderTrucks(truck))}
        {this.props.events.map(event => this.renderEvents(event))}
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    trucks: state.trucks,
    events: state.events,
    yelpInfo: state.yelpInfo,
    currentTruck: state.currentTruck
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ FetchTrucks, FetchEvents }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TruckList);
