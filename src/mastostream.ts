// @ts-nocheck
import {login} from "masto";

export default async (onStream: (status: string) => void) => {
    try {
        const masto = await login({
            url: 'https://mastodon.social/',
            accessToken: 'your-access-token'
        });

        // Connect to the streaming api
        const stream = await masto.stream.streamPublicTimeline();

        // Subscribe to updates
        stream.on('update', (status) => {
            console.log('New message received from Mastodon timeline, from user ', status.account.displayName);
            // a bit of cleaning of special characters
            const cleanedMessage = JSON.stringify(status.content?.replace(/<[^>]*>/g, '')).replace(/[”“"'’‘«»`´]/g, '')
            onStream(cleanedMessage);
        });
    } catch (err) {
        console.log(err)
    }
};
