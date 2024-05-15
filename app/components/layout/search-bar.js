

const SearchBar = () => {
  return (
   
    <div className="flex p-6 text-white text-center  ">
     
       <form className="flex item bg-center w-full gap-2 font-light text-gray-900">
            <input placeholder="Search product" className="w-full  px-5 py-2 text-white text-base bg-transparent  outline-none border border-gray-300 border-solid" />
            <button className="px-5 py-2 whitespace-nowrap bg-white border border-gray-300 border-solid">
                  Search
            </button>
       </form>
   </div>
    
  )
}

export default SearchBar
