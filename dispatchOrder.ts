import type { Speciality } from './contract.ts';
import { getProvider } from './getProvider.ts';
import { sendOrder } from './sendOrder.ts';

// TODO: validate type of speciality and customerAddress from API request, e.g. using Zod

export async function dispatchOrder(speciality: Speciality, customerAddress: string) {
    const provider = getProvider(speciality);
    // if (!provider) throw new Error(`No provider found for ${speciality}`);
    sendOrder(provider.phoneNumber, customerAddress);
}

// sample call
await dispatchOrder('pizza', '55 Rue du Faubourg Saint-Honoré, 75008 Paris');
await dispatchOrder('sushi', '55 Rue du Faubourg Saint-Honoré, 75008 Paris');
