import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useHabits } from '../context/HabitsContext';
import ReorderIcon from '../assets/reorder.svg';
import BackIcon from '../assets/back_icon.svg';
import SaveIcon from '../assets/save.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import {doc, updateDoc} from 'firebase/firestore';


function ReorderHabits() {
    const { habits } = useHabits();
    const [showSaveButton, setShowSaveButton] = useState(false);
    const navigate = useNavigate();

    const normalizeHabits = (habits) => {
        return habits.map((habit, index) => {
            return { ...habit, habit_index: index };
        });
    }

    const normalizedHabits = normalizeHabits(habits);
    const [tempHabits, setTempHabits] = useState(normalizedHabits);


    function handleDragEnd(result) {
        if (!result.destination) {
            return;
        }

        const startIndex = result.source.index;
        const endIndex = result.destination.index;

        if (startIndex === endIndex) {
            return;
        }
        const newTempHabits = [...tempHabits];
        const [removed] = newTempHabits.splice(startIndex, 1);
        newTempHabits.splice(endIndex, 0, removed);
        setTempHabits(newTempHabits);
        setShowSaveButton(true);
    }

    const handleSave = async () => {
        try {
            await Promise.all(tempHabits.map((habit, index) => {
                const habitRef = doc(db, 'users', auth.currentUser.uid, 'habits', habit.id);
                return updateDoc(habitRef, { habit_index: index });
            }));
            navigate('/home');
        } catch (error) {
            console.error("Error updating habit indexes in Firestore", error);
        }
    };


    return (
        <div className="px-3">
            <div className="px-3 pt-3 pb-3 flex justify-between items-center">

                <button className="flex items-center justify-center text-lg bg-brown-add-button text-FCE3BF py-2 px-4 border-brown-font border-2 rounded-22px shadow-press-brown-button active:bg-brown-button-press active:translate-y-2px active:shadow-none transition-all duration-100 hover:bg-brown-button-presss">
                    <Link to="/">
                        <img src= {BackIcon} alt="Back" className="h-5 w-5 inline-block"/>
                        <span className="ml-2">Back</span>
                    </Link>
                </button>

                {!showSaveButton && <span className="flex pl-3 text-lg text-right">Drag to reorder habits</span>}
                {showSaveButton && (
                    <button className="flex items-center justify-center text-lg bg-green text-FCE3BF py-2 px-4 border-green-border border-2 rounded-22px shadow-press-green-button active:bg-dark-green active:translate-y-2px active:shadow-none transition-all duration-100 hover:bg-dark-green" onClick={handleSave}>
                        <img src= {SaveIcon} alt="Save" className="h-5 w-5 inline-block"/>
                        <span className="ml-2">SAVE</span>
                    </button>
                )}
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="habits" type="group">
                    {(provided) => (
                        <ul {...provided.droppableProps} ref={provided.innerRef} className="px-3 py-3 space-y-3 active:bg-biege-drop-down rounded-3xl">
                            {tempHabits.map((habit, index) => (
                                <Draggable key={habit.id.toString()} draggableId={habit.id.toString()} index={index}>
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="standard-component flex items-center py-2 px-2  active:bg-green-clicked active:text-FCE3BF active:border-green-border hover:scale-105"
                                        >
                                            <div className="flex items-center justify-center h-10 w-10 m-1">
                                                <img src={ReorderIcon} alt="Reorder Icon" className=" flex h-6 w-6 stroke-white" />
                                            </div>
                                            <div className="text-xl">{habit.habit_name}</div>

                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default ReorderHabits;