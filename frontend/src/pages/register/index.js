import React, {useState} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi'; /* no site pegamos os nomes dos icones que instalamos com react-icons, depois carregamos eles apenas com o nome */
import {Link, useHistory} from 'react-router-dom'; /*utilizamos o use history no final do metodo handler para devolver a pagina inicial caso de certo */
import api from '../../services/api'; /*para utilização de metodos para o backend (get, post, etc) */


/*primeiros resolvemos a estrutura html, depois o css */
export default function Register() {
/* Para registrar os valores no react utilizamos STATE, entao importaremos o use state do react {useState}

*/
const [nome, setNome] = useState('');
const [email, setEmail] = useState('');
const [whatsapp, setWhatsapp] = useState('');
const [city, setCity] = useState('');
const [uf, setUf] = useState('');

const history = useHistory();



    /*agora usaremos a API para registrar os valores com uma função
    que ficara no onSubmit do nosso <form> 
    lembrar que nos submits o event é enviado por parametro e precisamos colocar prevent default nas aplcações SPA*/
    async function handleRegister(event){
        
        event.preventDefault();

        const data = {
            nome,
            email,
            whatsapp,
            city,
            uf
        };

        try {
            const response = await api.post('ongs', data);
            alert(`Cadastrado com sucesso, salve sua ID: ${response.data.id}`);
            history.push('/');
        }
        catch(erro){
            alert(`Erro no cadastro, tente novamente.`);
            history.push('/');
            
        }
    };


    return(
        <div className='register-container'>
            <div className='register-content'>
                <section>
                    <img src={logoImg} alt="logo"/>
                    <p>Faça seu cadastro entre na plataforma
                       e ajuda as pessoas a encontrar casos de sua ong
                    </p>
                    <Link class='link' to='/'>
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para a pagina de login
                    </Link>

                </section>

                
                <form onSubmit={handleRegister}>

                    <input 
                     placeholder="Nome da ONG" 
                     value={nome}
                     onChange={ e => setNome(e.target.value)}
                    />

                    <input 
                     type="email" placeholder="E-mail" 
                     value={email}
                     onChange={ e => setEmail(e.target.value)}
                     />

                    <input 
                     placeholder="WhatsApp" 
                     value={whatsapp}
                     onChange={ e => setWhatsapp(e.target.value)} 
                     />

                    <div className="input-group">
                        <input 
                        placeholder="Cidade"
                        value={city}
                        onChange={ e => setCity(e.target.value)}
                        />

                        <input
                         placeholder="UF"
                         style={{ width: 80 }}
                         value={uf}
                         onChange={ e => setUf(e.target.value)}
                         />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>


            
        </div>
    )
}