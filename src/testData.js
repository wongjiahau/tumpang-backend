// Test case
// Driver: ali
// Riders: bob, chan
// rfc means 'Request for confirmation'
const testData = {
    data: [
        {
            type: 'rfc4driver',
            target: 'ali',
            riders: [
                'bob',
                'chan'
            ]
        },
        {
            type: 'rfc4rider',
            target: 'bob',
            driver: 'ali'
        }, 
        {
            type: 'rfc4rider',
            target: 'chan',
            driver: 'ali'
        }
    ]
};