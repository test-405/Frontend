import { useState, Fragment } from "react";
import { Alert, Button } from "@material-tailwind/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid"

export default function FailAlert({ showAlert, alertMsg }) {
    const [open, setOpen] = useState(true);

    return (showAlert && (
        <Fragment>
            <Alert
                variant="gradient"
                open={open}
                color="red"
                icon={<ExclamationTriangleIcon className="h-6 w-6" />}
                onClose={() => setOpen(false)}
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