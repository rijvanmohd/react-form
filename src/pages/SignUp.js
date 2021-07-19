import React,{ useState, useEffect, useCallback, useRef } from "react";
import { debounce } from "lodash";
import { withSnackbar } from 'notistack';

import { SearchAPI } from "../api/search";
import { AccountAPI } from "../api/account"; 
import TagInputSelector from "../Components/TagInputSelector";

const SignUp = ({enqueueSnackbar}) => {
    const [searchText, setSearchText] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [data,setData] = useState([])
    const [selected,setSelected] = useState([])

    const ref = useRef()

    const handleClick = e => {
        if (ref.current.contains(e.target)) {
          // inside click
          console.log('clicked inside')
          return;
        }
        // outside click 
        console.log('clicked outside')
        setData([])
    };
    
    useEffect(()=>{
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    },[])

    // Search API 
    const updateQuery = () => {
        if(searchText){
            SearchAPI.getAll(searchText)
            .then((response)=>{
                console.log(response.data.data.results)
                setData(response.data.data.results)
            })
            .catch((err)=>{
                enqueueSnackbar("Some Error Occurred. Check Internet Connectivity",{variant:'error'})
            })
        }
    }

    const handleInterestChange = (event) => {
        setSearchText(event.target.value)
    }

    // Debouncing 
    const handler = useCallback(()=>debounce(updateQuery, 100), [searchText,updateQuery],);

    // To call the search API after search text updations
    useEffect(
        ()=>{
            handler()
            return handler.cancel
        },[searchText,handler])

    // Interest selection 
    const onTagSelection = (event) => {
        if(selected.length >= 3){
            setSearchText("")
            setData([])
            enqueueSnackbar('Max 3 can be selected',{variant:'warning'})
            return
        }
        if(selected.includes(event.target.dataset.tag)){
            enqueueSnackbar('Already Selected',{variant:'error'})
        }
        else{
            setSelected([...selected,event.target.dataset.tag])
        }
    }

    // Interest removal
    const onTagRemove = (tag,e) => {
        e.preventDefault()
        const newList = selected.filter((item) => item !== tag);
        setSelected(newList)
    }

    // Email validator function
    const validateEmail = (email) => {
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email.toLowerCase())) {
            return true
        } else {
            return false
        }
      };

    // Sign Up API call
    const SignUp = (details) => {
        AccountAPI.signup(details)
        .then((response)=>{
            if(response.status!==400){
                enqueueSnackbar("Signed Up Successfully",{variant:'success'})
            }
            else{
                enqueueSnackbar("Something went wrong",{variant:'error'})
            }
        })
        .catch((err)=>{
            enqueueSnackbar("Some Error Occurred. Check Internet Connectivity",{variant:'error'})
        })
    }

    // Sign up handle function
    const  handleSubmit = (event) => {
        event.preventDefault();
        const checkEmail = validateEmail(email)
        console.log(name)
        if(!name){
            enqueueSnackbar("Please Enter Name", { variant: "error" });
            return 
        }
        if(!email){
            enqueueSnackbar("Please Enter Email", { variant: "error" });
            return 
        }
        if(!checkEmail){
            enqueueSnackbar("Email Address is not valid", { variant: "error" });
            return 
        }
        if(selected.length === 0){
            enqueueSnackbar("Please select atleast one interest", { variant: "error" });
            return 
        }
        const details = {
            name,
            email,
            'intersets':selected
        }
        SignUp(details)
    }

    return(
        <>
            <main className="bg-light-blue-50">
                <div className="container mx-auto h-screen">
                    <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 sm:w-6/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                        
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-6">
                            <form ref={ref}>
                            <div className="relative w-full mb-3">
                                <label
                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-name"
                                >
                                Name
                                </label>
                                <input
                                type="text"
                                className="border-1 border-gray-300 px-3 py-3 placeholder-gray-400 semibold text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:ring-indigo-600 w-full"
                                placeholder="Name"
                                onChange={(e)=>{setName(e.target.value)}}
                                value={name}
                                style={{ transition: "all .15s ease" }}
                                />
                            </div>

                            <div className="relative w-full mb-3">
                                <label
                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                                >
                                Email
                                </label>
                                <input
                                type="email"
                                className="border-1 border-gray-300 px-3 py-3 placeholder-gray-400 semibold text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:ring-indigo-600 w-full"
                                placeholder="Email"
                                onChange={(e)=>{setEmail(e.target.value)}}
                                value={email}
                                style={{ transition: "all .15s ease" }}
                                />
                            </div>

                            <div className="relative w-full mb-3">
                                <TagInputSelector 
                                    onChange={handleInterestChange}
                                    onSelect={onTagSelection}
                                    onRemove={onTagRemove}
                                    label={"Interests"} 
                                    value={searchText}
                                    data={data}
                                    selected={selected}
                                />
                            </div>

                            <div className="text-center mt-6">
                                <button 
                                    className="rounded px-3 py-3 bg-indigo-500 hover:bg-indigo-600 text-white w-full focus:ring focus:border-indigo-800"
                                    onClick={handleSubmit}
                                    >
                                    Sign Up
                                </button> 
                            </div>
                            </form>
                        </div>
                        </div>
                        
                    </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default withSnackbar(SignUp);