import { assets } from "../assets/assets"

const Header = () => {
  return (
    <div className="mx-8 sm:mx-14 xl:mx-24 pt-5 pb-1 mt-[6rem]  relative">
        <div className="text-center mt-10 mb-1">
          <div className="inline-flex items-cetner justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary ">
             <p>New: AI Feature integrated</p>
             <img src={assets.star_icon} alt="*" className="w-2.5" />
          </div>

          <h1 className="text-3xl sm:text-6xl font-bold sm:leading-16 text-gray-700" ><span className="text-primary">Blog</span> your passion.<br/><span className="text-primary"> Bloom </span> your presence.</h1>
          <p className="my-6 sm:my-9 w-[60%] m-auto max-sm:text-xs text-gray-600">BlogBloom is your space to share ideas, grow your voice, and connect with a community of passionate storytellers. From thoughtful articles to impactful insights, this is where your words take root and thrive.</p>
          
          <form className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden">
            <input type="text" placeholder="Search for blogs" required  className="w-full pl-4 outline-none"/>
            <button type="submit" className="bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer">Search</button>
          </form>

        </div>
        <img src={assets.gradientBackground} alt="Background" className="absolute -top-50 -z-1 opacity-50 h-screen"/>
        
    </div>
  )
}

export default Header