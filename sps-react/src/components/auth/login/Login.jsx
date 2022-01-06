import { useContext, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import './Login.css';
import spinner from '../../shared/assets/spinner.gif';

const user = {
    email: '',
    password: ''
}

function Login() {
    const navigate = useNavigate();
    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { authenticate } = useContext(UserContext);

    // setTimeout used only to simulate server response
    const handleSubmit = (e) => {
        e.preventDefault();
        user.email = emailText;
        user.password = passwordText;
        
        setIsLoading(true);
        const promise = authenticate(user);
        promise
            .then(
                (data) => {
                    setTimeout(() => {
                        setIsLoading(false);
                        if (data.user.email === user.email) {
                            window.sessionStorage.setItem('token', data.token);
                            window.sessionStorage.setItem('logged', JSON.stringify(data.user));
                            navigate('/app', { replace: true });
                        }
                    }, 2000)
                }
            )
            .catch(
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000)
            );
        
        setEmailText('');
        setPasswordText('');
    }

    const handleEmailChange = (e) => {
        setEmailText(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPasswordText(e.target.value)
    }

    return(
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <h3>Login</h3>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">E-mail</label>
                    <input
                        onChange={handleEmailChange}
                        type="email" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter email" 
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
                        <NavLink className="question-text" to='/register' style={{ textDecoration: 'none' }}>
                            Ainda não tem uma conta ?
                        </NavLink>
                    </small>
                </div>
                {
                    isLoading ?
                    <img 
                        src={spinner}
                        style={{width: '50px'}}
                    /> : 
                    <button className="btn" type="submit">Entrar</button>
                }
            </form>
        </div>
    );
}

export default Login;
