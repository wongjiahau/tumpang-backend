drop database if exists tumpang;
create database tumpang;
use tumpang;

create table user(
    id varchar(30),
    departure varchar(60),
    arrival varchar(60),
    type varchar(10),
    currentkms decimal(7,2),
    primary key (id)
);

create table schedule(
    userid varchar(30),
    day varchar(10),
    starttime varchar(10),
    endtime varchar(10)
);

create table car(
    userid varchar(30),
    cmodel varchar(25),
    capacity int(4),
    platenum varchar(10),
    color varchar(10),
    primary key(userid)
);


create table userdetails(
    userid varchar(30),
    name varchar(40),
    phoneno varchar(20),
    address varchar(100),
    primary key(userid),
    foreign key (userid) references user(id)
);

create table earning(
    earningid varchar(20),
    userid varchar(30),
    type varchar(10),
    amount decimal(5,2),
    primary key(earningid),
    foreign key(userid) references user(id)
);

create table successfulrides(
    rideid varchar(10),
    ridedate datetime,
    driver_id varchar(30),
    km decimal(5,2),
    pickuppoint varchar(30),
    primary key(rideid),
    foreign key(driver_id) references user(id)
);

create table riders(
    rideid varchar(10),
    riderid varchar(30),
    foreign key(riderid) references user(id)
);


insert into schedule(userid,day,starttime,endtime) 
values("u1", "mon", "8.30am", "6.00pm");
insert into schedule(userid,day,starttime,endtime) 
values("u1", "tue", "8.30am", "6.00pm");
insert into schedule(userid,day,starttime,endtime) 
values("u1", "wed", "8.30am", "6.00pm");
insert into schedule(userid,day,starttime,endtime) 
values("u1", "thu", "8.30am", "6.00pm");
insert into schedule(userid,day,starttime,endtime) 
values("u1", "fri", "8.30am", "5.00pm");
insert into schedule(userid,day,starttime,endtime) 
values("u1", "sat", "8.30am", "3.00pm");

insert into user(id, departure, arrival, type,currentkms)
values("u1", "3.0780289, 101.60655040000006","3.1615,101.69799999999998","driver", 0);

insert into userdetails(userid, name, phoneno, address) values ("u1","jackson", "012345679", "84,, 60, lorong pjs 10/24a, bandar sunway, 46150 petaling jaya, selangor");

insert into car(userid,cmodel,capacity, platenum,color)
values("u1","myvi", "4", "wre 8907", "yellow");


insert into schedule(userid,day,starttime,endtime) 
values("u2", "mon", "8.40am", "6.00pm");
insert into schedule(userid,day,starttime,endtime) 
values("u2", "tue", "8.40am", "6.00pm");
insert into schedule(userid,day,starttime,endtime) 
values("u2", "wed", "8.40am", "6.00pm");
insert into schedule(userid,day,starttime,endtime) 
values("u2", "thu", "8.40am", "6.00pm");
insert into schedule(userid,day,starttime,endtime) 
values("u2", "fri", "8.40am", "5.00pm");
insert into schedule(userid,day,starttime,endtime) 
values("u2", "sat", "8.40am", "3.00pm");

insert into user(id, departure, arrival, type,currentkms)
values("u2", "3.0756886,101.60675049999998","3.1615,101.69799999999998","rider", 0);

insert into userdetails(userid, name, phoneno, address) values ("u2","peter", "0123478579", "jalan pjs 10/15,bandar sunway,46150 petaling jaya,selangor ");

insert into schedule(userid,day,starttime,endtime) 
values("u3", "mon", "9.00am", "6.00pm");
insert into schedule(userid,day,starttime,endtime) 
values("u3", "tue", "9.00am", "6.00pm");
insert into schedule(userid,day,starttime,endtime) 
values("u3", "wed", "9.00am", "6.00pm");
insert into schedule(userid,day,starttime,endtime) 
values("u3", "thu", "9.00am", "6.00pm");
insert into schedule(userid,day,starttime,endtime) 
values("u3", "fri", "9.00am", "5.00pm");
insert into schedule(userid,day,starttime,endtime) 
values("u3", "sat", "9.00am", "4.00pm");

insert into user(id, departure, arrival, type,currentkms)
values("u3", "3.078338,101.60849659999997","3.1615,101.69799999999998","rider", 0);

insert into userdetails(userid, name, phoneno, address) values ("u3","aiman", "012003219", "jalan pjs 10/32,bandar sunway,46150 petaling jaya,selangor");

insert into schedule(userid,day,starttime,endtime) 
values("u4", "mon", "8.40am", "5.30pm");
insert into schedule(userid,day,starttime,endtime) 
values("u4", "tue", "8.40am", "5.30pm");
insert into schedule(userid,day,starttime,endtime) 
values("u4", "wed", "8.40am", "5.30pm");
insert into schedule(userid,day,starttime,endtime) 
values("u4", "thu", "8.40am", "5.30pm");
insert into schedule(userid,day,starttime,endtime) 
values("u4", "fri", "8.40am", "5.30pm");

insert into user(id, departure, arrival, type,currentkms)
values("u4", "3.075149,101.60616000000005","3.1326988,101.67225259999998","rider", 0);

insert into userdetails(userid, name, phoneno, address) values ("u4","natasha", "014512219", "22 g, jalan pjs 10/22, subang indah, selangor, pjs 10, 46000 petaling jaya, selangor");

