import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const server = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL+'/courseplanner',
	withCredentials: true
});

function useCourseList() {
    const [courseList, setCourseList] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const loadCourseList = async () => {
        setIsLoading(true);
        try {
            const response = await server.get('/courses');
            setCourseList(response.data);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    };

    return { courseList, loadCourseList, error, isLoading };
}

