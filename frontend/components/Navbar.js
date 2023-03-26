import Image from "next/image"
import Logo from "../assets/logo.png"

function Navbar() {
  return (
    <div className=" grid grid-cols-3 items-center h-16 border-b-2 border-b-gray-400 ">
    <Image className="m-2 cursor-pointer" src={Logo} alt="" height={50} width={50}/>
    <h1 className="text-2xl text-center font-bold"> Messaging App</h1>
    </div>
  )
}

export default Navbar