import React from 'react'
import { useState, useEffect } from 'react'
import styles from './Register.module.css'
import { useAuthentication } from '../../hooks/useAutentication'

const Register = () => {
    const [nameDisplay, setNameDisplay] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const {createUser, error: authError, loading} = useAuthentication()


    const handleSubmit = async (e)=>{
        e.preventDefault()

        setError("")

        const user = {
            nameDisplay,
            email,
            password
        }

        if(password !== confirmPassword){
            setError("As senhas devem ser iguais")
            return
        }
        const res = await createUser(user)
        console.log(user)  
    }
    useEffect(()=> {
        if(authError) {
            setError(authError)
        }
    },[authError])


  return (
    <div className={styles.register}>
        <h1 >Cadastre-se para postar</h1>
        <form onSubmit={handleSubmit} className='container'>
            <label>
                <span>Nome:</span>
                <input 
                type="text"
                name='displayName'
                required
                placeholder='Nome Completo'
                value={nameDisplay}
                onChange={(e)=> setNameDisplay(e.target.value)}
                 />
            </label>
            <label>
                <span>Email:</span>
                <input 
                type="email"
                name='email'
                required
                placeholder='Email do usuário'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                 />
            </label>
            <label>
                <span>Senha:</span>
                <input 
                type="password"
                name='password'
                required
                placeholder='Senha'
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                 />
            </label>
            <label>
                <span>Confirmação de Senha:</span>
                <input 
                type="password"
                name='confirmPassword'
                required
                placeholder='Confirme sua senha'
                value={confirmPassword}
                onChange={(e)=> setConfirmPassword(e.target.value)}
                 />
            </label>
            {!loading && <button className='btn'>Cadastrar</button>}
            {loading && <button className='btn' disabled>Aguarde...</button>}
            {error && <p className='error'>{error}</p>}
            
        </form>
    </div>
  )
}

export default Register