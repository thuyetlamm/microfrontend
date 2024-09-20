import {useEffect, useState} from "react";

export const useOnlineStatus = () => {
   const [isOnline , setOnline] = useState<boolean>(true)

    // Effect to handle online/offline status changes
    useEffect(() => {
        if(window === undefined) return
        // Event handlers for online and offline events
        const handleOnline = () => setOnline(true);
        const handleOffline = () => setOnline(false);

        // Add event listeners for online and offline events
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Clean up event listeners when the component unmounts
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Return the current online status
    return isOnline;
}