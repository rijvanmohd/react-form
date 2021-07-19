import React from "react";
import InputTag from "./InputTag";

/*
Tag Input Selector Component which can be used anywhere 

*/
const TagInputSelector = ({label,data,selected,value,onChange,onSelect,onRemove}) => {
    return(
        <>
            <label
                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                htmlFor={`grid-${label.toLowerCase()}`}
            >
                {label}
            </label>
            <input
                type="text"
                className="border-1 border-gray-300 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:ring-indigo-600 w-full"
                placeholder="Type your interest"
                onChange={onChange}
                value={value}
                style={{ transition: "all .15s ease" }}
            />
            {
                selected && selected.length > 0 && 
                <div className="w-full py-2">
                    <div className='relative flex w-full space-x-2 rounded border-0'>
                        {
                            selected.map(tag=>(
                                <InputTag key={tag} value={tag} tag={tag} onRemove={onRemove} />
                            ))
                        }
                       
                    </div>
                </div>
            }
            {
                data && data.length > 0 &&
                <div className='w-full py-2'>
                    <div className="absolute flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-300 border-0">
                        { data.map(tag=>(
                            <div 
                                key={tag}
                                data-tag={tag}
                                onClick={onSelect}
                                style={{ transition: "all .15s ease" }}
                                className='px-2 py-2 hover:bg-gray-500 hover:text-white'>
                                {tag}
                            </div>
                        ))}
                    </div>

                </div>
            }
        </>
    )
}

export default TagInputSelector;