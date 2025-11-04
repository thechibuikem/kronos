import { useContext } from "react"
import { AppContext } from "@/Context/Context"
import { RxHamburgerMenu } from "react-icons/rx";

function Introtext() {

    // creating context branch
    const context = useContext(AppContext)
  // guard to check if context is okay
    if (!context) return "context cannot be used here"
  // destructuring what I need from context
  const {isNavOpen,setIsNavOpen}= context

  return (

    <section className="flex items  px-4 md:px-8 gap-x-4">
<button className="md:hidden cursor-pointer" onClick={()=>{setIsNavOpen(!isNavOpen)}} >

     <RxHamburgerMenu color="#fff" size="2rem" />
</button>

      {/* the text */}
      <div className="flex items-center justify-start gap-x-2">
      <h3 className="text-2xl text-[#ededed] uppercase font-bold">Kronos</h3>
      <img alt="" src="eyes.gif"  className="max-w-[2rem] "/>
      </div>
    </section>

    
  )
}

export default Introtext