import React from "react";

const NotFoundPopup =({onclose}) => { //pasa como prop, cierra el popup
    return(
        <div className="popup">
            <div className="popup-content">
                <p>pokemon not found!</p>
                <button onClick={onclose}></button>
            </div>
        </div>
    );
};

export default NotFoundPopup;