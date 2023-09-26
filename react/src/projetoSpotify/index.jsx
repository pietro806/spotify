import './index.scss';
import { useState } from 'react';

export default function Spotify () {

    const [nome, setNome] = useState('');
    const [genero, setGenero] = useState('');


    return(
        <main className='spotify'>
            <header><img src="/logo.png" alt="" /></header>
            <article className='corpo-site'>
                <section className="cadastroMusica">
                    <div className='titulo'>
                        <h1>Cadastre uma música</h1>
                        <img src="/dropdown.png" alt="" />
                    </div>
                    <article className='formulario'>
                        <input type="text" placeholder='INSIRA A URL DA IMAGEM!'/>
                        <section className='campo-inputs'>
                            <div>
                                <input type="text" placeholder='Título'/>
                                <input type="text" placeholder='Autor'/>
                                <input type="text" placeholder='Gênero'/>
                            </div>
                            <div>
                                <input type="text" placeholder='Duração'/>
                                <input type="text" placeholder='Lançamentos'/>
                                <input type="text" placeholder='Álbum'/>
                            </div>
                        </section>
                        <div className='favoritos'>
                        <label htmlFor="">Adicionar aos favoritos</label><input type="radio" name="" id="" />

                        </div>
                    </article>
                    </section>

                    <div className='pesquisa'>
                        <input type="text" placeholder='Busque por uma música'/>
                        <img src="/lupa.png" alt="" />
                    </div>
                    
                    <section className="tabela-musicas">
                        <article className="musica">
                            <div className='titulo-descricao'>
                                <h1>Overthink</h1>
                                <div className='descricao-musica'>
                                    <p>Puzzle</p>
                                    <p>02/03/2023</p>
                                    <p>01:51</p>
                                </div>
                            </div>
                            <div className='outraDivisao'>
                                <div className='album-genero'>
                                    <p><b>XHAIL</b></p>
                                    <p>Indie/alternativa</p>
                                </div>
                                <img src="/capaalbum.png" alt="" />
                                <div className='alteracao-deletar'>
                                    <img src="/alterar.png" alt="" />
                                    <img src="/deletar.png" alt="" />
                                </div>
                            </div>
                        </article>
                    </section>
            </article>
        </main>
    )
}