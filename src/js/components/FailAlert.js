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
                open={showAlert}
                color="red"
                icon={<ExclamationTriangleIcon className="h-6 w-6" />}
                onClose={() => {
                    setShowAlert(false)
                    console.log('close')
                }}
                animate={{
                    mount: { y: 0 },
                    unmount: { y: 100 },
                }}
            >
                {alertMsg}
            </Alert>
        </Fragment>)
    );
}