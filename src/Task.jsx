import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Task() {
    const [title, setTitle] = useState('')
    const [des, setDes] = useState('')
    const [status, setStatus] = useState('Pending')
    const email = JSON.parse(window.localStorage.getItem('session'))
    const show = JSON.parse(window.localStorage.getItem('task'))
    const navigate = useNavigate()
    function handleTask(e) {
        e.preventDefault()
        let taskData = JSON.parse(window.localStorage.getItem('task')) || []
        let id = 1
        if (taskData.length === 0) {
            let taskObj = { id, email, title, des, status }
            taskData.push(taskObj)
            window.localStorage.setItem('task', JSON.stringify(taskData))
        } else {
            let maxIndex = taskData.length - 1
            id = taskData[maxIndex].id + 1
            let taskObj = { id, email, title, des, status }
            taskData.push(taskObj)
            window.localStorage.setItem('task', JSON.stringify(taskData))
        }

        window.location.reload(true)
    }
    function logOut() {
        window.localStorage.removeItem('session')
        navigate('/')

    }
    function handleStatus(index) {
        if (show[index].status === 'Complete') {
            show[index].status = 'Pending'
            window.localStorage.setItem('task', JSON.stringify(show))
            window.location.reload(true)
        } else {
            show[index].status = 'Complete'
            window.localStorage.setItem('task', JSON.stringify(show))
            window.location.reload(true)
        }
    }
    return (
        <>
            {/* add task here */}

            <div className="container">
                <div className="row mt-5">
                    <p className='text-center'><b>{email}</b>  <span className="btn btn-outline-warning" onClick={logOut}>Logout</span></p>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-title">
                                <h3 className="text-center text-success mt-3">Add Task</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleTask}>
                                    <label>Title</label> <br />
                                    <input type="text" onChange={(e) => { setTitle(e.target.value) }} value={title} placeholder='Add title...' className="form-control" />
                                    <label>Description</label> <br />
                                    <textarea onChange={(e) => { setDes(e.target.value) }} value={des} placeholder='Add description...' className="form-control"></textarea>
                                    <label>Status</label><br />
                                    <select onChange={(e) => { setStatus(e.target.value) }} value={status}>
                                        <option>Pending</option>
                                        <option>Complete</option>
                                    </select><br /><br />
                                    <input type="submit" value="Add" className="btn btn-outline-success" />
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4"></div>
                </div>
            </div>
            <br /><br />
            {/* show task here */}
            <div className="container mb-5">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-title">
                                <h3 className="text-center text-primary mt-3">Complete</h3>
                            </div>
                            <div className="card-body">
                                <table className='table table-bordered text-center'>
                                    <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {show ? show.map((data, index) => {
                                            if (data.email === email && data.status === 'Complete') {
                                                return (
                                                    <tr key={index}>
                                                        <td>{data.id}</td>
                                                        <td>{data.title}</td>
                                                        <td>{data.des}</td>
                                                        <td> <div onClick={() => { handleStatus(index) }} className="btn btn-outline-info">{data.status}</div> </td>
                                                    </tr>
                                                )
                                            }
                                        }) : <span>No Record found</span>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-title">
                                <h3 className="text-center text-danger mt-3">Pending</h3>
                            </div>
                            <div className="card-body">
                                <table className='table table-bordered text-center'>
                                    <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {show ? show.map((data, index) => {
                                            if (data.email === email && data.status === 'Pending') {
                                                return (
                                                    <tr key={index}>
                                                        <td>{data.id}</td>
                                                        <td>{data.title}</td>
                                                        <td>{data.des}</td>
                                                        <td> <div onClick={() => { handleStatus(index) }} className="btn btn-outline-danger">{data.status}</div> </td>
                                                    </tr>
                                                )
                                            }
                                        }) : <span>No Record found</span>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}