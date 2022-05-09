import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {

        const {uid, name} = getState().auth

        try {
            const resp = await fetchConToken("events", event, "POST");
            const body = await resp.json();
            console.log(event)
            console.log(body)

            if (body.ok) {
                event.id = body.event.id
                event.user = {
                    _id: uid,
                    name: name
                }
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

export const eventDeleted = (event) => ({
    type: types.eventDeleted,
    payload: event,
});
