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
    const today = new Date();
    const getDate = (type, start, value, operator) => {
        start = new Date(start);
        type = type.charAt(0).toUpperCase() + type.slice(1);
    
        if (operator === '+') {
          start[`set${type}`](start[`get${type}`]() + value);
        } else {
          start[`set${type}`](start[`get${type}`]() - value);
        }
    
        return start;
      };

    const [courses, setCourses] = useState()
    const [schedules, setSchedules] = useState([
        {
          id: '1',
          calendarId: '0',
          title: 'TOAST UI Calendar Study',
          category: 'time',
          dueDateClass: '',
          start: today.toISOString(),
          end: getDate('hours', today, 3, '+').toISOString()
        },
        {
          id: '2',
          calendarId: '0',
          title: 'Practice',
          category: 'milestone',
          dueDateClass: '',
          start: getDate('date', today, 1, '+').toISOString(),
          end: getDate('date', today, 1, '+').toISOString(),
          isReadOnly: true
        },
        {
          id: '3',
          calendarId: '0',
          title: 'FE Workshop',
          category: 'allday',
          dueDateClass: '',
          start: getDate('date', today, 2, '-').toISOString(),
          end: getDate('date', today, 1, '-').toISOString(),
          isReadOnly: true
        },
        {
          id: '4',
          calendarId: '0',
          title: 'Report',
          category: 'time',
          dueDateClass: '',
          start: today.toISOString(),
          end: getDate('hours', today, 1, '+').toISOString()
        }
      ])
    const [calendars, setCalendars] = useState([
        {
          id: '0',
          name: 'Private',
          bgColor: '#9e5fff',
          borderColor: '#9e5fff'
        },
        {
          id: '1',
          name: 'Company',
          bgColor: '#00a9ff',
          borderColor: '#00a9ff'
        }
      ])

    return { courses, setCourses, schedules, setSchedules, calendars, setCalendars }
}



