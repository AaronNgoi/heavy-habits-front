import calculateCompletedDates from '../helpers/calculateCompletedDates';
import calculateConsistency from '../helpers/calculateConsistency';
import calculateStreak from '../helpers/calculateStreak';
import CircleDateDisplay from '../utils/circleDateDisplay';
import {getHabitDisplayData} from '../helpers/getHabitDisplayData';

import {format, isFirstDayOfMonth, subWeeks, startOfWeek } from 'date-fns';
import { Tooltip } from 'react-tooltip'



const ExpandedHabitInfo = ({ habit }) => {
    const startDate = subWeeks(startOfWeek(new Date(), { weekStartsOn: 1 }), 12);
    const habitDisplayData = getHabitDisplayData(habit, startDate);

    const renderWeeks = (habitDisplayData) => {
        const weeks = [];
        let week = [];

        // add day labels to first column
        weeks.push(
            <div key="day-labels" className="week-column flex flex-col ">
                <div className="week-label flex justify-center items-center  text-10">
                    <span className="inline-flex justify-center items-center w-13 h-13">M</span>
                </div>
                <div className="week-label flex justify-center items-center  text-10">
                    <span className="inline-flex justify-center items-center w-13 h-13">&nbsp;</span>
                </div>
                <div className="week-label flex justify-center items-center  text-10">
                    <span className="inline-flex justify-center items-center w-13 h-13">W</span>
                </div>
                <div className="week-label flex justify-center items-center  text-10">
                    <span className="inline-flex justify-center items-center w-13 h-13">&nbsp;</span>
                </div>
                <div className="week-label flex justify-center items-center  text-10">
                    <span className="inline-flex justify-center items-center w-13 h-13">F</span>
                </div>
                <div className="week-label flex justify-center items-center  text-10">
                    <span className="inline-flex justify-center items-center w-13 h-13">&nbsp;</span>
                </div>
                <div className="week-label flex justify-center items-center  text-10">
                    <span className="inline-flex justify-center items-center w-13 h-13 leading-4">S</span>
                </div>
            </div>
        );

        for (let i = 0; i < habitDisplayData.length; i++) {
            week.push(
                <CircleDateDisplay
                    key={habitDisplayData[i].date}
                    date={habitDisplayData[i].date.toString()}
                    completed_date={habitDisplayData[i].completed_date}
                    expected_date={habitDisplayData[i].expected_date}
                />
            );

            if (week.length === 7 || i === habitDisplayData.length - 1) {
                const hasFirstOfMonth = week.some((circle) => isFirstDayOfMonth(new Date(circle.props.date)));

                const monthLabel = hasFirstOfMonth ? (
                    <div className="month-label text-sm  mb-2">
                        {format(new Date(week.find((circle) => isFirstDayOfMonth(new Date(circle.props.date))).props.date), 'MMM')}
                    </div>
                ) : null;



                weeks.push(<div key={`week-${i}`} className={`week-column-${i} flex flex-col relative`}>
                    {hasFirstOfMonth && (
                        <div className="month-label items-center justify-center text-10  mb-2 h-4 whitespace-nowrap overflow-x-visible absolute -top-3.5  left-1/2 transform -translate-x-1/2">
                            {format(new Date(week.find((circle) => isFirstDayOfMonth(new Date(circle.props.date))).props.date), 'MMM')}
                        </div>
                    )}
                    {week}</div>);
                week = [];
            }
        }

        return weeks;
    };

    const weeks = renderWeeks(habitDisplayData);

    return (
        <div className = "py-1 px-4 w-full mt-5 font-itim tracking-normal">
            <div className="flex justify-around">
                <div className="flex flex-col pr-4">
                    <div className="flex justify-center">
                        <div className = " relative flex flex-col items-center tool-tooltip" data-tooltip-delay-show="600" data-tooltip-id="consistency-tooltip" data-tooltip-content="Consistency measures how consistently you've kept up with your habit since you've started. It's based on the number of times you've completed the habit compared to the number of times you were supposed to complete it. If your score is above 100%, you're really crushing it!">
                            <div className="ml-2 text-xl flex font-jua">
                                {calculateConsistency(habit)} <span className="text-base font-normal self-end">% </span>
                            </div>
                            <div className="flex items-center text-sm  -mt-1">
                                Consistency
                            </div>
                            <Tooltip  opacity='1' border='1px solid #A97A40' id='consistency-tooltip' place="top" effect="solid" className="custom-tooltip" classNameArrow='custom-tooltip-arrow'/>
                        </div>
                    </div>


                    <div className ="grid grid-cols-2 gap-4 mt-2 justify-center items-center tool-tooltip">
                        <div className="flex flex-col items-center justify-center" data-tooltip-delay-show="600" data-tooltip-id="done-tooltip" data-tooltip-content="The total number of times you have completed this habit from creation!">
                            <div className="text-xl flex font-jua">
                                {calculateCompletedDates(habit)}
                            </div>
                            <div className="flex items-center text-sm -mt-1">
                                Done
                            </div>
                            <Tooltip opacity='1' border='1px solid #A97A40' id="done-tooltip" place="bottom" effect="solid" className="custom-tooltip" classNameArrow='custom-tooltip-arrow'/>
                        </div>

                        <div className="flex flex-col items-center justify-center tool-tooltip" data-tooltip-delay-show="600" data-tooltip-id="streak-tooltip" data-tooltip-content="Your streak reflects the longest consecutive duration in which you have successfully completed this habit without any lapses. Stay committed to maintain your streak!">
                            <div className="text-xl flex font-jua">
                                {calculateStreak(habit)}
                            </div>
                            <div className="flex items-center text-sm -mt-1">
                                Streak
                            </div>
                            <Tooltip opacity='1' id="streak-tooltip" place="bottom" effect="solid" className="custom-tooltip" classNameArrow='custom-tooltip-arrow' border='1px solid #A97A40'/>
                        </div>

                    </div>
                </div>
                <div className="flex flex-col  tool-tooltip" data-tooltip-delay-show="600" data-tooltip-id="weekview-tooltip" data-tooltip-content="This is a view across time of how you're tracking with your habits. Each circle represents a specific day, and each column represents a week. The rightmost column represents the current week. Green circles indicate completed habits, while red circles indicate missed habits.">
                    <div className="w-full justify-center flex items-end font-jua">
                        {weeks}
                    </div>
                    <div className="flex justify-center mt-1 overflow-x-auto whitespace-nowrap">
                        <div className="flex items-center mr-2">
                            <div className="w-3 h-3 bg-green rounded-full mr-1" />
                            <span className= "  text-xs"> Done </span>
                        </div>
                        <div className="flex items-center mr-2">
                            <div className="w-3 h-3 bg-biege-display rounded-full mr-1 border border-brown-border " />
                            <span className= "  text-xs"> Day Off </span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-red rounded-full mr-1 " />
                            <span className= "  text-xs"> Miss </span>
                        </div>
                    </div>
                    <Tooltip border='1px solid #A97A40' id="weekview-tooltip" place="top" effect="solid" className="custom-tooltip" classNameArrow='custom-tooltip-arrow'/>
                </div>
            </div>
        </div>
    );
};

export default ExpandedHabitInfo;