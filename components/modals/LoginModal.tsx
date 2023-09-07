import useLoginModal from '@/hooks/useLoginModal'
import React, { useState, useCallback } from 'react'
import { signIn } from 'next-auth/react';

import Input from '../Input';
import Modal from '../Modal';
import useRegisterModal from '@/hooks/useRgisterModal';

const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = useCallback(async() => {
        try {
            setIsLoading(true);

            await signIn('credentials', {
                email,
                password
            });

            loginModal.onClose();

        } catch (error) {
            console.log(error)
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }

    }, [loginModal, email, password])

    const handleToggle = useCallback(() => {
        if(isLoading) {
            return;
        }

        loginModal.onClose();
        registerModal.onOpen();

    }, [isLoading, registerModal, loginModal])

    const bodyContent = (

        <div className='flex flex-col gap-4'>
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
        <div className='text-neutral-400 text-center mt-4'>
            <p className='py-4'>Don't have an account?{" "}
            <span
                onClick={handleToggle}
                className="
                text-white
                cursor-pointer
                hover-underline
                ">
                Register 
            </span>
            </p>
        </div>
    )
    

  return (
    <>
        <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen} 
        title='Login' 
        actionLabel='Sign in'
        onClose={loginModal.onClose}
        onSubmit={handleSubmit}
        body={bodyContent}
        footer={footerContent}
        />
    </>
  )
}

export default LoginModal