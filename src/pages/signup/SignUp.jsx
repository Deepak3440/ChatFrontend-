import React, { useState } from 'react';
import GenderCheckbox from './GenderCheckbox';
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';
import toast, { Toaster } from 'react-hot-toast'; 

const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: ''
    });
    const { loading, signup } = useSignup();

    const handleCheckboxChange = (gender) => {
        setInputs({ ...inputs, gender });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(inputs);
            toast.success('Sign up successful'); 
            setInputs({
                fullName: '',
                username: '',
                password: '',
                confirmPassword: '',
                gender: ''
            });
        } catch (error) {
            console.error(error);
            toast.error('Sign up failed'); 
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <Toaster /> 
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-red-300'>
                    SignUp
                    <span className='text-purple-600'> ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-black'>Full Name</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter Full Name'
                            className='w-full input input-bordered h-10'
                            value={inputs.fullName}
                            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-black'>Username</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter Username'
                            className='w-full input input-bordered h-10'
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-base label-text text-black'>Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            className='w-full input input-bordered h-10'
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-base label-text text-black'>Confirm Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Confirm Password'
                            className='w-full input input-bordered h-10'
                            value={inputs.confirmPassword}
                            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                        />
                    </div>

                    <GenderCheckbox
                        onCheckboxChange={handleCheckboxChange}
                        selectedGender={inputs.gender}
                    />

                    <Link
                        to='/login'
                        className='text-sm hover:underline hover:text-red-600 mt-2 inline-block text-black'
                    >
                        {"Don't have an account?"}
                    </Link>

                    <div>
                    <button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;