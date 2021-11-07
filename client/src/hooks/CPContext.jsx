import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

export const server = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL + '/courseplanner',
    withCredentials: true
});



const CPContext = createContext();

export function CPProvider({ children }) {
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

// check if clashes is present already.
function ispresent(clashes, id1, id2) {
    for (let i = 0; i < clashes.length; i++) {
        if ((clashes[i][0] === id1 && clashes[i][1] === id2) || (clashes[i][0] === id2 && clashes[i][1] === id1)) {
            return true;
        }
    }
    return false;
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
    const [clashes, setClashes] = useState([])

    function getClashes() {
        let clashes_local = []
        for (let i = 0; i < 7; i++) {
            // get schedule for day = i
            let schedules_copy = schedules
            let daySchedule = schedules_copy.filter(schedule => schedule.rawDay === String(i));
            // Set clashes for day = i if there are any clashes with start time and end time
            for (let j = 0; j < daySchedule.length; j++) {
                const cls1 = daySchedule[j];
                for (let k = j; k < daySchedule.length; k++) {
                    const cls2 = daySchedule[k];
                    // if there is a start time inside a class.
                    if ((j !== k) && ((cls2.rawStart >= cls1.rawStart && cls2.rawStart < cls1.end) || (cls1.rawStart >= cls2.rawStart && cls1.rawStart < cls2.end))) {
                        // push to clashes if not already in clashes
                        if (!ispresent(clashes_local, cls1.rawId, cls2.rawId)) {
                            clashes_local.push([cls1.rawId, cls2.rawId]);
                        }
                    }
                }
            }
        }
        setClashes(clashes_local);
    }


    return { courses, setCourses, schedules, setSchedules, calendars, setCalendars, clashes, getClashes }
}



