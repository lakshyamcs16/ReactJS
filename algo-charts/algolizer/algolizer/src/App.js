import React from 'react';
import './App.css';
import Slider from './user-interface/Slider';
import SortButton from './user-interface/Button'
import BubbleSort from './algorithms/BubbleSort';
import InsertionSort from './algorithms/InsertionSort';

class Visulizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [15, 22, 9, 23, 15, 4, 18, 22, 17, 21],
      color: ["green", "green", "green", "green", "green", "green", "green", "green", "green", "green"],
      size: 99,
      sortNow: false
    }
    this.getDataArraySize = this.getDataArraySize.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  randomIntArrayInRange = (min, max, n = 1) =>
      Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + min);
  
  createColorsArray = (n = 1) => 
  Array.from({ length: n }, () => "green");

  generateRandomArray() {
    let dataArray = this.randomIntArrayInRange(1, 25, this.state.size);
    let colorsArray = this.createColorsArray(this.state.size);
    this.setState({
      data: dataArray,
      color: colorsArray
    })
  }

  getDataArraySize (val) {
    this.setState({
      size: val
    }, () => {
      this.generateRandomArray();
    });
  }

  handleSubmit() {
    this.render();
    this.setState({
      sortNow: true
    })
  }

  handleSetSortState = (sort) => {
    this.setState({
      sortNow: sort
    })
  }

  render() {
    return (
      <>
      <Slider setSize = {this.getDataArraySize} />
      <SortButton handleSubmit = {this.handleSubmit} />

      <InsertionSort data={this.state.data} color={this.state.color} sortNow = {this.state.sortNow} setSortState = {this.handleSetSortState} />
      <BubbleSort 
      data={this.state.data} 
      color={this.state.color} 
      sortNow = {this.state.sortNow} 
      setSortState = {this.handleSortState}/>

      </>
    );
  };
}

export default Visulizer;