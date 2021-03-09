/*Neste arquivo configuramos apos instalar o npm install axios*/
import axios from 'axios';

/*criamos a const api para configurar o axios,
começamos colocando a baseURL (endereço que sempre se repete) */

const api = axios.create({
    baseURL: 'http://localhost:3333',
})

export default api;
