import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { startChecking } from "../actions/auth";
import LoginScreen from "../components/auth/LoginScreen";
import CalendarScreen from "../components/calendar/CalendarScreen";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRouter = () => {
    const {checking, uid} = useSelector( state => state.auth);
    console.log(!!uid);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    if (checking) {
        return <h5>Espere...</h5>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<PublicRoute isAuth={!!uid}>
                    <LoginScreen />
                </PublicRoute>} />

                <Route path="/" element={<PrivateRoute isAuth={!!uid}>
                    <CalendarScreen />
                </PrivateRoute>} />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
