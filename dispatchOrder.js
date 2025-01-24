// @ts-check

import { getProvider } from './getProvider.js';
import { sendOrder } from './sendOrder.js';

/**
 * @param {import('./contract.ts').Speciality} speciality 
 * @param {string} customerAddress 
 */
export async function dispatchOrder(speciality, customerAddress) {
    const provider = getProvider(speciality);
    // if (!provider) throw new Error(`No provider found for ${speciality}`);
    sendOrder(provider.phoneNumber, customerAddress);
}

// sample call
await dispatchOrder('pizza', '55 Rue du Faubourg Saint-Honoré, 75008 Paris');
await dispatchOrder('sushi', '55 Rue du Faubourg Saint-Honoré, 75008 Paris');
