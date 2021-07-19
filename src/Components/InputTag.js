/*
Tag Pill Component 
*/
const InputTag = ({tag,onRemove}) => {
    const handleRemove = (e) => {
        e.preventDefault()
        onRemove(tag,e)
    }
    return(
        <div className="flex px-3 py-1 justify-between bg-indigo-500 rounded-lg text-white shadow-lg">
            <div className="text-semibold ">
                {tag}
            </div>
            <button className="text-gray-700 hover:text-gray-400 ml-5" onClick={handleRemove}>
                <span className="sr-only">Close</span>
                <svg className="w-4 h-4 flex-shrink-0 fill-current" viewBox="0 0 16 16">
                <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
                </svg>
            </button>
        </div>
    )
}

export default InputTag;