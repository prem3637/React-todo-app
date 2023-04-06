import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ControllPannel from './ControllPannel'
import Task from './Task'
const auth = JSON.parse(window.localStorage.getItem('session'))
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<ControllPannel />} />
                {/* <Route path='/task' element={<Task />} /> */}
                {auth ? <Route path='/task' element={<Task />} /> : <Route path='/' element={<ControllPannel />}></Route>}

            </Routes>
        </BrowserRouter>
    )
}