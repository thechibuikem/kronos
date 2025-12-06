function AnalysisDisplayer() {
  // an array of analysis to be replaced by an Api response
const analysisContainer:string[] = [
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, expedita!",  
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, expedita!",  
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, expedita!",

]


  return (
    <figure className='transparent-cards h-full lg:w-[40%] p-8'>
        <ul className="md:p-8">
{/* mapping analysis into our analysus container */}
          {analysisContainer.map((analysis,index)=><li  
          key={index}
          className="mt-2">
          {analysis}
            </li>)}

        </ul>
    </figure>
  )
}

export default AnalysisDisplayer