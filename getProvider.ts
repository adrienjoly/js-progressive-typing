export function getProvider(speciality: 'pizza' | 'burger') {
    switch (speciality) {
        case 'pizza':
            return { name: 'Pizza Capri', phoneNumber: '312-949-1311' };
        case 'burger':
            return { name: 'McSmash', phoneNumber: '123-242-4399' };   
        default:
            console.error('unknown speciality');
    }
}
