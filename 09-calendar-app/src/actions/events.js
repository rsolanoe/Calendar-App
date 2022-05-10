import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {
        const { uid, name } = getState().auth;

        try {
            const resp = await fetchConToken("events", event, "POST");
            const body = await resp.json();
            console.log(event);
            console.log(body);

            if (body.ok) {
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name: name,
                };
                dispatch(eventAddNew(event));
            }
        } catch (error) {
            console.log(error);
        }
    };
};

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event,
});

export const setActive = (event) => ({
    type: types.eventSetActive,
    payload: event,
});

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent,
});

export const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event,
});

const eventDeleted = () => ({
    type: types.eventDeleted,
    payload: event,
});

export const eventStartLoading = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken("events");
            const body = await resp.json();

            const events = prepareEvents( body.events );
            dispatch(eventLoaded(events));
        } catch (error) {}
    };
};

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events,
});


export const eventStartDelete = () => {
    return async (dispatch, getState) => {
        const {id} = getState().calendar.activeEvent
        try {
            
            const resp = await fetchConToken(`events/${id}`, {}, 'DELETE');
            const body = await resp.json();
            
            if (body.ok) {
                dispatch(eventDeleted())
            } else {
                Swal.fire('Error', body.msg, 'error')
            }


        } catch (error) {
            console.log(error)
        }
    }
}