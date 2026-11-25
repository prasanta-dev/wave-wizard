import React, { useState } from 'react'
import Background2 from '../components/Background2'
import logo from '../assets/logo.png'

import { GiLightBulb } from 'react-icons/gi'
import { FaTv, FaMusic, FaFan } from 'react-icons/fa'

import ToggleBtn from '../components/ToggleBtn'
import { Link } from 'react-router-dom'

function ControlPage() {
    const [lightOn, setLightOn] = useState(false)
    const [fanOn, setFanOn] = useState(false)
    const [tvOn, setTvOn] = useState(false)
    const [musicOn, setMusicOn] = useState(false)
    // const [loadingDevices, setLoadingDevices] = useState({});

   
const toggleWork = async (device) => {
    const deviceConfig = {
        yellow: {
            state: lightOn,
            setState: setLightOn,
            onUrl: "http://192.168.4.1/relayon1",
            offUrl: "http://192.168.4.1/relayoff1",
        },
        cyan: {
            state: fanOn,
            setState: setFanOn,
            onUrl: "http://192.168.4.1/relayon2",
            offUrl: "http://192.168.4.1/relayoff2",
        },
        violet: {
            state: tvOn,
            setState: setTvOn,
            onUrl: "http://192.168.4.1/relayon3",
            offUrl: "http://192.168.4.1/relayoff3",
        },
        pink: {
            state: musicOn,
            setState: setMusicOn,
            onUrl: "http://192.168.4.1/relayon4",
            offUrl: "http://192.168.4.1/relayoff4",
        },
    };

    const selected = deviceConfig[device];
    if (!selected) return;

    const nextState = !selected.state;
    const url = nextState ? selected.onUrl : selected.offUrl;

    // Update UI immediately
    selected.setState(nextState);

    try {
        const response = await fetch(url, {
            method: "GET",
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        console.log(`${device} is now ${nextState ? "ON" : "OFF"}`);

    } catch (error) {
        console.error("Device request failed:", error);

        // Restore previous UI state if request fails
        selected.setState(!nextState);
    }
};


    const devices = [
        {
            name: 'Living Room Light',
            subtitle: 'Ambient lighting',
            icon: <GiLightBulb />,
            on: lightOn,
            toggle: () => toggleWork('yellow'),
            color: 'yellow',
        },
        {
            name: 'Ceiling Fan',
            subtitle: 'Air circulation',
            icon: <FaFan />,
            on: fanOn,
            toggle: () => toggleWork('cyan'),
            color: 'cyan',
        },
        {
            name: 'Smart Television',
            subtitle: 'Entertainment',
            icon: <FaTv />,
            on: tvOn,
            toggle: () => toggleWork('violet'),
            color: 'violet',
        },
        {
            name: 'Smart Speaker',
            subtitle: 'Audio system',
            icon: <FaMusic />,
            on: musicOn,
            toggle: () => toggleWork('pink'),
            color: 'pink',
        },
    ];


    const activeDevices = devices.filter(device => device.on).length

    const styles = {
        yellow: {
            icon: 'bg-amber-400/10 text-amber-300',
            glow: 'bg-amber-300',
        },
        cyan: {
            icon: 'bg-cyan-400/10 text-cyan-300',
            glow: 'bg-cyan-300',
        },
        violet: {
            icon: 'bg-violet-400/10 text-violet-300',
            glow: 'bg-violet-300',
        },
        pink: {
            icon: 'bg-pink-400/10 text-pink-300',
            glow: 'bg-pink-300',
        },
    }

    return (
        <div className="relative overflow-y-scroll lg:h-screen lg:overflow-hidden text-white">
            <Background2 />

            <main className="relative z-10 mx-auto w-full h-full max-w-360 px-4 py-5 sm:px-6 sm:py-8 lg:px-10">

                {/* HEADER */}
                <header className="flex flex-wrap items-center justify-between gap-4 mb-7 sm:mb-10">

                    <div className="flex items-center gap-3">
                        <Link to={'/'}>
                            <img
                                src={logo}
                                alt="Smart Home"
                                className="w-32 sm:w-44 object-contain"
                            />
                        </Link>

                        <div className="hidden sm:block h-8 w-px bg-white/15" />

                        <div className="hidden sm:block">
                            <p className="text-sm font-medium">
                                Home Automation
                            </p>
                            <p className="text-xs text-white/40">
                                Control your environment
                            </p>
                        </div>
                    </div>


                </header>

                {/* RESPONSIVE LAYOUT */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-7">

                    {/* DEVICE PANEL */}
                    <section className="min-w-0">

                        <div className="flex items-center justify-between mb-4">

                            <div className='flex gap-3'>
                                <h2 className="text-lg font-semibold">
                                    Devices
                                </h2>

                                <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 sm:px-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                                    </span>

                                    <span className="text-xs sm:text-sm text-emerald-300">
                                        System Online
                                    </span>
                                </div>
                            </div>

                            <span className="text-xs text-white/40">
                                {activeDevices} of 4 active
                            </span>
                        </div>

                        {/* Device Cards */}
                        <div className="grid grid-cols-2 gap-3 xl:grid-cols-2 xl:gap-3">

                            {devices.map((device) => (
                                <div
                                    key={device.name}
                                    className={`
                                        min-w-0 rounded-2xl border
                                        p-3 sm:p-4
                                        transition-all duration-300
                                        ${device.on
                                            ? 'border-white/15 bg-white/9 shadow-lg shadow-black/5'
                                            : 'border-white/[0.07] bg-slate-950/20'
                                        }
                                    `}
                                >

                                    <div className="flex items-center justify-between gap-2">

                                        {/* Icon */}
                                        <div
                                            className={`
                                                flex h-10 w-10 sm:h-12 sm:w-12
                                                shrink-0 items-center justify-center
                                                rounded-xl text-xl sm:text-2xl
                                                ${styles[device.color].icon}
                                            `}
                                        >
                                            {device.icon}
                                        </div>

                                        {/* Status */}
                                        <span
                                            className={`
                                                rounded-full px-2 py-1
                                                text-[10px] sm:text-xs
                                                font-medium
                                                ${device.on
                                                    ? 'bg-emerald-400/10 text-emerald-300'
                                                    : 'bg-white/5 text-white/35'
                                                }
                                            `}
                                        >
                                            {device.on ? 'ON' : 'OFF'}
                                        </span>

                                    </div>

                                    <div className="mt-3 min-w-0">
                                        <h3 className="text-xs sm:text-sm font-medium truncate">
                                            {device.name}
                                        </h3>

                                        <p className="text-[10px] sm:text-xs text-white/40 mt-1 truncate">
                                            {device.subtitle}
                                        </p>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between gap-2">

                                        <span className={`text-xs ${device.on
                                            ? 'text-emerald-300'
                                            : 'text-white/30'
                                            }`}>
                                            {device.on ? 'Running' : 'Standby'}
                                        </span>

                                        <ToggleBtn
                                            isOn={device.on}
                                            onToggle={device.toggle}
                                        />
                                    </div>

                                </div>
                            ))}

                        </div>

                    </section>

                    {/* HOME PREVIEW */}
                    <section className="min-w-0">

                        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">

                            <div>
                                <h2 className="text-lg font-semibold">
                                    Home Preview
                                </h2>

                                <p className="text-xs text-white/40 mt-1">
                                    Interactive room simulation
                                </p>
                            </div>

                            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                                <span className="text-xs text-white/50">
                                    Room status
                                </span>

                                <span className={`h-2 w-2 rounded-full ${activeDevices
                                    ? 'bg-emerald-400'
                                    : 'bg-white/30'
                                    }`} />
                            </div>

                        </div>

                        {/* Room */}
                        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#111827]">

                            <svg
                                viewBox="0 0 800 480"
                                className="block w-full h-auto"
                                xmlns="http://www.w3.org/2000/svg"
                            >

                                <defs>

                                    <linearGradient id="roomWall" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#253449" />
                                        <stop offset="100%" stopColor="#172334" />
                                    </linearGradient>

                                    <linearGradient id="roomFloor" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#344155" />
                                        <stop offset="100%" stopColor="#1a2432" />
                                    </linearGradient>

                                    <linearGradient id="sofaColor" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#65758b" />
                                        <stop offset="100%" stopColor="#3a4a60" />
                                    </linearGradient>

                                    <radialGradient id="lightGlow">
                                        <stop offset="0%" stopColor="#fde68a" stopOpacity="0.45" />
                                        <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.15" />
                                        <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                                    </radialGradient>

                                    <filter id="blurGlow">
                                        <feGaussianBlur stdDeviation="25" />
                                    </filter>

                                </defs>

                                {/* Wall */}
                                <rect width="800" height="380" fill="url(#roomWall)" />

                                {/* Light glow */}
                                <ellipse
                                    cx="400"
                                    cy="140"
                                    rx="340"
                                    ry="280"
                                    fill="url(#lightGlow)"
                                    opacity={lightOn ? 1 : 0}
                                    className="transition-opacity duration-700"
                                />

                                {/* Window */}
                                <rect
                                    x="55"
                                    y="60"
                                    width="165"
                                    height="155"
                                    rx="8"
                                    fill="#111d2d"
                                    stroke="#64748b"
                                    strokeWidth="7"
                                />

                                <rect
                                    x="65"
                                    y="70"
                                    width="145"
                                    height="135"
                                    rx="3"
                                    fill={lightOn ? '#64748b' : '#263f5b'}
                                />

                                <rect
                                    x="135"
                                    y="70"
                                    width="5"
                                    height="135"
                                    fill="#94a3b8"
                                    opacity="0.6"
                                />

                                <rect
                                    x="65"
                                    y="135"
                                    width="145"
                                    height="5"
                                    fill="#94a3b8"
                                    opacity="0.6"
                                />

                                {/* Window light */}
                                <circle
                                    cx="105"
                                    cy="105"
                                    r="28"
                                    fill="#93c5fd"
                                    opacity="0.3"
                                />

                                {/* Curtains */}
                                <path
                                    d="M48 50 Q70 70 85 60 L85 220 Q65 230 48 210 Z"
                                    fill="#52637a"
                                    opacity="0.8"
                                />

                                <path
                                    d="M225 50 Q205 70 190 60 L190 220 Q210 230 225 210 Z"
                                    fill="#52637a"
                                    opacity="0.8"
                                />

                                {/* Ceiling light */}
                                <line
                                    x1="400"
                                    y1="0"
                                    x2="400"
                                    y2="45"
                                    stroke="#94a3b8"
                                    strokeWidth="3"
                                />

                                <ellipse
                                    cx="400"
                                    cy="55"
                                    rx="36"
                                    ry="10"
                                    fill={lightOn ? '#fde68a' : '#475569'}
                                    className="transition-colors duration-500"
                                />

                                <ellipse
                                    cx="400"
                                    cy="55"
                                    rx="50"
                                    ry="20"
                                    fill="#facc15"
                                    opacity={lightOn ? 0.25 : 0}
                                />

                                {/* Fan */}
                                <g transform="translate(610 110)">
                                    <line
                                        x1="0"
                                        y1="-80"
                                        x2="0"
                                        y2="-15"
                                        stroke="#94a3b8"
                                        strokeWidth="5"
                                    />

                                    <g className={fanOn ? 'animate-spin' : ''}>
                                        <ellipse
                                            cx="0"
                                            cy="-35"
                                            rx="13"
                                            ry="42"
                                            fill="#91a0b4"
                                            transform="rotate(0)"
                                        />

                                        <ellipse
                                            cx="0"
                                            cy="-35"
                                            rx="13"
                                            ry="42"
                                            fill="#91a0b4"
                                            transform="rotate(120)"
                                        />

                                        <ellipse
                                            cx="0"
                                            cy="-35"
                                            rx="13"
                                            ry="42"
                                            fill="#91a0b4"
                                            transform="rotate(240)"
                                        />

                                        <circle
                                            cx="0"
                                            cy="0"
                                            r="16"
                                            // fill="#d1d5db"
                                            fill="#B1C7DE"
                                        />
                                    </g>
                                </g>

                                {/* TV Unit */}
                                <rect
                                    x="290"
                                    y="155"
                                    width="220"
                                    height="135"
                                    rx="12"
                                    fill="#101827"
                                    stroke="#475569"
                                    strokeWidth="5"
                                />

                                {/* TV Screen */}
                                <rect
                                    x="302"
                                    y="167"
                                    width="196"
                                    height="108"
                                    rx="5"
                                    fill={tvOn ? '#3730a3' : '#080d16'}
                                    className="transition-colors duration-500"
                                />

                                {tvOn && (
                                    <>
                                        <rect
                                            x="302"
                                            y="167"
                                            width="196"
                                            height="108"
                                            rx="5"
                                            fill="#8b5cf6"
                                            opacity="0.3"
                                        />

                                        <circle
                                            cx="400"
                                            cy="220"
                                            r="35"
                                            fill="#a78bfa"
                                            opacity="0.5"
                                        />

                                        <path
                                            d="M380 205 L425 220 L380 235 Z"
                                            fill="white"
                                        />

                                        <text
                                            x="400"
                                            y="255"
                                            textAnchor="middle"
                                            fontSize="10"
                                            fill="white"
                                        >
                                            SMART TV
                                        </text>
                                    </>
                                )}

                                {/* TV Stand */}
                                <rect
                                    x="320"
                                    y="290"
                                    width="160"
                                    height="35"
                                    rx="6"
                                    fill="#39485d"
                                />

                                <rect
                                    x="335"
                                    y="325"
                                    width="12"
                                    height="35"
                                    fill="#263449"
                                />

                                <rect
                                    x="453"
                                    y="325"
                                    width="12"
                                    height="35"
                                    fill="#263449"
                                />

                                {/* Speaker */}
                                <g transform="translate(550 290)">
                                    <rect
                                        width="55"
                                        height="90"
                                        rx="9"
                                        fill={musicOn ? '#831843' : '#263449'}
                                        stroke="#64748b"
                                        strokeWidth="2"
                                    />

                                    <circle
                                        cx="27"
                                        cy="28"
                                        r="14"
                                        fill={musicOn ? '#f9a8d4' : '#475569'}
                                    />

                                    <circle
                                        cx="27"
                                        cy="28"
                                        r="6"
                                        fill="#1e293b"
                                    />

                                    <circle
                                        cx="27"
                                        cy="62"
                                        r="9"
                                        fill={musicOn ? '#f472b6' : '#475569'}
                                    />

                                    {musicOn && (
                                        <g
                                            fill="none"
                                            stroke="#f9a8d4"
                                            strokeWidth="2.8"
                                            strokeLinecap="round"
                                        >
                                            {/* Left inner wave */}
                                            <path d="M -5 36 Q -17 45 -5 54">
                                                <animate
                                                    attributeName="opacity"
                                                    values="0.3;1;0.3"
                                                    dur="1s"
                                                    repeatCount="indefinite"
                                                />
                                            </path>

                                            {/* Left outer wave */}
                                            <path d="M -13 25 Q -32 45 -13 65">
                                                <animate
                                                    attributeName="opacity"
                                                    values="0;0.8;0"
                                                    dur="1.4s"
                                                    repeatCount="indefinite"
                                                />
                                            </path>

                                            {/* Right inner wave */}
                                            <path d="M 60 36 Q 72 45 60 54">
                                                <animate
                                                    attributeName="opacity"
                                                    values="0.3;1;0.3"
                                                    dur="1s"
                                                    repeatCount="indefinite"
                                                />
                                            </path>

                                            {/* Right outer wave */}
                                            <path d="M 68 25 Q 87 45 68 65">
                                                <animate
                                                    attributeName="opacity"
                                                    values="0;0.8;0"
                                                    dur="1.4s"
                                                    repeatCount="indefinite"
                                                />
                                            </path>
                                        </g>
                                    )}
                                </g>

                                {/* Sofa */}
                                <rect
                                    x="50"
                                    y="295"
                                    width="340"
                                    height="95"
                                    rx="18"
                                    fill="url(#sofaColor)"
                                    stroke="#94a3b8"
                                    strokeWidth="2"
                                />

                                <rect
                                    x="70"
                                    y="265"
                                    width="310"
                                    height="70"
                                    rx="20"
                                    fill="#718198"
                                />

                                <rect
                                    x="70"
                                    y="270"
                                    width="95"
                                    height="62"
                                    rx="15"
                                    fill="#8593a8"
                                />

                                <rect
                                    x="176"
                                    y="270"
                                    width="95"
                                    height="62"
                                    rx="15"
                                    fill="#8593a8"
                                />

                                <rect
                                    x="280"
                                    y="270"
                                    width="95"
                                    height="62"
                                    rx="15"
                                    fill="#8593a8"
                                />

                                {/* Sofa arms */}
                                <rect
                                    x="43"
                                    y="285"
                                    width="35"
                                    height="105"
                                    rx="15"
                                    fill="#52637a"
                                />

                                <rect
                                    x="370"
                                    y="285"
                                    width="35"
                                    height="105"
                                    rx="15"
                                    fill="#52637a"
                                />

                                {/* Floor */}
                                <rect
                                    x="0"
                                    y="380"
                                    width="800"
                                    height="100"
                                    fill="url(#roomFloor)"
                                />

                                <path
                                    d="M0 400 H800 M0 440 H800"
                                    stroke="#94a3b8"
                                    opacity="0.08"
                                />

                                {/* Rug */}
                                <ellipse
                                    cx="390"
                                    cy="430"
                                    rx="220"
                                    ry="35"
                                    fill="#64748b"
                                    opacity="0.25"
                                />

                                {/* Floor lamp */}
                                <g transform="translate(700 280)">
                                    <line
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="100"
                                        stroke="#94a3b8"
                                        strokeWidth="5"
                                    />

                                    <path
                                        d="M-30 -20 L30 -20 L20 0 L-20 0 Z"
                                        fill={lightOn ? '#fde68a' : '#64748b'}
                                    />

                                    <circle
                                        cx="0"
                                        cy="-10"
                                        r="35"
                                        fill="#facc15"
                                        opacity={lightOn ? 0.2 : 0}
                                    />

                                    <ellipse
                                        cx="0"
                                        cy="102"
                                        rx="20"
                                        ry="5"
                                        fill="#475569"
                                    />
                                </g>

                                {/* Ambient overlay */}
                                <rect
                                    width="800"
                                    height="480"
                                    fill="#020617"
                                    opacity={lightOn ? 0.02 : 0.25}
                                    className="transition-opacity duration-700"
                                />

                            </svg>

                            {/* Scene Status Overlay */}
                            <div className="absolute left-3 sm:left-2 sm:bottom-2 bottom-3 rounded-xl border border-white/10 bg-black/30 backdrop-blur-md px-3 py-2">
                                <p className="text-[10px] sm:text-xs text-white/50">
                                    LIVE SIMULATION
                                </p>

                                <p className="text-[10px] sm:text-sm font-medium mt-1">
                                    {activeDevices === 0
                                        ? 'Room in standby'
                                        : `${activeDevices} devices active`}
                                </p>
                            </div>

                        </div>

                        {/* Scene Legend */}
                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">

                            {devices.map(device => (
                                <div
                                    key={device.name}
                                    className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/3 px-3 py-2.5"
                                >
                                    <span className={`h-2 w-2 shrink-0 rounded-full ${device.on
                                        ? 'bg-emerald-400'
                                        : 'bg-slate-500'
                                        }`} />

                                    <span className="text-[10px] sm:text-xs text-white/60 truncate">
                                        {device.name}
                                    </span>
                                </div>
                            ))}

                        </div>

                    </section>

                </div>

                {/* FOOTER */}
                <footer className="mt-8 border-t border-white/5 pt-4 flex flex-wrap items-center justify-between gap-3">

                </footer>

            </main>
        </div>
    )
}

export default ControlPage