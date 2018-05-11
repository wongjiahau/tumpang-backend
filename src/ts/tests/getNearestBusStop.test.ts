import {expect} from "chai";
import {getNearestBusStop} from "../getNearestBusStop";
import {ICoordinate} from "../models/coordinate";

describe("getNearybyBusStop", () => {
    it("case 1", async () => {
        const desaPetaling: ICoordinate = {
            latitude: 3.083750,
            longitude: 101.707558
        };
        const response = await getNearestBusStop(desaPetaling);
        delete response.reference;
        expect(response).to.deep.eq({
            geometry: {
                location: {
                lat: 3.083649,
                lng: 101.709193
                },
                viewport: {
                northeast: {
                    lat: 3.084997980291502,
                    lng: 101.7105419802915
                },
                southwest: {
                    lat: 3.082300019708498,
                    lng: 101.7078440197085
                }
                }
            },
            icon: "https://maps.gstatic.com/mapfiles/place_api/icons/bus-71.png",
            id: "9ddc1395092fdd2c54be711b150de066dc0c9ebf",
            name: "SRK Desa Petaling Jalan 2/125", // <== Important part here
            place_id: "ChIJNUBuZ4g1zDERYUX2Wo2oVPw",
            scope: "GOOGLE",
            types: [
                "bus_station",
                "transit_station",
                "point_of_interest",
                "establishment"
            ],
            vicinity: "Malaysia"
        });
    });

});
