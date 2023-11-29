import './index.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Spotify () {

    const [urll, setUrl] = useState('');
    const [nome, setNome] = useState('');
    const [genero, setGenero] = useState('');
    const [autor, setAutor] = useState('');
    const [duracao, setDuracao] = useState('');
    const [lancamento, setLancamento] = useState('');
    const [album, setAlbum] = useState('');

    const [exibir, setExibir] = useState(false);


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
                    genero: genero
                }
        
                const resposta = await axios.put(url, musica);
                setAlterar(false)
                toast.success('Faixa alterada com sucesso!!!');

                const urlBuscar = 'http://localhost:5000/procurarId/' + id;
                const respostaBuscar = await axios.get(urlBuscar);
                const [musicax] = respostaBuscar.data;
                setRegistros([musicax]);
                
                // pesquisarTodas();
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
                pesquisarTodas();
                toast.success('Faixa ' + nome + ' adicionada!')
            }
        } catch (error) {
            toast.error(error.response.data.erro);
        }
    }

    async function pesquisarTodas () {
        try {
            if (pesquisa === '') {
                const url = 'http://localhost:5000/buscar/nada';
                const resposta = await axios.get(url);
                setRegistros(resposta.data);
                // toast.info('Pesquisando por todos os registros!')
            } else {
                const url = 'http://localhost:5000/buscar/' + pesquisa;

                const resposta = await axios.get(url);
                setRegistros(resposta.data)
            }
        } catch (error) {
            toast.error('ocorreu um erro! ' + error)
        }
    }

    async function deletar (id, nome) {

        confirmAlert({
            title: 'Excluir música',
            message: 'Tem certeza que deseja remover a faixa ' + nome + '?',
            buttons: [
              {
                label: 'Sim',
                onClick: async () => {
                  try {
                    const url = 'http://localhost:5000/deletar/' + id;
                    const resposta = await axios.delete(url);
                    setRegistros([]);
                    toast.success('Faixa deletada com sucesso!');
                  }
                  catch (err) {
                    toast.error('ocorreu um erro! ' + err.response.data.erro);
                  }
                }
              },
              {
                label: 'Não'
              }
            ]
          });
        }

    async function favoritar (valor, id) {
        try {
            const url = 'http://localhost:5000/alterar/favorito/' + id;
            const payload = {
                valor: !valor
            }

            const resposta = await axios.put(url, payload);
            // setFavorito(!valor);

            if (payload.valor === true) {
                toast.success('Música favoritada com sucesso!');
            } else {
                toast.warn('Musica desfavoritada :(')
            }
            pesquisarTodas();
            } catch (error) {
                toast.error('Ocorreu um erro: ');
                        }
    }

    function puxarCampos(item) {

            setUrl(item.img);
            setNome(item.musica);
            setGenero(item.genero);
            setAutor(item.cantor);
            setDuracao(item.duracao.substr(3, 7));
            setLancamento(item.lancamento.substr(0, 10));
            setAlbum(item.album);
            setAlterar(true);
            setAlteracaoID(item.id);
       
    }

    async function buscarFavoritos() {
        try {
            const url = 'http://localhost:5000/favoritos';
            const resposta = await axios.get(url);
            setRegistros(resposta.data);
            
            if(registros.length === 0) throw new Error('Não há nenhuma música favorita!');
        } catch (error) {
            toast.error(error)
        }
        
    }

    function exibicao () {
        setExibir(!exibir)
        console.log(exibir)
    }
    
    useEffect(() => {
        buscarFavoritos()
    }, [])


    return(
        <main className='spotify'>
            <ToastContainer />
            <header><img src="https://seeklogo.com/images/S/spotify-logo-7839B39C1B-seeklogo.com.png" alt="" style={{height: '60px'}}/></header>
            <article className='corpo-site'>
                <section className="cadastroMusica">
                    <div className='titulo' >
                        <img src="dadf" alt="" />
                        <h1>Cadastre uma música</h1>
                        <input type="checkbox" id="checkbox" style={{display: 'none'}}></input>
                        <label for="checkbox">
                            <img src="/dropdown.png" alt="" onClick={exibicao}/>
                        </label>
                    </div>
                    {exibir 
                    ? <article className='formulario'>
                    <hr style={{width: '115%'}}/>

                        <input type="text" placeholder='Insira a url da imagem do álbum' value={urll} onChange={e => setUrl(e.target.value)}/>
                        <section className='campo-inputs'>
                            <div>
                                <div>
                                    <h4> Título </h4>                                    
                                    <input type="text" placeholder='ex.: Heavydirtysoul' value={nome} onChange={e => setNome(e.target.value)}/>
                                </div>
                                <div>
                                    <h4> Autor </h4>
                                    <input type="text" placeholder='ex.: Twenty one Pilots' value={autor} onChange={e => setAutor(e.target.value)}/>
                                </div>
                                <div>
                                    <h4> Gênero </h4>
                                    <input type="text" placeholder='ex.: Rock/Indie' value={genero} onChange={e => setGenero(e.target.value)}/>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h4> Duração </h4>
                                    <input type="text" placeholder='ex.: 04:53' value={duracao} onChange={e => setDuracao(e.target.value)}/>
                                </div>
                                <div>
                                    <h4>Data de lançamento</h4>
                                    <input type="text" placeholder='ex.: 2022/03/19' value={lancamento} onChange={e => setLancamento(e.target.value)}/>
                                </div>
                                <div>
                                    <h4>Álbum</h4>
                                    <input type="text" placeholder='ex.: Blurryface' value={album} onChange={e => setAlbum(e.target.value)}/>
                                </div>
                            </div>
                        </section>
                        <div className='salvar' onClick={() => {adicionarMusica(alteracaoID)}}>
                            <p>{alterar ? 'Alterar Faixa' : 'Adicionar Música'}</p>
                        </div>
                    </article> 
                    : <></>}
                   
                    
                </section>

                    <div className='pesquisa'>
                        <input type="text" placeholder='Busque por uma música' value={pesquisa} onChange={e => setPesquisa(e.target.value)}/>
                        <img src="https://imgs.search.brave.com/AtCcj-NTu0mhX52F6FT5TyLxZSenrH-jnGb7jpgIf0M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS81/MTIvNjQvNjQ2NzMu/cG5n" onClick={pesquisarTodas} alt="" />
                        <img src="/coracaoverde.svg" alt="" style={{marginLeft: '15px'}} className='favoritoss' onClick={buscarFavoritos}/>
                    </div>
                    
                    <section className="tabela-musicas">
                        {registros.length !== 0 
                        ? registros.map(item => {
                            return (
                                <article className="musica">
                                    <div className='titulo-descricao'>
                                        <h1>{item.musica}</h1>
                                        <div className='descricao-musica'>
                                            <p>{item.cantor}</p>
                                            <p>{item.lancamento.substr(0, 10)}</p>
                                            <p>{item.duracao.substr(3, 7)}</p>
                                        </div>
                                        <p>{item.genero}</p>
                                        <div className="icones">
                                            <img src="/alterar.png" alt="" onClick={() => {puxarCampos(item)}}/>
                                            <img src="/deletar.png" alt="" onClick={() => {deletar(item.id, item.musica)}} />
                                            <img src={item.favorito ? "/coracaoverde.svg" : "/coracao2.svg"} style={{color: 'green'}} alt="" className='coracao' onClick={() => favoritar(item.favorito, item.id)}/>
                                        </div>
                                    </div>
                                    <div className='outraDivisao'>
                                            <p><b>{item.album}</b></p>
                                        <img src={item.img} alt="" />
                                    </div>
                                </article>
                            )
                        })

                        : <main className='sem-musicas'>
                            <img src="/adicionarMusica.png" style={{width: '150px', marginTop: '-30px'}} alt="" />
                            <h1>Nenhuma música selecionada no momento</h1>
                          </main>
                        }
                    </section>
            </article>
        </main>
    )
}