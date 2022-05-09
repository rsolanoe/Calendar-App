import { useDispatch } from "react-redux";
import { uiOpenModal } from "../../actions/ui";

const AddNewFab = () => {
    const dispatch = useDispatch();

    const handleClickNew = () => {
        dispatch(uiOpenModal());
    };

    return (
        <button onClick={handleClickNew} className="btn btn-primary fab">
            <i className="fas fa-plus"></i>
        </button>
    );
};

export default AddNewFab;
