// Canvas.tsx
import * as React from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";

const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem"
};

class Canvas extends React.Component {
  private canvas = React.createRef<ReactSketchCanvasRef>();

  public handleExport = async () => {
    if (this.canvas.current) {
      try {
        const data = await this.canvas.current.exportImage("png");
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    }
  };

  render() {
    return (
      <div>
        <ReactSketchCanvas
          ref={this.canvas}
          strokeWidth={5}
          strokeColor="black"
          style={styles}
        />
      </div>
    );
  }
}

export default Canvas;
