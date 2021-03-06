import ReactReconciler from "react-reconciler";

import { Node, root } from "./CanvasDom.js";

const rootHostContext = {};
const childHostContext = {};

const hostConfig = {
  now: Date.now,
  getRootHostContext: () => {
    return rootHostContext;
  },
  prepareForCommit: () => {},
  resetAfterCommit: () => {},
  getChildHostContext: () => {
    return childHostContext;
  },
  shouldSetTextContent: (type, props) => {
    return (
      typeof props.children === "string" || typeof props.children === "number"
    );
  },
  createInstance: (
    type,
    newProps,
    rootContainerInstance,
    _currentHostContext,
    workInProgress
  ) => {
    const { x, y, fill, fontSize, ...typeSpecificProps } = newProps;
    const node = new Node(type, typeSpecificProps, { x, y, fill, fontSize });
    return node;
  },
  createTextInstance: (...args) => {
    return new Node("text", {});
  },
  appendInitialChild: (parent, child) => {
    parent.appendChild(child);
  },
  appendChild: (parent, child) => {
    parent.appendChild(child);
  },
  finalizeInitialChildren: () => {},
  appendChildToContainer: (parent, child) => {
    parent.appendChild(child);
  },
  prepareUpdate: (instance, type, oldProps, newProps, ...args) => {
    const payload = { commonProps: {}, typeSpecificProps: {} };
    if (oldProps.x !== newProps.x) {
      payload.commonProps.x = newProps.x;
    }
    if (oldProps.text !== newProps.text) {
      payload.typeSpecificProps.text = newProps.text;
    }
    return payload;
  },
  commitUpdate: (
    instance,
    updatePayload,
    type,
    oldProps,
    newProps,
    ...args
  ) => {
    const { commonProps, typeSpecificProps } = instance;
    instance.commonProps = { ...commonProps, ...updatePayload.commonProps };
    instance.typeSpecificProps = {
      ...typeSpecificProps,
      ...updatePayload.typeSpecificProps,
    };
    root.render();
  },
  commitTextUpdate: (textInstance, oldText, newText) => {
    textInstance.text = newText;
  },
  removeChild: (parentInstance, child) => {
    parentInstance.removeChild(child);
  },
  clearContainer: () => {},
  supportsMutation: true,
};

const ReactReconcilerInst = ReactReconciler(hostConfig);

export default {
  render: (reactElement, canvasRoot, callback) => {
    if (!canvasRoot._rootContainer) {
      canvasRoot._rootContainer = ReactReconcilerInst.createContainer(
        canvasRoot,
        false
      );
    }

    // update the root Container
    return ReactReconcilerInst.updateContainer(
      reactElement,
      canvasRoot._rootContainer,
      null,
      callback
    );
  },
};
