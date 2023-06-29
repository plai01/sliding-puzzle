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

    let css = "grid-item";
    if (value != 0)
        css += " grid-item-available";

    return(
        <button style={style} className={css} onClick={onCellClick}>
            {value}
        </button>
    )
}

function Grid({history, setHistory, square, setSquare, cellCnt}) {

    const[imgInfo, setImgInfo] = useState({});
    const imgUrl = "/demo.jpg"
    const cellSize = 300;

    useEffect(() => {
        loadImage(setImgInfo, imgUrl);
    }, [])

    function handleClick(ix) {
        const divisor = Math.sqrt(cellCnt);
        let oldY = Math.floor(ix / divisor);
        let oldX = ix % divisor
        let tmp = square.slice();
        let tmpHistory = history.slice();
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

                    //set history
                    tmpHistory.push(ixNew);
                    break;
                }
            }
        }
        if (withChange) {
            setSquare(tmp);
            setHistory(tmpHistory);
        }
    }

    return (
        <div className="grid-container">
            {createGridCell(imgUrl, cellSize, square, handleClick)}
        </div>
    );
};



export {Grid}
