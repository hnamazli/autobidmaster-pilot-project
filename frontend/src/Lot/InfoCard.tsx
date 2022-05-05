import React from "react";

interface IInfoCard {
    children?: React.ReactNode
}

export const InfoCard: React.FC<IInfoCard> = ({ children }) => (
    <div className="info-card-wrapper">
        {children}
    </div>
)