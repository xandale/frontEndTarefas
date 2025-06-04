import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Cadastro from '../pages/Cadastro'
import Tarefas from '../pages/Tarefas'


function AppRoutes() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/cadastro' element={<Cadastro/>}/>
                <Route path='/tarefas' element={<Tarefas/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes