import React from 'react'

function ToggleBtn({ isOn, onToggle }) {
    return (
        <button
            onClick={onToggle}
            className={`
                relative sm:w-16 sm:h-8 w-10 h-5 rounded-full
                transition-all duration-300 ease-in-out
                active:scale-90 cursor-pointer
                ${isOn
                    ? `bg-green-400 adow-[0_0_15px_rgba(16,185,129,0.6)]`
                    : 'bg-gray-600'
                }
            `}
        >
            <span
                className={`
                    absolute top-1 left-1
                    sm:w-6 sm:h-6 w-3 h-3 rounded-full bg-white shadow-md
                    transition-transform duration-300 ease-in-out
                    ${isOn ? 'sm:translate-x-8 translate-x-5 ' : 'translate-x-0'}
                `}
            />
        </button>
    )
}

export default ToggleBtn