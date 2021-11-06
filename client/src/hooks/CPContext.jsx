import { createContext, useContext, useState } from 'react'
import axios from 'axios'

export const server = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL+'/courseplanner',
	withCredentials: true
});

const CPContext = createContext();

export function CPProvider({children}) {
	const CP = useProvideCP();

	return (
		<CPContext.Provider value={CP}>
			{children}
		</CPContext.Provider>
	)
}

export function useCP() {
	return useContext(CPContext)
}

function useProvideCP() {
    // const [courseList, setCourseList] = useState([]);
    // const [error, setError] = useState(null);
    // const [isLoading, setIsLoading] = useState(false);

    // const loadCourseList = async () => {
    //     setIsLoading(true);
    //     try {
    //         const response = await server.get('/');
    //         setCourseList(response.data);
    //     } catch (error) {
    //         setError(error.message);
    //     }
    //     setIsLoading(false);
    // };

    const [courses, setCourses] = useState()
    const [schedules, setSchedules] = useState([])
    const [calendars, setCalendars] = useState([])

    return { courses, setCourses, schedules, setSchedules, calendars, setCalendars }
}



