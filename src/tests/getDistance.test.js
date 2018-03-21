const getDistance = require('../getDistance');
const expect = require('chai').expect;
describe('getDistance', () => {
    it('case 1', (done) => {
        const origin = "2.747968,101.666252";
        const destinations = ["3.086644,101.681667", "2.527198,101.953202" ];
        getDistance(origin, destinations, (error, distances) => {
            console.log(error);
            expect(distances).to.deep.eq([ 52.4, 71.7 ]);
            done();
        });
    });

    it('should throw if origin contain spaces', () => {
        const origin = "3, 5";
        const destinations = [];
        getDistance(origin, destinations, (error, distances) => {
            expect(error).to.not.eq(undefined);
            expect(distances).to.eq(undefined);
        });
        
    });
});