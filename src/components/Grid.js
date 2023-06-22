import React, { useEffect, useState } from 'react';
import './Grid.css';
import ReactDOM from 'react-dom/client';
//import background from '/demo.jpg'

const loadImage = (setImgInfo, imgUrl) => {
    const img = new Image();
    img.src = imgUrl;

    img.onload = () => {
        setImgInfo({
            width: img.width,
            height: img.height
        })
        console.log("loaded");
    };

    img.onerror = (err) => {
        console.log(err);
    }
};

const initSquare = (cnt, setSquare) => {
    let rtn = Array.from(Array(cnt).keys());
    for(let i=cnt - 1; i>0; i--) {
        let val = Math.random()*i;
        let item = rtn.splice(val, 1);
        item.map(v => {rtn.push(v)});
    }
    setSquare(rtn);
}

const createGridCell = (imgUrl, cellSize, square, onClickEvent) => {
    let content = [];
    let divisor = Math.sqrt(square.length);

    for(let i = 0; i < square.length; i++) {
        let x = square[i] % divisor;
        let y = Math.floor(square[i] / divisor);
        let positionX = cellSize * x * -1;
        let positionY = cellSize * y * -1;
        content.push(<Cell style={{backgroundImage : `url(${imgUrl})`, backgroundSize: `${cellSize * divisor}px ${cellSize * divisor}px`, 
            backgroundPosition: `left ${positionX}px top ${positionY}px`}} 
            size={cellSize} value={square[i]} 
            onCellClick={() => onClickEvent(i)}></Cell>)       
    }
    return content;
}

function Cell({style, size, value, onCellClick}) {

    if (value == 0)
        style.backgroundImage = '';
    style.width = `${size}px`;
    style.height = `${size}px`

    return(
        <button style={style} className="grid-item" onClick={onCellClick}>
            {value}
        </button>
    )
}

function Grid() {

    const[imgInfo, setImgInfo] = useState({});
    const imgUrl = "/demo.jpg"
    const cellSize = 300;
    const cellCnt = 9;
    const[square, setSquare] = useState(Array(9).fill(null));

    useEffect(() => {
        loadImage(setImgInfo, imgUrl);
        initSquare(cellCnt, setSquare);
    }, [])

    function handleClick(ix) {
        const divisor = Math.sqrt(cellCnt);
        let oldY = Math.floor(ix / divisor);
        let oldX = ix % divisor
        let tmp = square.slice();
        let dx = [0,0,-1,1];
        let dy = [-1,1,0,0];

        let withChange = false;
        for(let t = 0; t < dx.length; t++) {
            if (oldY + dy[t] >= 0 && oldY + dy[t] < divisor &&
                oldX + dx[t] >= 0 && oldX + dx[t] < divisor) {
                let ixNew = (oldY + dy[t]) * divisor + (oldX + dx[t]);
                if(square[ixNew] == 0) {
                    let val = tmp[ix];
                    tmp[ix] = tmp[ixNew];
                    tmp[ixNew] = val;
                    withChange = true;
                    break;
                }
            }
        }
        if (withChange)
            setSquare(tmp);
        console.log(square);
    }

    return (
        <div className="grid-container">
            {createGridCell(imgUrl, cellSize, square, handleClick)}
        </div>
    );
};



export {Grid}


//import { useState } from 'react';
//
//function Square({ value, onSquareClick }) {
//  return (
//    <button className="square" onClick={onSquareClick}>
//      {value}
//    </button>
//  );
//}
//
//export default function Grid() {
//  const [squares, setSquares] = useState(Array(9).fill(null));
//
//  function handleClick(i) {
//    const nextSquares = squares.slice();
//    nextSquares[i] = 'X';
//    setSquares(nextSquares);
//  }
//
//  return (
//    <>
//      <div className="board-row">
//        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
//        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
//        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
//      </div>
//      <div className="board-row">
//        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
//        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
//        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
//      </div>
//      <div className="board-row">
//        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
//        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
//        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
//      </div>
//    </>
//  );
//}
//