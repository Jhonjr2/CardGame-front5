import React from 'react'
import img from '../../assets/img_signup.png'

const signup = () => {
    return (
        <div>
            <section className='section1_signup'>
                <h1>Busca, encuentra e intercmbia Cartas</h1>
                <img src={img} alt="img_" />
            </section>
            <section className='section2_signup'>
                <form>
                    <h2 className='signup_title'>Sign Up</h2>
                    <label className='signup_label'>
                        <span className='signup_Email'>First Name</span>
                        <input className='signup_input' type="text" placeholder='name' />
                    </label>
                    <label className='signup_label'>
                        <span className='signup_Email'>Last Name</span>
                        <input className='signup_input' type="text" placeholder='Last Name' />
                    </label>
                    <label className='signup_label'>
                        <span className='signup_Email'>Username</span>
                        <input className='signup_input' type="text" placeholder='Username' />
                    </label>
                    <label className='signup_label'>
                        <span className='signup_Email'>Name</span>
                        <input className='signup_input' type="text" placeholder='name' />
                    </label>
                    <label className='signup_label'>
                        <span className='signup_Email'>Name</span>
                        <input className='signup_input' type="text" placeholder='name' />
                    </label>
                    <label className='signup_label'>
                        <span className='signup_Email'>Name</span>
                        <input className='signup_input' type="text" placeholder='name' />
                    </label>
                </form>
            </section>
        </div>
    )
}

export default signup