insert into schedule(userid,day,starttime,endtime) 
values("u5", "mon", "8.45am", "5.30pm");
insert into schedule(userid,day,starttime,endtime) 
values("u5", "tue", "8.45am", "5.30pm");
insert into schedule(userid,day,starttime,endtime) 
values("u5", "wed", "8.45am", "5.30pm");
insert into schedule(userid,day,starttime,endtime) 
values("u5", "thu", "8.45am", "5.30pm");
insert into schedule(userid,day,starttime,endtime) 
values("u5", "fri", "8.45am", "5.30pm");

insert into user(id, departure, arrival, type,currentkms)
values("u5", "3.0749643,101.6008663","3.1326988,101.67225259999998","rider", 0);

insert into userdetails(userid, name, phoneno, address) values ("u5","dheeno", "0145889219", "jalan pjs 10/7,bandar sunway,46150 petaling jaya,selangor");


insert into schedule(userid,day,starttime,endtime) 
values("u6", "mon", "9.00am", "6.00pm");
insert into schedule(userid,day,starttime,endtime) 
values("u6", "tue", "9.00am", "6.00pm");
insert into schedule(userid,day,starttime,endtime) 
values("u6", "wed", "9.00am", "6.00pm");
insert into schedule(userid,day,starttime,endtime) 
values("u6", "thu", "9.00am", "6.00pm");
insert into schedule(userid,day,starttime,endtime) 
values("u6", "fri", "9.00am", "4.00pm");

insert into user(id, departure, arrival, type,currentkms)
values("u6", "3.0766629,101.60385429999997","3.1326988,101.67225259999998","driver", 0);

insert into userdetails(userid, name, phoneno, address) values ("u6","sonia", "0142682311", "432, jalan pjs 10/9, bandar sunway, 46150 petaling jaya, selangor");

insert into car(userid,cmodel,capacity, platenum,color)
values("u6","alza", "6", "wba 8232", "red");


insert into schedule(userid,day,starttime,endtime) 
values("u7", "mon", "8.50am", "5.30pm");
insert into schedule(userid,day,starttime,endtime) 
values("u7", "tue", "8.50am", "5.30pm");
insert into schedule(userid,day,starttime,endtime) 
values("u7", "wed", "8.50am", "5.30pm");
insert into schedule(userid,day,starttime,endtime) 
values("u7", "thu", "8.50am", "5.30pm");
insert into schedule(userid,day,starttime,endtime) 
values("u7", "fri", "8.50am", "5.30pm");

insert into user(id, departure, arrival, type,currentkms)
values("u7", "3.077537,101.60453800000005","3.1326988,101.67225259999998","rider", 0);

insert into userdetails(userid, name, phoneno, address) values ("u7","chan wong", "016782111", "3a07, block c, pangsapuri ridzuan 3, jalan pjs 10/11, 46000, petaling jaya, selangor");


insert into schedule(userid,day,starttime,endtime) 
values("u8", "mon", "8.35am", "5.30pm");
insert into schedule(userid,day,starttime,endtime) 
values("u8", "tue", "8.35am", "5.30pm");
insert into schedule(userid,day,starttime,endtime) 
values("u8", "wed", "8.35am", "5.30pm");
insert into schedule(userid,day,starttime,endtime) 
values("u8", "thu", "8.35am", "5.30pm");
insert into schedule(userid,day,starttime,endtime) 
values("u8", "fri", "8.35am", "5.30pm");

insert into user(id, departure, arrival, type,currentkms)
values("u8", "3.0741329,101.62934169999994","3.1326988,101.67225259999998","rider", 0);

insert into userdetails(userid, name, phoneno, address) values ("u8","james ooi", "015782111", "no. 77, jalan pjs 10/34, taman sri subang, pjs 10, 46000 petaling jaya, selangor");


insert into schedule(userid,day,starttime,endtime) 
values("u9", "mon", "9.00am", "6.00pm");
insert into schedule(userid,day,starttime,endtime) 
values("u9", "tue", "9.00am", "6.00pm");
insert into schedule(userid,day,starttime,endtime) 
values("u9", "wed", "9.00am", "6.00pm");
insert into schedule(userid,day,starttime,endtime) 
values("u9", "thu", "9.00am", "6.00pm");
insert into schedule(userid,day,starttime,endtime) 
values("u9", "fri", "9.00am", "6.00pm");

insert into user(id, departure, arrival, type,currentkms)
values("u9", "3.0766802,101.60453519999999","3.1326988,101.67225259999998","rider", 0);

insert into userdetails(userid, name, phoneno, address) values ("u9","david james", "016792111", "jalan pjs 10/11a, pjs 10, 46150 petaling jaya, selangor");


insert into schedule(userid,day,starttime,endtime) 
values("u10", "mon", "8.50am", "6.00pm");
insert into schedule(userid,day,starttime,endtime) 
values("u10", "tue", "8.50am", "6.00pm");
insert into schedule(userid,day,starttime,endtime) 
values("u10", "wed", "8.50am", "6.00pm");
insert into schedule(userid,day,starttime,endtime) 
values("u10", "thu", "8.50am", "6.00pm");
insert into schedule(userid,day,starttime,endtime) 
values("u10", "fri", "8.50am", "6.00pm");

insert into user(id, departure, arrival, type,currentkms)
values("u10", "3.0766647,101.60438899999997","3.1326988,101.67225259999998","rider", 0);

insert into userdetails(userid, name, phoneno, address) values ("u10","siva rao", "019792111", "j446, jalan pjs 10/11a, pjs 10, 46150 petaling jaya, selangor");


