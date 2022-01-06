import { useContext, useState } from 'react';
import UserContext from '../../context/UserContext';
import { NavLink, useNavigate } from "react-router-dom";
import './Register.css';
import spinner from '../../shared/assets/spinner.gif';

const user = {
    name: '',
    email: '',
    password: ''
}

function Register() {
    const navigate = useNavigate();
    const [nameText, setNameText] = useState('');
    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useContext(UserContext);

    // setTimeout used only to simulate server response
    const handleSubmit = (e) => {
        e.preventDefault();
        user.name = nameText;
        user.email = emailText;
        user.password = passwordText;

        setIsLoading(true);
        const promise = register(user);
        promise
            .then(
                (data) => {
                    setTimeout(() => {
                        setIsLoading(false);
                        if (data.user.email === user.email) {
                            window.sessionStorage.setItem('token', data.token);
                            window.sessionStorage.setItem('logged', JSON.stringify(data.user));
                            navigate('/login', { replace: true });
                        }
                    }, 2000)
                }
            )
            .catch(
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000)
            );
        setNameText('');
        setEmailText('');
        setPasswordText('');
    }

    const handleNameChange = (e) => {
        setNameText(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmailText(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPasswordText(e.target.value)
    }

    return(
        <div className="container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h3>Cadastro</h3>
                <div className="form-group">
                    <label htmlFor="exampleInputNome">Nome</label>
                    <input
                        onChange={handleNameChange}
                        type="text" 
                        className="form-control" 
                        id="exampleInputNome" 
                        aria-describedby="emailHelp" 
                        placeholder="Name" 
                        name="name"
                        value={nameText}
                    />
                </div>
                <div className="form-group">
                <label htmlFor="exampleInputEmail1">E-mail</label>
                <input
                    onChange={handleEmailChange}
                    type="email" 
                    className="form-control" 
                    id="exampleInputEmail1" 
                    aria-describedby="emailHelp" 
                    placeholder="Email" 
                    name="email"
                    value={emailText}
                />
                </div>
                <div className="form-group">
                <label htmlFor="exampleInputPassword1">Senha</label>
                <input
                    onChange={handlePasswordChange}
                    type="password" 
                    className="form-control" 
                    id="exampleInputPassword1" 
                    placeholder="Password" 
                    name="password"
                    value={passwordText}
                />
                </div>
                <div className="form-group-question">
                    <small>
                        <NavLink className="question-text" to='/login' style={{ textDecoration: 'none' }}>
                            Já tem uma conta ?
                        </NavLink>
                    </small>
                </div>
                {
                    isLoading ?
                    <img
                        src={spinner}
                        style={{width: '50px'}}
                    /> : 
                    <button className="btn" type="submit">Criar conta</button>
                }
            </form>
        </div>
    );
}

export default Register;
