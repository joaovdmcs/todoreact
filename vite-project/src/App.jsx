import { useState } from 'react'

/* Programa de uma lista de tarefas que: Registra, remove, filtra (atividades completas e incompletas) e busca atividades
utilizando React e Vite */

import Todo from "./components/Todo"
import TodoForm from "./components/TodoForm"
import Search from "./components/Search"
import Filter from "./components/Filter"
import "./App.css"
/* Import de blocos de códigos para separação de App.jsx
	São importados blocos das atividades indivudais (todo), formulario para adição de uma nova atividade (todoform), bloco de busca (search) e filtragem (filter).
*/

/* Função principal que contem exemplares de atividades.
	addTodo(função seta) adiciona uma nova atividade (com parametros referentes ao titulo e outro à categoria) ao conjunto de atividades e lhe confere um ID random assim como um status não completo inicial.
	removeTodo, de forma semelhante à função anterior, remove uma atividade do conjunto. Por cada atividade ter seu proprio botão de remoção, a lógica consiste em remover no evento de tal botão ser clicado.
	completarTodo muda o status de uma atividade para outro (o inverso do status atual) por meio do id. Semelhante a removeTodo, cada atividade possui seu proprio botão para tal.
	
	const search realiza a busca de uma atividade. O funcionamento na verdade consiste na utilização de filter para mostrar apenas atividades que possuem strings digitadas no campo de busca.
	const filter é semelhante à const anterior mas apenas filtra em atividades completas, não completas e todas as atividades.
	
	
*/
function App() {
	const[todos, setTodos] = useState([
	{
		id: 1,
		text: "Criar funcionalidade x no sistema",
		category: "(Trabalho)",
		isCompleted: false,
		
	},
	{
		id: 2,
		text: "Academia",
		category: "(Pessoal)",
		isCompleted: false,
	},
	{
		id:3,
		text: "Estudar React",
		category: "(Estudos)",
		isCompleted: false,
	},
	]);
	
	const addTodo = (text,category) => {
		
		const newTodos = [...todos,{
			id: Math.floor(Math.random() * 10000),
			text,
			category,
			isCompleted: false,
			},
		];
		setTodos(newTodos);
	};
	
	const removeTodo = (id) => {
		const newTodos = [...todos]
		const filteredTodos = newTodos.filter(todo => 
		todo.id !== id ? todo : null );
		setTodos(filteredTodos);
	};
	
	const completarTodo = (id) => {
		const newTodos = [...todos]
		newTodos.map((todo) => todo.id == id ? todo.isCompleted = !todo.isCompleted: todo);
		setTodos(newTodos);
	};
	
	const[search,setSearch] = useState("");
	const[filter,setFilter] = useState("All");
	
	/* Bloco de lógica principal para ilustração das atividades. São realizadas, no caso da filtragem e busca, utilizações de filter() para simplificação
	do código a nivel de componentes.
	
	*/
  return <div className="app">
	<h1>Lista de Tarefas</h1>
		<Search search={search} setSearch={setSearch}/>
		<Filter filter={filter} setFilter={setFilter}/>
		<div className="todo-list">
		{todos
		.filter((todo)=> 
		filter === "All" ? true 
		:filter === "Completed" ? todo.isCompleted
		:!todo.isCompleted)
		.filter((todo)=> 
		todo.text.toLowerCase().includes(search.toLowerCase()))
		.map(todo => (
			<Todo key={todo.id} todo={todo} removeTodo = {removeTodo} completarTodo={completarTodo}/>
		))}
		</div>
		<TodoForm addTodo={addTodo}/>
	</div>;
}

export default App
