import React, { useEffect, useState } from 'react';
import './CtrlPanel.css';
import ReactDOM from 'react-dom/client';

function ShowData(isComplete, history) {
    if (isComplete) {
        return  <div style={{ padding: "5px", width: "250px", float: "left" }}>Complete</div>
    }
    else {
        return  <div style={{ padding: "5px", width: "250px", float: "left" }}>Step Count: {history.length}</div>
    }
}

function CtrlPanel({history, onResetClick, onUndoClick, isComplete}) {
    return (
        <div style={{ display: "table" }}>
            <button onClick={onResetClick} style={{ padding: "5px", width: "200px", height: "50px", float: "left" }}>Reset</button>
            <button onClick={onUndoClick}  style={{ padding: "5px", width: "200px", height: "50px", float: "right" }} disabled={isComplete}>Undo</button>
            {ShowData(isComplete, history)}
        </div>
    )
}

export {CtrlPanel}