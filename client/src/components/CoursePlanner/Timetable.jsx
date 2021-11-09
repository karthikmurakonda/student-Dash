import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import { useRef, useEffect } from 'react';
import { useCP } from '../../hooks/CPContext';

// make page that has tui calendar in the left and a list of courses in the right
// when you click on a course, it should show course in calendar

var templates = {
		weekDayname: function(model) {
				return '<span class="fs-4">' + model.dayName + '</span>';
		}
	}

function Timetable(props) {
	const calendar = useRef()
	const CP = useCP()
	

	// Move to next week on each render of calendar
	useEffect(() => {
		const calInstance = calendar.current.getInstance()
		calInstance.next()
	}, [])

	// function next() {
	// 	const calInstance = calendar.current.getInstance()
	// 	calInstance.next()
	// }
	// function back() {
	// 	const calInstance = calendar.current.getInstance()
	// 	calInstance.prev()
	// }

	return (
		< >
		{/* <Button onClick={()=>{back()}}>back</Button>
		<Button onClick={()=>{next()}}>next</Button> */}
		<Calendar ref={calendar} schedules={CP.schedules} calendars={CP.calendar} height="718px" taskView={false} isReadOnly={true} scheduleView={['time']} template={templates} week={{hourStart:7, hourEnd:20}} />
		</>
	);
}

export default Timetable;