import { useState, useEffect } from 'react';
import { Providers, ProviderState } from '@microsoft/mgt-element';
import { Msal2Provider } from "@microsoft/mgt-msal2-provider";

Providers.globalProvider = new Msal2Provider({
    clientId: 'REPLACE_WITH_YOUR_CLIENTID',
    authority: 'REPLACE_WITH_YOUR_AUTHORITY', //IT LOOK LIKE https://login.microsoftonline.com/{TENENTID}
    scopes: ["user.read", "people.read", "user.readbasic.all"]
});

export function useIsSignedInGraph(): [boolean] {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const updateState = () => {
            const provider = Providers.globalProvider;
            setIsSignedIn(provider && provider.state === ProviderState.SignedIn);

            if (provider.state === ProviderState.SignedOut) {
                console.log('Login redirect.');
                provider?.login?.();
            }

            if (provider.state === 2) {
                setIsSignedIn(true);
            } else {
                setIsSignedIn(false);
            }
        };

        Providers.onProviderUpdated(updateState);
        updateState();

        return () => {
            Providers.removeProviderUpdatedListener(updateState);
        }
    }, [isSignedIn]);

    return [isSignedIn];
}