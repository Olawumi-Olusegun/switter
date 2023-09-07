'use client'
import React, { useState, useCallback } from 'react'

import axios from 'axios'
import { signIn } from 'next-auth/react';


import Input from '../Input';
import Modal from '../Modal';
import useRegisterModal from '@/hooks/useRgisterModal';
import useLoginModal from '@/hooks/useLoginModal';
import { toast } from 'react-hot-toast';

const RegisterModal = () => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = useCallback( async() => {
        try {
            setIsLoading(true);
            await axios.post('/api/register', {
                name, 
                username, 
                email, 
                password
            });
            
            toast.success("Account created");
            await signIn('credentials', {
                email, password
            });

            registerModal.onClose();

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }

    }, [registerModal, name, username, email, password]);

    const handleToggle = useCallback(() => {
        if(isLoading) {
            return;
        }

        registerModal.onClose();
        loginModal.onOpen();

    }, [isLoading, registerModal, loginModal]);

    const bodyContent = (

        <div className='flex flex-col gap-4'>
            <Input
            type='text'
            placeholder='Name'
            onChange={(event) => setName(event.target.value)}
            value={name}
            disabled={isLoading}
            />

            <Input
            type='text'
            placeholder='Username'
            onChange={(event) => setUsername(event.target.value)}
            value={username}
            disabled={isLoading}
            />

            <Input
            type='text'
            placeholder='Email'
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            disabled={isLoading}
            />

            <Input
            type='password'
            placeholder='Password'
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            disabled={isLoading}
            />
        </div>
    )

    const footerContent = (
        <div className='text-neutral-400 text-center mt-4 '>
            <p className='py-4'>Already have an account?{" "}
            <span
                onClick={handleToggle}
                className="
                text-white
                cursor-pointer
                hover-underline
                ">Sign in 
            </span>
            </p>
        </div>
    )
    

  return (
    <>
        <Modal 
            disabled={isLoading} 
            isOpen={registerModal.isOpen} 
            title='Register' 
            actionLabel='Sign up'
            onClose={registerModal.onClose}
            onSubmit={handleSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    </>
  )
}

export default RegisterModal