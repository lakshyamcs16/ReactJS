import React from 'react';
import './App.css';
import Slider from './user-interface/Slider';
import SortButton from './user-interface/Button'
import BubbleSort from './algorithms/BubbleSort';

class Visulizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [15, 22, 9, 23, 15, 4, 18, 22, 17, 21, 18, 16, 10, 20, 20, 13, 9, 2, 17, 24, 9, 5, 8, 17, 10, 15, 12, 23, 15, 12, 13, 23, 19, 3, 23, 1, 8, 7, 1, 22, 21, 9, 4, 1, 15, 21, 14, 2, 2, 14, 21, 2, 18, 2, 20, 9, 17, 3, 16, 24, 11, 3, 21, 23, 12, 6, 8, 14, 13, 15, 21, 10, 6, 15, 25, 15, 9, 8, 11, 6, 2, 16, 13, 7, 2, 1, 5, 11, 8, 22, 25, 13, 15, 15, 16, 14, 22, 5, 23],
      color: ["green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green"],
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

  render() {
    return (
      <>
      <Slider setSize = {this.getDataArraySize} />
      <SortButton handleSubmit = {this.handleSubmit} />
      <BubbleSort data={this.state.data} color={this.state.color} sortNow = {this.state.sortNow} />
      </>
    );
  };
}

export default Visulizer;