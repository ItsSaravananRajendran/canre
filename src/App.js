import React, { Component } from "react";

const Holder = ({ x, y, padding, text, fill, height = 20, width = 20 }) => (
  <view x={x} y={y} fill={fill} height={height} width={width}>
    <text
      x={x + padding}
      y={y + padding + 40}
      fill="#000000"
      fontSize="45px digital"
      text={text}
    />
  </view>
);

class App extends Component {
  constructor(props) {
    super(props);
    const formattedTime = new Date().toLocaleTimeString();
    const [hours, minutes, seconds] = formattedTime.split(":");
    this.state = { hours, minutes, seconds };
  }

  componentDidMount() {
    window.setInterval(() => {
      const formattedTime = new Date().toLocaleTimeString();
      const [hours, minutes, seconds] = formattedTime.split(":");
      this.setState({ hours, minutes, seconds });
    }, 1000);
  }

  render() {
    const { hours, minutes, seconds } = this.state;
    const x = 50,
      y = 250;
    return (
      <view x={x} y={y} fill="#000000" height={90} width={300}>
        <Holder
          text={hours}
          x={x + 10}
          y={y + 10}
          fill="#fff"
          padding={10}
          height={70}
          width={50}
        />
        <Holder
          text={minutes}
          x={x + 90}
          y={y + 10}
          fill="#fff"
          padding={10}
          height={70}
          width={50}
        />
        <Holder
          text={seconds}
          x={x + 170}
          y={y + 10}
          fill="#fff"
          padding={10}
          height={70}
          width={120}
        />
      </view>
    );
  }
}

export default App;
