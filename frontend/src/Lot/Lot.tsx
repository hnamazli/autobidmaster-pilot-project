import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InfoCard } from "./InfoCard";

import './lot.css';

const lots = [28903764, 59542961, 58044031, 45109901, 59448481, 57463921, 58378311, 59373791, 56258581, 60120231, 56150021];

const dateOptions: any = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZoneName: 'short' };

export const Lot = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [lot, setLot] = useState<any>({});

    const handleSignOut = useCallback(() => {
        const options = {
            method: 'POST'
        };

        fetch('/api/sign-out', options)
        .then(() => {
            localStorage.setItem('isAuth', 'false');
            navigate('/sign-in')
        });
    }, []);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * (lots.length - 1));

        fetch(`/api/lot?id=${lots[randomIndex]}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                setLot(data.lot);

                return;
            }

            localStorage.setItem('isAuth', 'false');
            navigate(data.redirectUrl);
        })
        .catch((e) => {
            console.log(e);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    if (isLoading)
        return (
            <svg width="200px" height="200px" viewBox="0 0 100 100">
                <path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#2158f5" stroke="none">
                    <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51;360 50 51"></animateTransform>
                </path>
            </svg>
        )

    return (
        <div className="lot-wrapper">
            <div className="lot-header">
                <div className="lot-shor-info-wrapper">
                    <h1>{lot.description} at {lot.locationCountry} auction</h1>
                    <div className="lot-short-info">
                        <div>Lot # <strong>{lot.id}</strong></div>
                        <div>Sale Location <strong>{lot.location.name}</strong></div>
                        <div>{lot.lane}/{lot.item}/{lot.gridRow}</div>
                        <div>Sale Date: <strong>{new Date(lot.saleDate).toLocaleDateString('en-US', dateOptions)}</strong></div>
                    </div>
                </div>
                <div className="sign-out">
                    <button type="button" onClick={handleSignOut}>Sign Out</button>
                </div>
            </div>
            <div className="lot-content">
                <InfoCard>
                    <div>test</div>
                </InfoCard>
                <div className="lot-details">

                </div>
                <div className="lot-bid-info">

                </div>
            </div>
        </div>
    )
}