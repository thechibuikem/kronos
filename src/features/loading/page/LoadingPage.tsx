import { Loader } from "@/features/loading/components/preloader"

function LoadingPage() {
  return (
    <section className="w-screen h-screen bg-[#f7f7f7] flex justify-center items-center">
        <Loader size={96}/>
    </section>
  )
}

export default LoadingPage