import {Neo4jDb} from "./../neo4jdb";

export function setupTest(done: MochaDone = () => {/* do nothing*/}, verboseOutput = false) {
    const query = `
match (n) detach delete n;
create (:User{id:"u1" , schedule:"0830-1800|0830-1800|0830-1800|0830-1800|0830-1700|0830-1500|0830-1500", departure:"3.0780289, 101.60655040000006",arrival:"3.1615,101.69799999999998"   ,company:"Queen's College KL" ,type:"driver",currentkms:0,name:"jackson"    ,phone:"0123456789" ,address:"84,, 60, lorong pjs 10/24a, bandar sunway, 46150 petaling jaya, selangor"}) -[:OWNS]->(:Car{model:"myvi",capacity:4,platenum:"wre 8907",color:"yellow"});
create (:User{id:"u2" , schedule:"0900-1800|0900-1800|0900-1800|0900-1800|0900-1700|0900-1600|-", departure:"3.0756886,101.60675049999998" ,arrival:"3.1615,101.69799999999998"   ,company:"Queen's College KL"                 ,type:"rider" ,currentkms:0,name:"peter"      ,phone:"0123478579",address:"jalan pjs 10/15,bandar sunway,46150 petaling jaya,selangor "});
create (:User{id:"u3" , schedule:"0840-1800|0840-1800|0840-1800|0840-1800|0840-1700|0840-1500|0840-1500", departure:"3.078338,101.60849659999997"  ,arrival:"3.1615,101.69799999999998"   ,company:"Queen's College KL" ,type:"rider" ,currentkms:0,name:"aiman"      ,phone:"012003219" ,address:"jalan pjs 10/32,bandar sunway,46150 petaling jaya,selangor"});
create (:User{id:"u4" , schedule:"0840-1730|0840-1730|0840-1730|0840-1730|0840-1730|0840-1730|0840-1730", departure:"3.075149,101.60616000000005"  ,arrival:"3.1326988,101.67225259999998",company:"WTF Restaurant"     ,type:"rider" ,currentkms:0,name:"natasha"    ,phone:"014512219" ,address:"22 g, jalan pjs 10/22, subang indah, selangor, pjs 10, 46000 petaling jaya, selangor"});
create (:User{id:"u5" , schedule:"0845-1730|0845-1730|0845-1730|0845-1730|0845-1730|0845-1730|0845-1730", departure:"3.0749643,101.6008663"        ,arrival:"3.1326988,101.67225259999998",company:"WTF Restaurant"     ,type:"rider" ,currentkms:0,name:"dheeno"     ,phone:"0145889219",address:"jalan pjs 10/7,bandar sunway,46150 petaling jaya,selangor"});
create (:User{id:"u6" , schedule:"0900-1800|0900-1800|0900-1800|0900-1800|0900-1600|0900-1800|0900-1600", departure:"3.0766629,101.60385429999997" ,arrival:"3.1326988,101.67225259999998",company:"WTF Restaurant"     ,type:"driver",currentkms:0,name:"sonia"      ,phone:"0142682311",address:"432, jalan pjs 10/9, bandar sunway, 46150 petaling jaya, selangor"}) -[:OWNS]->(:Car{model:"alza",capacity:4,platenum:"wba 8232",color:"red"});
create (:User{id:"u7" , schedule:"0850-1730|0850-1730|0850-1730|0850-1730|0850-1730|0850-1730|0850-1730", departure:"3.077537,101.60453800000005"  ,arrival:"3.1326988,101.67225259999998",company:"WTF Restaurant"     ,type:"rider" ,currentkms:0,name:"chan wong"  ,phone:"016782111" ,address:"3a07, block c, pangsapuri ridzuan 3, jalan pjs 10/11, 46000, petaling jaya, selangor"});
create (:User{id:"u8" , schedule:"0835-1730|0835-1730|0835-1730|0835-1730|0835-1730|0835-1730|0835-1730", departure:"3.0741329,101.62934169999994" ,arrival:"3.1326988,101.67225259999998",company:"WTF Restaurant"     ,type:"rider" ,currentkms:0,name:"james ooi"  ,phone:"015782111" ,address:"no. 77, jalan pjs 10/34, taman sri subang, pjs 10, 46000 petaling jaya, selangor"});
create (:User{id:"u9" , schedule:"0900-1800|0900-1800|0900-1800|0900-1800|0900-1800|0900-1800|0900-1801", departure:"3.0766802,101.60453519999999" ,arrival:"3.1326988,101.67225259999998",company:"WTF Restaurant"     ,type:"rider" ,currentkms:0,name:"david james",phone:"016792111" ,address:"jalan pjs 10/11a, pjs 10, 46150 petaling jaya, selangor"});
create (:User{id:"u10", schedule:"0850-1800|0850-1800|0850-1800|0850-1800|0850-1800|0850-1800|0850-1800", departure:"3.0766647,101.60438899999997" ,arrival:"3.1326988,101.67225259999998",company:"WTF Restaurant"     ,type:"rider" ,currentkms:0,name:"siva rao"   ,phone:"019792111" ,address:"j446, jalan pjs 10/11a, pjs 10, 46150 petaling jaya, selangor"});
`;
    const db = new Neo4jDb();
    const queries = query.split("\n");
    let i = queries.length;
    queries.forEach((q) => {
        if (verboseOutput) {
            // tslint:disable-next-line:no-console
            console.log("Running query : " + q);
        }
        db.sendQuery(q);
        i--;
        if (i === 0) {
            done();
            if (verboseOutput) {
                // tslint:disable-next-line:no-console
                console.log("Setup completed.");
            }
        }
    });
}
