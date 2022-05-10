import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import NavBar from "../ui/NavBar";
import { messages } from "../../helpers/calendar-messages-es";

import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarEvent from "./CalendarEvent";
import { useState } from "react";
import CalendarModal from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import {
    eventClearActiveEvent,
    eventStartLoading,
    setActive,
} from "../../actions/events";
import AddNewFab from "../ui/AddNewFab";
import DeleteEventFab from "../ui/DeleteEventFab";
import { useEffect } from "react";

moment.locale("es");

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(eventStartLoading());
    }, [dispatch]);

    const { events, activeEvent } = useSelector((state) => state.calendar);

    const initialState = localStorage.getItem("lastView") || "month";

    const [lastView, setLastView] = useState(initialState);

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
    };

    const onSelectEvent = (e) => { //TODO EDITANTOOOOOOOO
        dispatch(setActive(e));
    };

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem("lastView", e);
    };

    const onSelectSlot = (e) => {
        if (activeEvent) {
            dispatch(eventClearActiveEvent());
        }
    };

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: "#367CF7",
            borderRadius: "0",
            opacity: 0.8,
            color: "white",
            display: "block",
        };
        return {
            style,
        };
    };

    return (
        <div className="calendar-screen">
            <NavBar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent,
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                onSelectSlot={onSelectSlot}
                selectable={true}
            />

            <AddNewFab />
            {activeEvent && <DeleteEventFab />}

            <CalendarModal />
        </div>
    );
};

export default CalendarScreen;
