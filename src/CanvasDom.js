class Node {
  constructor(type, typeSpecificProps, commonProps) {
    this.sibling = null;
    this.children = [];
    this.type = type;
    this.typeSpecificProps = typeSpecificProps;
    this.commonProps = commonProps;

    ["removeChildFromContainer", "appendChild"].forEach(
      (method) => (this[method] = this[method].bind(this))
    );
  }

  appendChild(newChild) {
    const lastChild = this.children.find(
      (child) => (child || {}).sibling === null
    );
    lastChild && (lastChild.sibling = newChild);
    this.children.push(newChild);
  }

  removeChildFromContainer(container, child) {
    if (container.children.length === 0) {
      return false;
    }

    const index = container.children.indexOf(child);
    if (index !== -1) {
      //this.removeChild(container, child);
      return true;
    }

    for (const childOfContainer of container.children) {
      if (this.removeChildFromContainer(childOfContainer, child)) return true;
    }
  }

  removeChild(childToBeRemoved) {
    const children = this.children;
    const index = children.indexOf(childToBeRemoved);
    if (index !== 0) {
      const previousSibling = children[index - 1];
      previousSibling.sibling = childToBeRemoved.sibling;
    }
    this.children = [...children.splice(0, index), ...children.slice(index)];
  }
}

class CanvasDOM {
  constructor(canvasID) {
    const canvas = document.getElementById(canvasID);
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext("2d");
    const root = new Node("parent");
    this.dom = root;
    ["render"].forEach((method) => (this[method] = this[method].bind(this)));
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  createRect(typeSpecificProps, commonProps) {
    const { height, width } = typeSpecificProps;
    const { x, y, fill } = commonProps;
    this.ctx.beginPath();
    if (fill) {
      this.ctx.fillStyle = fill;
      this.ctx.fillRect(x, y, width, height);
    } else {
      this.ctx.rect(x, y, width, height);
    }
    this.ctx.stroke();
  }

  createText(typeSpecificProps, commonProps) {
    const { text } = typeSpecificProps;
    const { x, y, fill } = commonProps;
    this.ctx.beginPath();
    this.ctx.fillStyle = fill;
    this.ctx.fillText(text, x, y);
  }

  renderElement(node) {
    const { children, type, typeSpecificProps = {}, commonProps = {} } = node;

    switch (type) {
      case "view":
        this.createRect(typeSpecificProps, commonProps);
        break;
      case "text":
        this.createText(typeSpecificProps, commonProps);
        break;
    }

    if (children.length !== 0) {
      children.forEach((child) => this.renderElement(child));
    }
  }

  render() {
    this.clearCanvas();
    this.renderElement(this.dom);
  }
}

const root = new CanvasDOM("displayRoot");

export { root, Node };
