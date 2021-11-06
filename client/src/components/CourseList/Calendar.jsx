import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';

// make page that has tui calendar in the left and a list of courses in the right
// when you click on a course, it should show course in calendar

var templates = {
    weekDayname: function(model) {
        return '<span class="fs-4">' + model.dayName + '</span>';
    }
  }

function Timetable(props) {
  const { courses } = props;
    return (
        <Calendar height="718px" taskView={false} scheduleView={['time']} template={templates} week={{hourStart:7, hourEnd:20}} />
    );
}

export default Timetable;