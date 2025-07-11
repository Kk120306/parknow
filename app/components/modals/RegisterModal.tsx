'use client'

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useState, useCallback } from 'react';
import {
    useForm,
    FieldValues,
    SubmitHandler
} from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signIn } from 'next-auth/react';

const RegisterModal = () => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                toast.success("Account created successfully!");
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch((error) => {
                toast.error("Something went wrong!");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to ParkNow"
                subtitle="Create an account!"
            />
            <Input
                id="email"
                label="Email"
                type="email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}

            />
            <Button
                outline
                label="Continue with GitHub"
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div className="justify-center flex flex-row items-center gap-2 mt-4">
                <div>
                    Already have an account?
                </div>
                <span
                    onClick={() => {
                        registerModal.onClose();
                        loginModal.onOpen();
                    }}
                    className="text-blue-800 cursor-pointer hover:underline">
                    Log in
                </span>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default RegisterModal;