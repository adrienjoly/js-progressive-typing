// @ts-check

import { getProvider } from './getProvider.js';
import { sendOrder } from './sendOrder.js';

export async function dispatchOrder(speciality, customerAddress) {
    const provider = getProvider(speciality);
    sendOrder(provider.phoneNumber, customerAddress);
}

// sample call
await dispatchOrder('pizza', '55 Rue du Faubourg Saint-Honoré, 75008 Paris');
await dispatchOrder('sushi', '55 Rue du Faubourg Saint-Honoré, 75008 Paris');
