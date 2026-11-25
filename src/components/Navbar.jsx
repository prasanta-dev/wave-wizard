import logo from '../assets/logo.png'
function Navbar() {
  return (
    <div>
      <img
        src={logo}
        alt="Smart Home"
        className="w-32 sm:w-44 object-contain sm:mb-20 my-5"
      />
    </div>
  )
}

export default Navbar