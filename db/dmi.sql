
-- Inserir
insert into tb_musica(nm_musica, nm_cantor, ds_duracao, dt_lancamento, img_musica, bt_favorito, ds_album, ds_genero)
                    values('teste', 'teste', '00:02:30', '2023-06-19', 'teste', true, 'teste', 'teste');

-- Buscar
select 	id_musica       as id,
		nm_musica		as musica,
		nm_cantor		as cantor,
		ds_duracao		as duracao,
		dt_lancamento	as lancamento,
		img_musica		as img,
		bt_favorito		as favorito,
		ds_album		as album,
		ds_genero		as genero
		from tb_musica;

-----
select  id_musica       as id,
		nm_musica		as musica,
		nm_cantor		as cantor,
		ds_duracao		as duracao,
	    dt_lancamento	as lancamento,
		img_musica		as img,
		bt_favorito	    as favorito,
		ds_album		as album,
		ds_genero		as genero   
  from	tb_musica
 where	nm_musica like 'dança'
    or  ds_genero like 'dnaça';

----
select	id_musica       as id,
		nm_musica   	as musica,
		nm_cantor       as cantor,
		ds_duracao      as duracao,
		dt_lancamento   as lancamento,
		img_musica      as img,
		bt_favorito     as favorito,
		ds_album        as album,
		ds_genero       as genero
  from tb_musica
 where bt_favorito     = true;

-- Alterar
update  tb_musica
   set  nm_musica     = 'teste1',
        nm_cantor     = 'teste1',
        ds_duracao    = '00:00:00',
        dt_lancamento = '2023-02-16',
        img_musica    = 'teste1',
        bt_favorito   = false,
        ds_album	  = 'testse1',
        ds_genero	  = 'teste1'
 where  id_musica     = 1;
-----
update tb_musica
   set bt_favorito = false
 where id_musica = 3;


-- Deletar
delete 
  from tb_musica
 where id_musica = 1