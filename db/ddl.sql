create database spotify_db;

use spotify_db;

create table tb_musica(
id_musica		int primary key auto_increment,
nm_musica		varchar(200),
nm_cantor		varchar(200),
ds_duracao		time,
dt_lancamento	date,
img_musica		varchar(1800),
bt_favorito		boolean,
ds_album		varchar(200),
ds_genero		varchar(200)
);
