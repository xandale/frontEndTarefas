    import { useState } from "react";
    import { useNavigate } from "react-router-dom";

    function Login() {
        const [email, setEmail] = useState('');
        const [senha, setSenha] = useState('');
        const navigate = useNavigate();
        // consoles para fins de testes 

            // loguin de teste
            // // "email":"teste@email.com",
        // "senha":"1234"
    
    async function handleSubmit (event) {
        event.preventDefault(); 
        try {
            const resposta = await fetch('https://api-tarefas-20dr.onrender.com/login',{
                method: 'Post',
                headers:{
                    'Content-Type': 'application/json',  // Define que os dados enviados são JSON'
                },
                body: JSON.stringify({
                    email,
                    senha
                })
            });
            const dados = await resposta.json();
            if(resposta.ok){
                console.log("Login bem-sucedido:", dados);
                // Aqui você pode salvar o token no localStorage, por exemplo
                localStorage.setItem("token", dados.token);
                navigate("/tarefas");
            }else {
                console.error("Erro no login:", dados.mensagem);
                // Aqui você pode mostrar a mensagem de erro na tela
            }
        } catch (error) {
            console.error("Erro na requisição:", erro);
        }

        }

        return (
            <div>
                
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <input
                        type="email"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(apelido) => setEmail(apelido.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="digite sua senha"
                        value={senha}
                        onChange={(event) => setSenha(event.target.value)}
                    />

                    <button type="submit">Entrar</button>
                </form>
                <button type="button" onClick={() => navigate('/cadastro')}>
                Cadastre-se
                </button>
            </div>
        );
    }

    export default Login;

    // nota loguin testado e realizado com sucesso