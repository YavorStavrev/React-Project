// import { useActionState, useContext } from "react";
// import { Link, useNavigate } from "react-router";
// import { useLogin } from "../../api/authApi";
// import { UserContext } from "../../contexts/UserContext";
// import { toast } from 'react-toastify';

// export default function Login() {
//     const navigate = useNavigate();
//     const { userLoginHandler } = useContext(UserContext);
//     const { login } = useLogin();

//     const loginHandler = async (_, formData) => {
//         const values = Object.fromEntries(formData);

//         try {
//             const authData = await login(values.email, values.password);
//             userLoginHandler(authData);

//             toast.success('Successful Login')

//             navigate(-1);
//         } catch (err) {
//             toast.error(err.message)
//         }
//     };

//     const [_, loginAction, isPending] = useActionState(loginHandler, { email: '', password: '' });

//     return (
//         <section id="login-page" className="auth">
//             <form id="login" action={loginAction}>
//                 <div className="container">
//                     <h1>Login</h1>
//                     <label htmlFor="email">Email:</label>
//                     <input type="email" id="email" name="email" placeholder="Enter email..." />

//                     <label htmlFor="login-pass">Password:</label>
//                     <input type="password" id="login-password" name="password" />
//                     <input type="submit" className="btn submit" value="Login" disabled={isPending} />
//                     <p className="field">
//                         <span>If you don't have profile click <Link to="/register">here!</Link></span>
//                     </p>
//                 </div>
//             </form>
//         </section>
//     );
// }

import { useActionState, useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useLogin } from "../../api/authApi";
import { UserContext } from "../../contexts/UserContext";
import { toast } from 'react-toastify';

export default function Login() {
    const navigate = useNavigate();
    const { userLoginHandler } = useContext(UserContext);
    const { login } = useLogin();

    const [formValues, setFormValues] = useState({ email: '', password: '' });
    const [formErrors, setFormErrors] = useState({ email: '', password: '' });

    const validateEmail = (email) => {
        if (email.length < 6) return "Email must be at least 6 characters.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return "Invalid email format.";
        return '';
    };

    const validatePassword = (password) => {
        if (password.length < 5) return "Password must be at least 5 characters.";
        return '';
    };

    const loginHandler = async (_, formData) => {
        const values = Object.fromEntries(formData);
        const emailError = validateEmail(values.email);
        const passwordError = validatePassword(values.password);

        const errors = { email: emailError, password: passwordError };
        const hasErrors = emailError || passwordError;

        if (hasErrors) {
            setFormErrors(errors);
            setFormValues({
                email: emailError ? '' : values.email,
                password: passwordError ? '' : values.password
            });
            return;
        }

        setFormErrors({ email: '', password: '' });

        try {
            const authData = await login(values.email, values.password);
            userLoginHandler(authData);
            toast.success('Successful Login');
            navigate(-1);
        } catch (err) {
            toast.error(err.message);
        }
    };

    const [_, loginAction, isPending] = useActionState(loginHandler, formValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    return (
        <section id="login-page" className="auth">
            <form id="login" action={loginAction}>
                <div className="container">
                    <h1>Login</h1>

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                        placeholder="Enter email..."
                        className={formErrors.email ? 'input-error' : ''}
                    />
                    {formErrors.email && <p className="error-message">{formErrors.email}</p>}

                    <label htmlFor="login-password">Password:</label>
                    <input
                        type="password"
                        id="login-password"
                        name="password"
                        value={formValues.password}
                        onChange={handleInputChange}
                        className={formErrors.password ? 'input-error' : ''}
                    />
                    {formErrors.password && <p className="error-message">{formErrors.password}</p>}

                    <input
                        type="submit"
                        className="btn submit"
                        value="Login"
                        disabled={isPending}
                    />

                    <p className="field">
                        <span>If you don't have profile click <Link to="/register">here!</Link></span>
                    </p>
                </div>
            </form>

            <style jsx>{`
                .input-error {
                    border: 2px solid red;
                    outline: none;
                    background-color: #ffe6e6;
                }

                .error-message {
                    color: red;
                    font-size: 0.875rem;
                    margin-bottom: 10px;
                }

                input {
                    display: block;
                    width: 100%;
                    padding: 8px;
                    margin-bottom: 10px;
                    box-sizing: border-box;
                }
            `}</style>
        </section>
    );
}

