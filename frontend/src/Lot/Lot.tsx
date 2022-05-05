import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const lots = [28903764, 59542961, 58044031, 45109901, 59448481, 57463921, 58378311, 59373791, 56258581, 60120231, 56150021];

export const Lot = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [lot, setLot] = useState<any>({});

    useEffect(() => {
        const isAuth = localStorage.getItem('isAuth');

        if (!isAuth) {
            navigate('/sign-in', { replace: true });

            return;
        }

        const randomIndex = Math.floor(Math.random() * (lots.length - 1));

        fetch(`/api/lot?id=${lots[randomIndex]}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                setLot(data.lot);

                return;
            }

            navigate(data.redirectUrl, { replace: true });
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
        <>
            {lot.id}
        </>
    )
}