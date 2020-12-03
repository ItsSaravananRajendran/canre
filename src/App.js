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
        <view x={x + 10} y={y} fill="#0000ff" height={20} width={20} />
        <view x={x} y={y + 10} fill="#0000ff" height={20} width={20} />
        <view x={x + 10} y={y + 10} fill="#0000ff" height={20} width={20} />
        <view x={x - 10} y={y} fill="#0000ff" height={20} width={20} />
        <view x={x} y={y - 10} fill="#0000ff" height={20} width={20} />
        <view x={x - 10} y={y - 10} fill="#0000ff" height={20} width={20} />
        <view x={x + 30} y={y + 30} fill="#0000ff" height={20} width={20} />
        <view x={x} y={y - 30} fill="#0000ff" height={20} width={20} />

        <text
          x={20}
          y={20}
          fill="#ff00ff"
          text="Hello React Native Custom Renderer"
        />
        <image
          src={require("./test.webp")}
          height={10}
          width={10}
          x={300}
          y={300}
        />
      </view>
    );
  }
}

export default App;
