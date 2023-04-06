import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function ControllPannel() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mob, setMob] = useState('')
    const [password, setPassword] = useState('')
    const [lemail, setLemail] = useState('')
    const [lpassword, setLpassword] = useState('')
    const [hform, setHform] = useState('Login')
    const navigate = useNavigate()
    let mystyle = {
        display: "none"
    }
    function handleForm() {
        let login = document.querySelector('.login')
        let reg = document.querySelector('.reg')
        if (hform === 'Login') {
            reg.style.display = "none"
            login.style.display = 'block'
            setHform('Register')

        } else {
            login.style.display = 'none'
            reg.style.display = "block"
            setHform('Login')

        }

    }

    function handleRegister(e) {
        e.preventDefault()
        let userData = JSON.parse(window.localStorage.getItem('user')) || []
        // console.log(userData.length)
        let flag = 1
        userData.forEach((data, index) => {
            if (data.email === email) {
                flag = 0;
            }
        })
        if (flag) {
            let id = 1
            if (userData.length === 0) {
                let newobj = { id, name, email, mob, password }
                userData.push(newobj)
                window.localStorage.setItem('user', JSON.stringify(userData))
            } else {
                let maxIndex = userData.length - 1
                id = userData[maxIndex].id + 1
                let newobj = { id, name, email, mob, password }
                userData.push(newobj)
                window.localStorage.setItem('user', JSON.stringify(userData))
            }
            alert('Registred successfully')
        } else {
            alert("This email id is Already Registered")
        }

        setEmail('')
        setName('')
        setMob('')
        setPassword('')
    }
    function handleLogin(e) {
        e.preventDefault()
        let userData = JSON.parse(window.localStorage.getItem('user')) || []
        let flag = 0
        userData.forEach((data) => {
            if (data.email === lemail && data.password === lpassword) {
                flag = 1
            }
        })
        if (flag) {
            window.localStorage.setItem('session', JSON.stringify(lemail))
            navigate('/task')
            window.location.reload(true)
        } else {
            alert('email or password is incorrect')
        }

    }
    return (
        <>
            <div className="continer">
                <div className="row mt-3">
                    <div className="col-sm-4 text-center px-3">
                        <div className="btn btn-warning text-light fw-bold" onClick={handleForm}>{hform}</div>
                    </div>

                    {/* register form code start here */}

                    <div className="col-sm-4  reg">
                        <div className="card">
                            <div className="card-title pt-2">
                                <h3 className='text-center text-success'>Register User</h3>
                            </div>

                            <div className="card-body px-5">
                                <form onSubmit={handleRegister}>
                                    <label>Name</label><br />
                                    <input type="text" onChange={(e) => { setName(e.target.value) }} value={name} placeholder="Enter Your name.." className="form-control" />
                                    <label>Email</label><br />
                                    <input type="Email" onChange={(e) => { setEmail(e.target.value) }} value={email} placeholder="Enter Your email.." className="form-control" />
                                    <label>Mobile</label><br />
                                    <input type="number" onChange={(e) => { setMob(e.target.value) }} value={mob} placeholder="Enter Your no.." className="form-control" />
                                    <label>Password</label><br />
                                    <input type="password" onChange={(e) => { setPassword(e.target.value) }} value={password} placeholder="Enter Your Password.." className="form-control" />
                                    <br />
                                    <input type="submit" value="Submit" className="btn btn-outline-success" />
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* register form End */}


                    <div className="col-sm-4 login" style={mystyle}>
                        {/* Login form start here */}

                        <div className="card">
                            <div className="card-title pt-3">
                                <h3 className="text-center text-success">Login user</h3>
                            </div>
                            <div className="card-body px-5">
                                <form onSubmit={handleLogin}>
                                    <label>Email</label><br />
                                    <input type="email" value={lemail} onChange={(e) => { setLemail(e.target.value) }} placeholder='Enter Your Email id..' className="form-control" />


                                    <label>Password</label><br />
                                    <input type="password" onChange={(e) => { setLpassword(e.target.value) }} value={lpassword} placeholder='Enter Your password..' className="form-control" /><br />

                                    <input type="submit" value="Login" className="btn btn-outline-success" />
                                </form>
                            </div>
                        </div>

                        {/* Login form End */}
                    </div>
                    <div className="col-sm-4"></div>
                </div>
            </div>
        </>
    )
}