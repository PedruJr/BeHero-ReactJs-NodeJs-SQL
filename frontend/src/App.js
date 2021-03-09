import React from 'react';
import Routes from './routes';

import './global.css';
/* componente: função que retorna html
   - JSX: html dentro do javascrip
   - props.children: conteudo dentro das tags component react 
   -  props: fica nos parametros, são os atribudos das tags react
   > voce pode fazer uma desestruturação das props nos proprios paramentro { atribute, atribute}
   > assim você tem mais clareza no desenvolvimento do metodo
   - estado: utilizamos para manipular dados e atualizar o render com estas informações caso manipuladas
   > podemos utilisar variaveis = useState(0) (retorna um array o primeiro valor é o decidido, o segundo é uma função para alterar a função)
   >EXEMPLO: const [counter(armazena a var), setCounter(muda a var dps) = setState(0)]
   > valores do estado sao imutaveis, precisam ser sobrepostos
   - CTRL SHIFT P + settigs.json > emmet.syntax e emmet.include lenguages emmet para auto criação de elements
   - Fazer as rotas do react > npm install react-router-dom
   */

   /*usamos o npm install explo-cli para fazer a transição react-native */

function App() {
  return (
    <Routes /> 
  );
}

export default App;
