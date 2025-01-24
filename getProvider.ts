export function getProvider(speciality: 'pizza' | 'burger'): { name: string, phoneNumber: string } {
    switch (speciality) {
        case 'pizza':
            return { name: 'Pizza Capri', phoneNumber: '312-949-1311' };
        case 'burger':
            return { name: 'McSmash', phoneNumber: '123-242-4399' };   
        default:
            // this should never happen, if speciality's value satisfies its type
            throw new Error('unknown speciality');
    }
}
