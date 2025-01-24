export async function sendOrder(phoneNumber: string, customerAddress: string) {
    console.log(`Order sent to ${phoneNumber} at ${customerAddress}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    throw new Error('failed to send order');
}
