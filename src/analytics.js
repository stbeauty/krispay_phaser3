import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'
import googleTagManager from '@analytics/google-tag-manager'
import {GA_TRACKING_ID, GTM_TRACKING_ID} from "./config";


export default Analytics({
    app: 'Krispay Game',
    plugins: [
        googleAnalytics({
            trackingId: GA_TRACKING_ID,
        }),
        googleTagManager({
            trackingId: GTM_TRACKING_ID,
            containerId: GTM_TRACKING_ID,
        })
    ]
})