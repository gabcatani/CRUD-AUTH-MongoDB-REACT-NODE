import React, { useContext } from "react";
import { AuthProvider, AuthContext } from './contexts/auth'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'

const AppRoutes = () => {
    const Private = ({ children }) => {
        const { authenticated } = useContext(AuthContext);

        if (!authenticated) {
            return <Navigate to="/login" />
        }

        return children
    }

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Private><MainPage /></Private>} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </AuthProvider>
        </Router>
    )

}

export default AppRoutes;