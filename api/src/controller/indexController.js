import { Router } from "express";
import { Alterar, AlterarFavorito, Buscar, BuscarFavoritos, BuscarPor, Deletar, Inserir, BuscarPorID } from "../repository/indexRepository.js";


const endpoints = Router()

endpoints.post('/inserir', async (req, resp) => {
    try{
        const musica = req.body
        if(!musica.nome)
            throw new Error('Nome não identificado')
        if(!musica.cantor)
            throw new Error('Cantor não identificado')
        if(!musica.duracao)
            throw new Error('Duração não identificado')
        if(!musica.lancamento)
            throw new Error('Lançamento não identificado')
        
        if(!musica.img)
            throw new Error('Imagem não identificada')
        if(!musica.album)
            throw new Error('Album não identificado')
        if(!musica.genero)
            throw new Error('Gênero não identificado')

        const resposta = await Inserir(musica)

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

endpoints.get('/buscar/:nome', async (req, resp) => {
    try{
        const {nome} = req.params

        if(nome === 'nada'){
            const resposta = await Buscar()
            resp.send(resposta)
        }
        else{
            const respostaPor = await BuscarPor(nome)
            resp.send(respostaPor)
        }
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

endpoints.get('/favoritos', async (req, resp) => {
    try{
        const resposta = await BuscarFavoritos()

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

endpoints.put('/alterar/:id', async (req, resp) =>{
    try{
        const {id} = req.params
        const musica = req.body

        if(!id || isNaN(id))
            throw new Error('ID não identificado')
        if(!musica.nome)
            throw new Error('Nome não identificado')
        if(!musica.cantor)
            throw new Error('Cantor não identificado')
        if(!musica.duracao)
            throw new Error('Duração não identificado')
        if(!musica.lancamento)
            throw new Error('Lançamento não identificado')
        if(!musica.img)
            throw new Error('Imagem não identificada')
        if(!musica.genero)
            throw new Error('Gênero não identificado')

        const resposta = await Alterar(musica, id)

        if(resposta !== 1)
            throw new Error('Não foi possível alterar')
        
        resp.status(204).send()
    }
    catch(err){
        resp.status(500).send(
            console.log(err.message)
        )
    }
})

endpoints.put('/alterar/favorito/:id', async (req, resp) => {
    try{
        const {id} = req.params

        const {valor} = req.body

        if(!id || isNaN(id))
            throw new Error('ID inválido ou indefinido')
        if(valor === '' || valor === undefined)
            throw new Error('Não foi possível identificar se deseja favoritar ou desfavoritar')

        const resposta = await AlterarFavorito(valor, id)
        if(resposta !== 1)
            throw new Error('Não foi possivel favoritar ou desfavoritar')

        resp.status(204).send()
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

endpoints.delete('/deletar/:id', async (req, resp) => {
    try{    
        const {id} = req.params

        if(!id || isNaN(id))
            throw new Error('ID inválido ou não identificado')

        const resposta = await Deletar(id)

        if(resposta !== 1)
            throw new Error('Não foi possível deletar')

        resp.status(204).send()
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

endpoints.get('/procurarId/:id', async (req, resp) => {
    try {
        const {id} = req.params;

        const resposta = await BuscarPorID(id);
        resp.send(resposta);
    } catch (error) {
        resp.status(500).send({
            erro: err.message
        })
    }
})



endpoints.get('/favoritos', async (req, resp) => {
    try{
        const resposta = await BuscarFavoritos()

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

export default endpoints