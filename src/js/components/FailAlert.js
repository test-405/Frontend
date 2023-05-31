import { useState, Fragment, useEffect } from "react";
import { Alert, Button } from "@material-tailwind/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid"

export default function FailAlert({ showAlert, alertMsg, setShowAlert }) {

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false)
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    return (showAlert && (
        <Fragment>
            <Alert
                variant="gradient"
                color="red"
                open={showAlert}
                icon={<ExclamationTriangleIcon className="h-6 w-6" />}
            >
                {alertMsg}
            </Alert>
        </Fragment>)
    );
}