import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Gallery } from "./Gallery";
import { InfoCard } from "./InfoCard";
import { ILot } from "../types";

import './lot.css';

const lots = [28903764, 59542961, 58044031, 45109901, 59448481, 57463921, 58378311, 59373791, 56258581, 60120231, 56150021];
const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZoneName: 'short' };

export const Lot = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [lot, setLot] = useState<ILot>();

    const handleSignOut = useCallback(() => {
        const options = {
            method: 'POST'
        };

        fetch('/api/sign-out', options)
        .then(() => {
            localStorage.setItem('isAuth', 'false');
            navigate('/sign-in')
        })
        .catch((e) => {
            console.error(e);
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
            console.error(e);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    return (
        <div className={`lot-wrapper ${isLoading ? 'is-loading' : ''}`}>
            {
                isLoading 
                    ? (
                        <svg width="200px" height="200px" viewBox="0 0 100 100">
                            <path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#2158f5" stroke="none">
                                <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51;360 50 51"></animateTransform>
                            </path>
                        </svg>
                      )
                    : (
                        <>
                            <div className="lot-header">
                                <div className="lot-shor-info-wrapper">
                                    <h1>{lot?.description} at {lot?.locationCountry} auction</h1>
                                    <div className="lot-short-info">
                                        <div>Lot # <strong>{lot?.id}</strong></div>
                                        <div>Sale Location <strong>{lot?.location.name}</strong></div>
                                        <div>{lot?.lane}/{lot?.item}/{lot?.gridRow}</div>
                                        <div>Sale Date: <strong>{new Date(lot?.saleDate!).toLocaleDateString('en-US', dateOptions)}</strong></div>
                                    </div>
                                </div>
                                <div className="sign-out">
                                    <button type="button" onClick={handleSignOut}>Sign Out</button>
                                </div>
                            </div>
                            <div className="lot-content">
                                <Gallery images={lot?.images!} />
                                <InfoCard title={`Lot # ${lot?.id} Details`}>
                                    <div className="card-item">VIN: <strong>{lot?.vin}</strong></div>
                                    <div className="card-item">Title Code: <strong>{lot?.title.name}</strong></div>
                                    <div className="card-item">Odometer: <strong>{lot?.odometer} {lot?.odometerBrand}</strong></div>
                                    <div className="card-item">Primary Damage: <strong>{lot?.primaryDamage}</strong></div>
                                    {lot?.bodyStyle && <div className="card-item">Body Style: <strong>{lot?.bodyStyle}</strong></div>}
                                    <div className="card-item">Vehicle Type: <strong>{lot?.vehicleType}</strong></div>
                                    <div className="card-item">Color: <strong>{lot?.color}</strong></div>
                                    <div className="card-item">Engine: <strong>{lot?.engineSize}</strong></div>
                                </InfoCard>
                                <InfoCard title="Bid Information">
                                    <div className="card-item">Bid Status: <strong>{lot?.bidStatus}</strong></div>
                                    <div className="card-item">Recommended Bid: <strong>{lot?.saleStatusString}</strong></div>
                                    <div className="card-item">Current Bid: <strong>{lot?.currencySymbol}{lot?.currentBid}</strong> {lot?.currency}</div>
                                </InfoCard>
                            </div>
                        </>
                      )
            }
        </div>
    )
}