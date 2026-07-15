import { useEffect } from "react";
import { SprigEvent } from '@sprig-technologies/sprig-browser';

export function trackEventsFired() {
    useEffect(() => {
        window.Sprig.addListener(SprigEvent.SurveyWillPresent, (event) => {
            console.log(event);
            const payload = event as Record<string, string>;
            window.Sprig.track(`seen-${payload['survey.id']}`)
        });
    }, []);
}
