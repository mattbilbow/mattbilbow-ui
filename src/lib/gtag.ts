// lib/gtag.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

type GtagCommand = 'config' | 'event' | 'js' | 'set';

type GtagConfigParams = {
    page_path?: string;
    [key: string]: unknown;
};

type GtagEventParams = {
    event_category?: string;
    event_label?: string;
    value?: number;
    [key: string]: unknown;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', GA_TRACKING_ID!, {
            page_path: url,
        });
    }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
                          action,
                          category,
                          label,
                          value,
                      }: {
    action: string;
    category: string;
    label?: string;
    value?: number;
}) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

// Extend the Window interface for TypeScript with proper typing
declare global {
    interface Window {
        gtag: (
            command: GtagCommand,
            targetId: string | Date,
            config?: GtagConfigParams | GtagEventParams
        ) => void;
    }
}