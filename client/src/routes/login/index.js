import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authenticate } from '../../auth';

const Login = () => {
  const history = useHistory();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [isErrorLogin, setIsErrorLogin] = useState(false);

  /**
   * Handle the input change and changes the form state
   * @function handleChange
   * @param {String} key - Form field key
   * @returns {Function} On change event handler
   */
  const handleChange = (key) => ({ target }) => {
    setLoginForm({ ...loginForm, [key]: target.value });
  };

  /**
   * Submit the login form and handles the response
   * @function handleSubmit
   * @param {Event} e - Submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { email, password } = loginForm;

    try {
      setIsErrorLogin(false);

      // Here you can store the userData in any way
      const userData = await authenticate(email, password);
      console.log(userData);
      if (userData) {
        history.push('/app/home');
      } else {
        throw new Error('Invalid login');
      }
    } catch (error) {
      setIsErrorLogin(true);
      console.error(error.message);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <p className={`error ${isErrorLogin ? '' : 'hidden'}`}>
        Erro de autenticação: email ou senha inválido
      </p>

      <input
        name="email"
        type="input"
        onChange={handleChange('email')}
        value={loginForm.email}
        placeholder="Email - ex.:admin@gaivota.ai" />
      <input
        name="password"
        type="password"
        placeholder="Senha"
        onChange={handleChange('password')}
        value={loginForm.password}
        autoComplete="off" />
      <button type="submit">Autenticar</button>
    </form>
  );
};

export default Login;
