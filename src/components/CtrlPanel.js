import React, { useEffect, useState } from 'react';
import './CtrlPanel.css';
import ReactDOM from 'react-dom/client';


function CtrlPanel({history, onResetClick, onUndoClick}) {
    return (
        <>
            <button onClick={onResetClick}>Reset</button>
            <button onClick={onUndoClick}>Undo</button>
            <div>Step Count: {history.length}</div>
        </>
    )
}

export {CtrlPanel}