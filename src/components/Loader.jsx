import React from 'react'
import loading from "../assets/wizard09.gif";

function Loader() {
    return (
        <div className="fixed inset-0 opacity-90 z-50 bg-black w-screen h-screen">
            <img className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src={loading} alt="" />
        </div>
    )
}

export default Loader