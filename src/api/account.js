import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://testpostapi1.p.rapidapi.com/testBatmanApi/name/register"
})

const headers = {
    'accept': 'success',
    'content-type': 'application/x-www-form-urlencoded',
    'x-rapidapi-host': 'testpostapi1.p.rapidapi.com',
    'x-rapidapi-key': '28728db04dmsh34d3f140dd059fap1c388ejsn7288577afcf7'
}

export const AccountAPI = {
    signup: (details) => {
        return axiosInstance.request({
            method:"POST",
            data:details,
            headers: headers
        })
    }
}