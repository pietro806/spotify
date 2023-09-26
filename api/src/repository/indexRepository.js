import conexao from "./connection.js"



export async function Inserir(musica){
    const sql = `insert into tb_musica(nm_musica, nm_cantor, ds_duracao, dt_lancamento, img_musica, bt_favorito, ds_album, ds_genero)
                    values(?, ?, ?, ?, ?, ?, ?, ?)`
    
    const [resp] = await conexao.query(sql, [musica.nome, musica.cantor, musica.duracao, musica.lancamento, musica.img, musica.favorito, musica.album, musica.genero])

    musica.id = resp.insertId

    return musica
}

export async function Buscar(){
    const sql = `select id_musica       as id
                        nm_musica		as musica,
        	            nm_cantor		as cantor,
                        ds_duracao		as duracao,
                        dt_lancamento	as lancamento,
                        img_musica		as img,
                        bt_favorito		as favorito,
                        ds_album		as album,
                        ds_genero		as genero
                        from tb_musica`

    const [resp] = await conexao.query(sql)

    return resp
}

export async function BuscarPor(nome) {
    const sql = `select  id_musica      as id
                         nm_musica		as musica,
        	             nm_cantor		as cantor,
                         ds_duracao		as duracao,
                         dt_lancamento	as lancamento,
                         img_musica		as img,
                         bt_favorito	as favorito,
                         ds_album		as album,
                         ds_genero		as genero   
                   from	 tb_musica
                  where	 nm_musica like ?
                     or  ds_genero like ?`

    const [resp] = await conexao.query(sql, [`%${nome}%`, `%${nome}%`])

    return resp
}

export async function Alterar(musica, id){
    const sql = `update tb_musica
                    set	nm_musica     = ?,
                        nm_cantor     = ?,
                        ds_duracao    = ?,
                        dt_lancamento = ?,
                        img_musica    = ?,
                        bt_favorito   = ?,
                        ds_album	  = ?,
                        ds_genero	  = ?
                  where id_musica     = ?`

    const [resp] = await conexao.query(sql, [musica.nome, musica.cantor, musica.duracao, musica.lancamento, musica.img, musica.favorito, musica.album, musica.genero, id])

    return resp.affectedRows
}

export async function Deletar(id){
    const sql = `delete 
                   from tb_musica
                  where id_musica = ?`

    const [resp] = await conexao.query(sql, [id])

    return resp.affectedRows
}