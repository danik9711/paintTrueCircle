import React from 'react';
import { Stage, Layer, Line, Circle} from 'react-konva';

const App = () => {

  const [lines, setLines] = React.useState([]);
  const isDrawing = React.useRef(false);
  const [trueCircle, setTrueCircle] = React.useState(false);
  const [xCircle, setXCircle] = React.useState(0);
  const [yCircle, setYCircle] = React.useState(0);
  const [rCircle, setRCircle] = React.useState(0);


  const handleMouseDown = (e) => {

    isDrawing.current = true;

    const pos = e.target.getStage().getPointerPosition();

    setLines([pos.x, pos.y]);
    setTrueCircle(false);
  };

  const handleMouseMove = (e) => {

    if (!isDrawing.current) {
      return;
    }

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    let lastLine = [...lines, point.x, point.y];

    setLines(lastLine);
  };

  const handleMouseUp = () => {

    let xArr = lines.filter((item, i) => {
      return i % 2 === 0;
    });

    xArr = xArr.sort((a,b) => b-a);

    let yArr = lines.filter((item, i) => {
      return i % 2 !== 0;
    })

    yArr = yArr.sort((a,b) => b-a);

    const xDiametr = (xArr[0] - xArr[xArr.length-1]);
    const yDiametr = (yArr[0] - yArr[xArr.length-1]);
    Math.sqrt(lines[1] - lines[lines.length-1])
    if ((Math.pow((lines[0] - lines[lines.length-2])), 2)+(Math.pow((lines[1] - lines[lines.length-1]), 2)) <= 3000) {
      if (Math.abs(xDiametr - yDiametr) <= 50) {
        setTrueCircle(true);
        setXCircle(xDiametr/2 + xArr[xArr.length-1]);
        setYCircle(yDiametr/2 + yArr[xArr.length-1]);
        setRCircle(((xDiametr/2) + (yDiametr/2))/2);
      } else {
        alert('Нарисуйте, что-то более похежее на окружность:(')
      }
    } else {
      alert('Не вижу тут окружности(постарайтесь более точно сомкнуть концы вашей линии)')
    }

    setLines([]);
    isDrawing.current = false;
  };

  const renderTrueCircle = () => {

    if (trueCircle) {
    return (
      <Circle
        radius={rCircle}
        stroke="#df4b26"
        strokeWidth={5}
        tension={0.5}
        x={xCircle}
        y={yCircle}
      />
    );
    }
  }

  return (
    <div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseUp ={handleMouseUp}
      >
        <Layer>
          {renderTrueCircle()}
          <Line
              points={lines}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={'source-over'}
            />
        </Layer>
      </Stage>
    </div>
  );
};

export default App;