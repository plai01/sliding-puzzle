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
        let imgPostX = cellSize * x * -1;
        let imgPostY = cellSize * y * -1;

        let cellX = i % divisor;
        let cellY = Math.floor(i / divisor);


        let cssOverlay = "grid-overlay";
        let ix0 = (cellY - 1) * divisor + cellX;
        if (cellY > 0 && ix0 >=0 && ix0 < square.length && square[ix0] == 0)
            cssOverlay += " up";
        ix0 = (cellY + 1) * divisor + cellX;
        if (ix0 >=0 && ix0 < square.length && square[ix0] == 0)
            cssOverlay += " down";
        ix0 = cellY * divisor + cellX - 1;
        if (cellX > 0 && ix0 >=0 && ix0 < square.length && square[ix0] == 0)
            cssOverlay += " left";
        ix0 = cellY * divisor + cellX + 1;
        if (cellX + 1 < divisor && ix0 >=0 && ix0 < square.length && square[ix0] == 0)
            cssOverlay += " right";
        console.log(cellX, cellY)
        console.log(cssOverlay);

        content.push(<Cell style={{backgroundImage : `url(${imgUrl})`, backgroundSize: `${cellSize * divisor}px ${cellSize * divisor}px`, 
            backgroundPosition: `left ${imgPostX}px top ${imgPostY}px`}} 
            size={cellSize} cssOverlay={cssOverlay} value={square[i]} 
            onCellClick={() => onClickEvent(i)}></Cell>)       
    }
    return content;
}

function Cell({style, cssOverlay, size, value, onCellClick}) {

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
            <div className={cssOverlay}></div>
        </button>
    )
}

function Grid({history, setHistory, square, setSquare}) {

    const[imgInfo, setImgInfo] = useState({});
    const imgUrl = "/demo.jpg"
    const divisor = Math.sqrt(square.length);
    const cellSize = 900 / divisor;
    const gridColumn = "auto ".repeat(divisor);

    useEffect(() => {
        loadImage(setImgInfo, imgUrl);
    }, [])

    function handleClick(ix) {
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
        <div className="grid-container" style={{gridTemplateColumns: `${gridColumn}`}}>
            {createGridCell(imgUrl, cellSize, square, handleClick)}
        </div>
    );
};



export {Grid}
