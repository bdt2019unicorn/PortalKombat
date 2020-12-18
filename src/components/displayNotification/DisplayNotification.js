import { Card, Metric, Notification } from "@kiwiwealth/ui";
import React from "react";

function renderNotification(array) {
    if (array && array.length > 0) {
        const request = array[0];

        return (<>

            <Card isMiddleAligned
                isFlushBottom
                hasDropShadow
                hasDottedBackground
                className="u-color-grey-dark u-text-decoration-none@hover u-line-height-headline"
                heading={<>You've got a safe drive waiting for you.</>}
            >
                <a href={`/drive/${request.key}`} >Click here to start uploading safely.</a> </Card>
        </>);
    } else {
        return (<>Something will show up here...</>)
    }
}
export default function DisplayNotification(props) {
    return (
        <> {renderNotification(props.itemsArray)}</>

    );
}
