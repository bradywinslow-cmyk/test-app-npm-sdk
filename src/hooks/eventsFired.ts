import { useEffect } from "react";
import { SprigEvent } from '@sprig-technologies/sprig-browser';

const LIFECYCLE_EVENTS = [
    { listenFor: SprigEvent.SurveyAppeared, trackAs: 'sprig/survey-appeared' },
    { listenFor: SprigEvent.QuestionAnswered, trackAs: 'sprig/question-answered' },
    { listenFor: SprigEvent.SurveyClosed, trackAs: 'sprig/survey-closed' },
]

export function useSprigLifecycleEvents() {
    useEffect(() => {
        const subscriptions = LIFECYCLE_EVENTS.map(({ listenFor, trackAs }) => {
            const listener = (event: unknown) => {
                const payload = event as Record<string, string>;
                Sprig.track(`${trackAs}-${payload['survey.id']}`);
            };
            Sprig.addListener(listenFor, listener);
            return { listenFor, listener };
        });
        
        return () => {
            subscriptions.forEach(({ listenFor, listener }) => Sprig.removeListener(listenFor, listener));
        };
    }, []);
}
