import { createContext } from 'react';

const HabitInfoMoreOptionsContext = createContext({
    openedHabitMoreOptions: null,
    setOpenedHabitMoreOptions: () => {},
});

export default HabitInfoMoreOptionsContext;