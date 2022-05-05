import React, { ChangeEvent, SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import './sign-in.css';

export const SignIn = () => {
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [formModel, setFormModel] = useState({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setFormModel((prev) => ({ ...prev, email: e.target.value }));
    }, []);

    const handlePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setFormModel((prev) => ({ ...prev, password: e.target.value }));
    }, []);

    const handleSubmit = useCallback(async (e: SyntheticEvent) => {
        e.preventDefault();

        setErrorMessage('');

        const fieldsIsEmpty = Object.values(formModel).some((val) => !val.trim());

        if (fieldsIsEmpty) {
            setErrorMessage('Fields is empty!');

            return;
        }

        setIsSubmitting(true);

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formModel)
        };

        fetch('/api/sign-in', options)
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                localStorage.setItem('isAuth', 'true');
                navigate(data.redirectUrl, { replace: true });
                
                return;
            }

            setErrorMessage(data.message);
        })
        .catch((e) => {
            console.log(e);
        })
        .finally(() => {
            setIsSubmitting(false);
        });
    }, [formModel]);

    useEffect(() => {
        const isAuth = localStorage.getItem('isAuth');

        if (JSON.parse(isAuth!)) navigate('/');
    }, []);

    return (
        <div className="sign-in-wrapper">
            <div className="form-wrapper">
                <h1>Sign In to your account</h1>
                {errorMessage && <div className="error-block">{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" onChange={handleEmail} placeholder="Email" disabled={isSubmitting} />
                    <input type="password" name="password" onChange={handlePassword} placeholder="Password" disabled={isSubmitting} />
                    <button type="submit" onClick={handleSubmit} disabled={isSubmitting}>Sign In</button>
                </form>
            </div>
        </div>
    )
};