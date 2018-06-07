drop database if exists chat_server;
create database chat_server;
use chat_server;

create table user(
	id int not null auto_increment,
    username nvarchar(10),
    password nvarchar(256),
    primary key(id)
);

create table message(
	id int not null auto_increment,
    content text not null,
    sent_id int not null,
    receive_id int not null,
    primary key(id)
);