import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { x: 10, y: 10 };
  }

  componentDidMount() {
    window.setInterval(() => {
      this.setState(({ x, y }) => ({ x: x + 2, y: y + 2 }));
    }, 16);
  }

  render() {
    const { x, y } = this.state;
    return (
      <view x={x} y={y} fill="#0000ff" height={20} width={20}>
        <text x={20} y={20} fill="#ff00ff">
          Hello React Native Custom Renderer
        </text>
      </view>
    );
  }
}

export default App;
