import React, {useState} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi'; /* no site pegamos os nomes dos icones que instalamos com react-icons, depois carregamos eles apenas com o nome */
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';


/*primeiros resolvemos a estrutura html, depois o css */
export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(event){
        event.preventDefault();

        const data = {
            title,
            description,
            value,
        };
        try{
            await api.post('incidents', data, {
                headers: {
                Authorization: ongId,
                }
            })
            history.push('/profile')
        }catch(erro){
            alert('Erro ao cadastrar caso, tente novamente.')
        }
    }

    return(
        <div className='newIncident-container'>
            <div className='newIncident-content'>
                <section>
                    <img src={logoImg} alt="logo"/>
                    <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso.</p>
                    <Link className='link' to='/profile'>
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para a home
                    </Link>

                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                    placeholder="Titulo do caso" 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    />
                    <textarea  
                    placeholder="Descrição..." 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                    placeholder="Valor em reais" 
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>


            
        </div>
    )
}