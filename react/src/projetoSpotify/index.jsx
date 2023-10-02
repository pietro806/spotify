import './index.scss';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Spotify () {

    const [urll, setUrl] = useState('');
    const [nome, setNome] = useState('');
    const [genero, setGenero] = useState('');
    const [autor, setAutor] = useState('');
    const [duracao, setDuracao] = useState('');
    const [lancamento, setLancamento] = useState('');
    const [album, setAlbum] = useState('');
    const [favorito, setFavorito] = useState(false);

    const [pesquisa, setPesquisa] = useState('');
    const [registros, setRegistros] = useState([]);
    const [alterar, setAlterar] = useState(false);
    const [alteracaoID, setAlteracaoID] = useState(0);

    function zerarCampos () {
        setUrl('');
        setNome('');
        setGenero('');
        setAutor('');
        setDuracao('');
        setLancamento('');
        setAlbum('');
    }

    async function adicionarMusica (id) {
        try {
            if(alterar === true) {
                const url = 'http://localhost:5000/alterar/' + id;
                const musica = {
                    id: id,
                    nome: nome,
                    cantor: autor,
                    duracao: duracao,
                    lancamento: lancamento,
                    album: album,
                    img: urll,
                    favorito: favorito,
                    genero: genero
                }
                console.log(url)
                console.log(musica)
                console.log(alterar)
                const resposta = await axios.put(url, musica);
                console.log(resposta)
                setAlterar(false)
                toast.success('Faixa alterada com sucesso!!!');
                pesquisarTodas();
                zerarCampos();
     
            } else if (alterar === false) {
                const info = {
                    id: id,
                    nome: nome,
                    cantor: autor,
                    duracao: duracao,
                    lancamento: lancamento,
                    album: album,
                    img: urll,
                    genero: genero
                }
                const url = 'http://localhost:5000/inserir';
                const resposta = await axios.post(url, info);
        
                zerarCampos();
    
                toast.success('Faixa ' + nome + ' adicionada!')
            }
        } catch (error) {
            toast.error('ocorreu um erro! ' + error)
        }
    }

    async function pesquisarTodas () {
        try {
            if (pesquisa === '') {
                const url = 'http://localhost:5000/buscar/nada';
                const resposta = await axios.get(url);
                setRegistros(resposta.data);
                toast.info('Pesquisando por todos os registros!')
            } else {
                const url = 'http://localhost:5000/buscar/' + pesquisa;

                const resposta = await axios.get(url);
                setRegistros(resposta.data)
            }
        } catch (error) {
            toast.error('ocorreu um erro! ' + error)
        }
    }

    async function deletar (id) {
        try {
            const url = 'http://localhost:5000/deletar/' + id;

            const resposta = await axios.delete(url);

            pesquisarTodas();
        } catch (error) {
            toast.error('ocorreu um erro! ' + error);
        }
    }

    async function favoritar (valor, id) {
        try {
            const url = 'http://localhost:5000/alterar/favorito/' + id;
            const payload = {
                valor: !valor
            }

            const resposta = await axios.put(url, payload);
            setFavorito(!favorito);

            if (favorito === !true) {
                toast.success('Música favoritada com sucesso!');
            } else {
                toast.warn('Musica desfavoritada :(')
            }
            pesquisarTodas();
            } catch (error) {
                toast.error('ocorreu um erro! ' + error);
            }
    }

    async function puxarCampos(id) {
        try {
            const urlBuscar = 'http://localhost:5000/procurarId/' + id;
            const respostaBuscar = await axios.get(urlBuscar);
            const [musica] = respostaBuscar.data;
            console.log(musica)

            setUrl(musica.img);
            setNome(musica.musica);
            setGenero(musica.genero);
            setAutor(musica.cantor);
            setDuracao(musica.duracao);
            setLancamento(musica.lancamento);
            setAlbum(musica.album);
            setAlterar(true);
            setAlteracaoID(id);
        } catch (error) {
            toast.error(error);
        }
    }

    async function buscarFavoritos() {
        try {
            const url = 'http://localhost:5000/favoritos';
            toast.info('Pesquisando apenas pelas músicas favoritadas!')
            const resposta = await axios.get(url);
            setRegistros(resposta.data);
            
            if(registros.length === 0) throw new Error('Não há nenhuma música favorita!');
        } catch (error) {
            toast.error(error)
        }
        
    }

    return(
        <main className='spotify'>
            <ToastContainer />
            <header><img src="https://seeklogo.com/images/S/spotify-logo-7839B39C1B-seeklogo.com.png" alt="" style={{height: '60px'}}/></header>
            <article className='corpo-site'>
                <section className="cadastroMusica">
                    <div className='titulo'>
                        <img src="/dropdown" alt="" />
                        <h1>Cadastre uma música</h1>
                        <img src="/dropdown.png" alt="" />
                    </div>
                    <hr style={{width: '95%'}}/>
                    <article className='formulario'>
                        <input type="text" placeholder='INSIRA A URL DA IMAGEM!' value={urll} onChange={e => setUrl(e.target.value)}/>
                        <section className='campo-inputs'>
                            <div>
                                <input type="text" placeholder='Título' value={nome} onChange={e => setNome(e.target.value)}/>
                                <input type="text" placeholder='Autor' value={autor} onChange={e => setAutor(e.target.value)}/>
                                <input type="text" placeholder='Gênero' value={genero} onChange={e => setGenero(e.target.value)}/>
                            </div>
                            <div>
                                <input type="text" placeholder='Duração' value={duracao} onChange={e => setDuracao(e.target.value)}/>
                                <input type="text" placeholder='Data de lançamento' value={lancamento} onChange={e => setLancamento(e.target.value)}/>
                                <input type="text" placeholder='Álbum'value={album} onChange={e => setAlbum(e.target.value)}/>
                            </div>
                        </section>
                        <div className='salvar' onClick={() => {adicionarMusica(alteracaoID)}}>
                            <p>{alterar ? 'Alterar Faixa' : 'Adicionar Música'}</p>
                        </div>
                    </article>
                    </section>

                    <div className='pesquisa'>
                        <input type="text" placeholder='Busque por uma música' value={pesquisa} onChange={e => setPesquisa(e.target.value)}/>
                        <img src="https://imgs.search.brave.com/AtCcj-NTu0mhX52F6FT5TyLxZSenrH-jnGb7jpgIf0M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS81/MTIvNjQvNjQ2NzMu/cG5n" onClick={pesquisarTodas} alt="" />
                        <img src="/coracaoverde.svg" alt="" style={{marginLeft: '15px'}} className='favoritoss' onClick={buscarFavoritos}/>
                    </div>
                    
                    <section className="tabela-musicas">
                        {registros.map(item => {
                            return (
                                <article className="musica">
                                    <div className='titulo-descricao'>
                                        <h1>{item.musica}</h1>
                                        <div className='descricao-musica'>
                                            <p>{item.cantor}</p>
                                            <p>{item.lancamento}</p>
                                            <p>{item.duracao}</p>
                                        </div>
                                        <p>{item.genero}</p>
                                        <div className="icones">
                                            <img src="/alterar.png" alt="" onClick={() => {puxarCampos(item.id)}}/>
                                            <img src="/deletar.png" alt="" onClick={() => {deletar(item.id)}} />
                                            {}
                                            <img src={item.favorito ? "/coracaoverde.svg" : "/coracao2.svg"} style={{color: 'green'}} alt="" className='coracao' onClick={() => favoritar(favorito, item.id)}/>
                                        </div>
                                    </div>
                                    <div className='outraDivisao'>
                                            <p><b>{item.album}</b></p>
                                        <img src={item.img} alt="" />
                                    </div>
                                </article>
                            )
                        })}
                    </section>
            </article>
        </main>
    )
}