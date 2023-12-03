import React from 'react'
import styles from './About.module.css'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className={styles.about}>
        <h4>
            Sobre o Mini<span>BLOG</span>
        </h4>
        <p>Projeto de React feito por mim, onde faço a união do Front-End e Back-End com <span>Vite, Css Modules, NodeJS e FireBase</span></p>
        <Link to='/post/create' className={'btn'}>
        Criar Post
        </Link>
    </div>
  )
}

export default About