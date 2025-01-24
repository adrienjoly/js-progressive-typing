// @ts-check

/**
 * @param {import("./contract.ts").Speciality} speciality 
 * @returns {{ name: string, phoneNumber: string }}
 */
export function getProvider(speciality) {
    switch (speciality) {
        case 'pizza':
            return { name: 'Pizza Capri', phoneNumber: '312-949-1311' };
        case 'burger':
            return { name: 'McSmash', phoneNumber: '123-242-4399' };
        case 'sushi':
            return { name: 'Fuji Sushi', phoneNumber: '456-728-1278' };
        default:
            // this should never happen, if speciality's value satisfies its type
            /** @satisfies {never} */(speciality);
            throw new Error('unknown speciality');
    }
}
