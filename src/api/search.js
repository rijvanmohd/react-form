import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://webit-keyword-search.p.rapidapi.com/autosuggest"
})

const headers = {
    'x-rapidapi-host': 'webit-keyword-search.p.rapidapi.com',
    'x-rapidapi-key': '28728db04dmsh34d3f140dd059fap1c388ejsn7288577afcf7'
}

export const SearchAPI = {
    getAll: (query,language="en") => {
        return axiosInstance.request({
            method:"GET",
            url:`?q=${query}&language=${language}`,
            headers: headers
        })
    }
}