import React,{useEffect, useState} from 'react'; /* dispara funções em momentos do componente(como assim que ele´é colocado em tela*/
import {Link,useHistory} from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import './styles.css';
import {FiPower, FiTrash2} from 'react-icons/fi';
import api from '../../services/api';

export default function Profile() {
    /*utilizamos localStorage.getItem para dar get no item salvo anteriormenten no logon */
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    /*2 parametros, função exercida e estados dentro do array, toda vez que ocorre alteração no array o stado é atualizado 
    uma função que recebe dois parametros, a função e suas dependencias, neste caso é passado uma função de get, que possui outros dois paramentros
    o caminho a ser feito e a identificação para requisição*/
    useEffect( () => {
        api.get('profile', {
            headers: { 
                Authorization: ongId,
            }
        }).then(response =>{
            setIncidents(response.data);
        })
    },
     [ongId]);

     async function handleDelete(id) {
         
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            }).then( response => {
                console.log(response);
            });
            /*setIncidents atualizando apos deletar os incidents */
            setIncidents(incidents.filter( incident => incident.id !== id));
        }catch(erro) {
            alert('Erro ao deleter caso,tente novamente.');
        }

     }
     /*Lidar com o LogOut */
     function handleLogout() {
         localStorage.clear();
         history.push('/');
         alert('Obrigado pela visita! volte sempre.');
     }


    return(
        <div className='profile-container'>
            <header>
                <img src={logoImg} alt='BeHeroLogo' />
                <span>Bem Vinda, {ongName}</span>

                <Link  className='button' to='/incidents/new'> Cadatrar caso</Link>
                <button onClick={() => handleLogout()} type='button'><FiPower size={18} color="#E02041"/> </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {/*nos componenetes listas precisamo colocar a identificação unica de  cada componente para que não tenha enganos */
                incidents.map( incident => (
                    <li key={incident.id}> 
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p> {`R$${incident.value}`}</p>
                   
                    <button onClick={() => handleDelete(incident.id)} type='button'>
                        <FiTrash2 size={20} color="a8a8b3" />
                    </button>
                </li>
                ))}
          
            </ul>
            <div className='profile-content'>
                
            </div>
        </div>
    );
}