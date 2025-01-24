import { getProvider } from './getProvider.ts';
import { sendOrder } from './sendOrder.ts';

export async function dispatchOrder(speciality, customerAddress) {
    const provider = getProvider(speciality);
    sendOrder(provider.phoneNumber, customerAddress);
}

// sample call
await dispatchOrder('pizza', '55 Rue du Faubourg Saint-Honoré, 75008 Paris');
await dispatchOrder('sushi', '55 Rue du Faubourg Saint-Honoré, 75008 Paris');
