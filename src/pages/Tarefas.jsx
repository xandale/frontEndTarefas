import { useState, useEffect } from "react";
import axios from 'axios';
import '../styles/Pages.css';

function Tarefas() {
    const [tarefas, setTarefas] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [prioridade, setPrioridade] = useState('Média');
    const [status, setStatus] = useState('pendente');

    const [idDaTarefa, setIdDaTarefa] = useState(null);
    const [novoTitulo, setNovoTitulo] = useState('');
    const [novaDescricao, setNovaDescricao] = useState('');
    const [novaPrioridade, setNovaPrioridade] = useState('Média');
    const [novoStatus, setNovoStatus] = useState('pendente');

    const [filtroStatus, setFiltroStatus] = useState('');
    const [filtroPrioridade, setFiltroPrioridade] = useState('');

    async function deletarTarefa(id) {
        try {
            const url = `http://localhost:3000/tarefas/${id}`;
            const token = localStorage.getItem("token");

            await axios.delete(url, {
                headers: { Authorization: `Bearer ${token}` }
            });

            buscarTarefas();
        } catch (erro) {
            console.error("Erro ao excluir tarefa:", erro);
        }
    }

    async function salvarEdicao(id) {
        try {
            const url = `http://localhost:3000/tarefas/${id}`;
            const token = localStorage.getItem("token");

            await axios.put(url, {
                titulo: novoTitulo,
                descricao: novaDescricao,
                prioridade: novaPrioridade,
                status: novoStatus
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setIdDaTarefa(null);
            buscarTarefas();
        } catch (erro) {
            console.error("Erro ao atualizar tarefa:", erro);
        }
    }

    const criarTarefa = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:3000/tarefas";
            const token = localStorage.getItem("token");

            await axios.post(url, {
                titulo,
                descricao,
                prioridade,
                status
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setTitulo('');
            setDescricao('');
            setPrioridade('Média');
            setStatus('pendente');
            buscarTarefas();
        } catch (erro) {
            console.error("Erro ao criar tarefa:", erro);
        }
    }

    async function buscarTarefas() {
        try {
            const token = localStorage.getItem("token");

            const params = {};
            if (filtroStatus) params.status = filtroStatus;
            if (filtroPrioridade) params.prioridade = filtroPrioridade;

            const retorno = await axios.get("http://localhost:3000/tarefas", {
                headers: { Authorization: `Bearer ${token}` },
                params
            });

            setTarefas(retorno.data);
        } catch (erro) {
            console.error("Erro ao buscar tarefas:", erro);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            buscarTarefas();
        }
    }, [filtroStatus, filtroPrioridade]);

    return (
        <div className="container">
            <h2>Criar nova tarefa</h2>
            <form onSubmit={criarTarefa} className="form">
                <input
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />
                <label>Prioridade:</label>
                <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                </select>
                <label>Status:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="pendente">Pendente</option>
                    <option value="em andamento">Em andamento</option>
                    <option value="concluída">Concluída</option>
                </select>
                <button type="submit">Criar</button>
            </form>

            <h2>Filtros</h2>
            <div className="filtros">
                <label>Status:</label>
                <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
                    <option value="">Todos os Status</option>
                    <option value="pendente">Pendente</option>
                    <option value="em andamento">Em andamento</option>
                    <option value="concluída">Concluída</option>
                </select>
                <label>Prioridade:</label>
                <select value={filtroPrioridade} onChange={(e) => setFiltroPrioridade(e.target.value)}>
                    <option value="">Todas as Prioridades</option>
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                </select>
                <button onClick={buscarTarefas}>Buscar</button>
            </div>

            <h2>Suas Tarefas</h2>
            {tarefas.length > 0 ? (
                tarefas.map((item) => (
                    <div className="tarefa" key={item.id}>
                        {item.id === idDaTarefa ? (
                            <>
                                <label htmlFor={`titulo-${item.id}`}>Título:</label>
                                <input
                                    id={`titulo-${item.id}`}
                                    type="text"
                                    placeholder="Novo título"
                                    value={novoTitulo}
                                    onChange={(e) => setNovoTitulo(e.target.value)}
                                />

                                <label htmlFor={`descricao-${item.id}`}>Descrição:</label>
                                <textarea
                                    id={`descricao-${item.id}`}
                                    placeholder="Nova descrição"
                                    value={novaDescricao}
                                    onChange={(e) => setNovaDescricao(e.target.value)}
                                />

                                <label htmlFor={`prioridade-${item.id}`}>Prioridade:</label>
                                <select
                                    id={`prioridade-${item.id}`}
                                    value={novaPrioridade}
                                    onChange={(e) => setNovaPrioridade(e.target.value)}
                                >
                                    <option value="Baixa">Baixa</option>
                                    <option value="Média">Média</option>
                                    <option value="Alta">Alta</option>
                                </select>

                                <label htmlFor={`status-${item.id}`}>Status:</label>
                                <select
                                    id={`status-${item.id}`}
                                    value={novoStatus}
                                    onChange={(e) => setNovoStatus(e.target.value)}
                                >
                                    <option value="pendente">Pendente</option>
                                    <option value="em andamento">Em andamento</option>
                                    <option value="concluída">Concluída</option>
                                </select>

                                <button onClick={() => salvarEdicao(item.id)}>Salvar</button>
                                <button onClick={() => setIdDaTarefa(null)}>Cancelar</button>
                            </>
                        ) : (
                            <>
                                <p><strong>Título:</strong> {item.titulo}</p>
                                <p><strong>Descrição:</strong> {item.descricao}</p>
                                <p><strong>Prioridade:</strong> {item.prioridade}</p>
                                <p><strong>Status:</strong> {item.status}</p>
                                <button onClick={() => {
                                    setIdDaTarefa(item.id);
                                    setNovoTitulo(item.titulo);
                                    setNovaDescricao(item.descricao);
                                    setNovaPrioridade(item.prioridade);
                                    setNovoStatus(item.status);
                                }}>Atualizar</button>
                                <button onClick={() => deletarTarefa(item.id)}>Excluir</button>
                            </>
                        )}
                    </div>
                ))
            ) : (
                <p>Nenhuma tarefa encontrada.</p>
            )}
        </div>
    );
}

export default Tarefas;
