import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import moment from "moment";
import "./dateTimePicker.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/ui";
import {
    eventClearActiveEvent,
    eventStartAddNew,
    eventUpdated,
} from "../../actions/events";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlus1 = now.clone().add(1, "hours");

const initEvent = {
    title: "",
    notes: "",
    start: now.toDate(),
    end: nowPlus1.toDate(),
};

/* INICIO */
const CalendarModal = () => {
    const { modalOpen } = useSelector((state) => state.ui);
    const { activeEvent } = useSelector((state) => state.calendar);
    const dispatch = useDispatch();

    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent);
        } else {
            setFormValues(initEvent);
        }
    }, [activeEvent]);

    //const [dateStart, setDateStart] = useState(now.toDate()); ///13
    //const [dateEnd, setDateEnd] = useState(nowPlus1.toDate()); ///14
    const [titleValid, setTitleValid] = useState(true); ///15

    const [formValues, setFormValues] = useState(initEvent); ///16

    const { title, notes, start, end } = formValues;

    useEffect(() => {
        setFormValues({
            ...formValues,
            end: start,
        });
    }, [start]);

    const handleInputChange = ({ target }) => {
        console.log('hic');
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire(
                "Error",
                "La fecha fin debe de ser mayor a la fecha de inicio",
                "error"
            );
        }

        if (title.trim().length < 2) {
            return setTitleValid(false);
        }

        if (activeEvent) {
            dispatch(eventUpdated(formValues));
        } else {
            dispatch(eventStartAddNew(formValues));
        }

        setTitleValid(true);
        closeModal();
    };

    const closeModal = () => {
        console.log("closing...");
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent());
        //handleResetDate()
    };

    const handleResetDate = () => {
        setFormValues(initEvent);
        setDateStart(now.toDate());
        setDateEnd(nowPlus1.toDate());
    };

    const handleStartDateChange = (e) => { //TODO CHANGES HEREEEEEEEE
       // console.log(e);
       // setDateStart(e);
        setFormValues({
            ...formValues,
            start: e,
        });
    };

    const handleEndDateChange = (e) => { //TODO CHANGES HEREEEEEEEE
       // console.log(e);
       // setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e,
        });
    };

    return (
        <Modal
            isOpen={modalOpen}
            //onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> {activeEvent ? "Editar evento" : "Nuevo evento"} </h1>
            <hr />
            <form onSubmit={handleSubmitForm} className="container">
                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        className="form-control"
                        onChange={handleStartDateChange}
                        value={start} //TODO EDITANTOOOOOOOO
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        className="form-control"
                        onChange={handleEndDateChange}
                        value={end}
                        //minDate={start}
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${
                            !titleValid && "is-invalid"
                        }`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                        Una descripción corta
                    </small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">
                        Información adicional
                    </small>
                </div>

                <button type="submit" className="btn btn-outline-primary">
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>
            </form>
        </Modal>
    );
};

export default CalendarModal;
