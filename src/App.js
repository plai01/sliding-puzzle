import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {Grid} from './components/Grid';
import { CtrlPanel } from './components/CtrlPanel';

function App() {
  const[square, setSquare] = useState(Array(9).fill(null));
  const [history, setHistory] = useState([]);
  const cellCnt = 9;

  function handleReset() {
    initSquare(cellCnt, setSquare);
    setHistory([]);
    console.log("Reset");
  }

  function handleUndo() {
    if (history.length != 0) {
      let ixCurrent = getIxCurrentZero(square);
      let ixHistory = history[history.length - 1];

      //swap two position
      let newSquare = square.slice();
      let tmp = newSquare[ixCurrent];
      newSquare[ixCurrent] = newSquare[ixHistory];
      newSquare[ixHistory] = tmp;
      setSquare(newSquare);
      let newHistory = history.slice(0, history.length - 1);
      setHistory(newHistory);
    }
    console.log("Undo");
  }

  function getIxCurrentZero(square) {
    for(let i=0; i<square.length; i++) {
      if (square[i] == 0)
        return i;
    }
    return -1;
  }

  useEffect(() => {
    handleReset();
  }, [])

  const initSquare = (cnt, setSquare) => {
    let rtn = Array.from(Array(cnt).keys());
    for(let i=cnt - 1; i>0; i--) {
        let val = Math.random()*i;
        let item = rtn.splice(val, 1);
        item.map(v => {rtn.push(v)});
    }
    setSquare(rtn);
  }
  return (
    <div className="App">
      <header className="App-header">
        <CtrlPanel history={history} onResetClick={handleReset} onUndoClick={handleUndo}></CtrlPanel>
        <Grid history={history} setHistory={setHistory} square={square} setSquare={setSquare}></Grid>
      </header>
    </div>
  );
}

export default App;
