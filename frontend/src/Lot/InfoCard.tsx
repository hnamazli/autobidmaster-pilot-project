import React from "react";

import "./info-card.css";

interface IInfoCardProps {
    title: string;
    children?: React.ReactNode
}

export const InfoCard: React.FC<IInfoCardProps> = ({ title, children }) => (
    <div className="info-card-wrapper">
        <div className="info-card-header">
            {title}
        </div>
        <div className="info-card-content">
            {children}
        </div>
    </div>
)