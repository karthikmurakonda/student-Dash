import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';

// make page that has tui calendar in the left and a list of courses in the right
// when you click on a course, it should show course in calendar

function Timetable(props) {
  const { courses } = props;
    return (
      <div>
        <Calendar/>
      </div>
    );
}

export default Timetable;