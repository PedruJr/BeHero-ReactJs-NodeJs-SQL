import React,{useState} from 'react';
import {FiLogIn} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';/* este substitui o A(de link) por <Link to="src> assim a pagina nao recarregara. */

import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';



/*lembrando que o react possui pacote de icones, npm install react-icons */

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(event) {
        event.preventDefault();

        try {
            const response = await api.post('sessions', {id});
            alert(`Login realizado com sucesso!`);
            history.push('/profile');

            localStorage.setItem('ongId',id);
            localStorage.setItem('ongName', response.data.nome);
            console.log();
            /*precisamos armazenar as informaçoes do login usamos local storage */
        } catch(erro) {
            alert(`Falha ao realizar o login, tente novamente.`);
            console.log(erro);
        };
        
    }
    

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="logo"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>

                    <input 
                    placeholder=" Sua ID"
                    value={id}
                    onChange={ e => setId(e.target.value)}
                     />
                     
                    <button className="button" type="submit">Entrar</button>

                    <Link className='link' to='/register'>
                        <FiLogIn size={16} color="#E02041" />
                        Cadastrar ONG...
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="heroes" />
        </div>
    );
} 