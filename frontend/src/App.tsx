import React from "react";
import { Outlet } from 'react-router-dom';

export const App: React.FC = () => (
    <div className="app">
        <Outlet />
    </div>
)