create table player (
	player_id VARCHAR(20),
    player_password VARCHAR(255) not null,
    salt VARCHAR(50) not null,
    nickname VARCHAR(15) not null,
    age INT not null,
    money INT DEFAULT 0,
	primary key(player_id)
);

select * from player;


insert into player VALUES ('test', '1234', 'salt', '테스트유저', 10,0);