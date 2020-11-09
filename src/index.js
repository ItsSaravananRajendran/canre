import React from "react";
import CanvasRenderer from "./CanvasRenderer";
import { root } from "./CanvasDom.js";

import App from "./App";

CanvasRenderer.render(<App />, root.dom, root.render);
