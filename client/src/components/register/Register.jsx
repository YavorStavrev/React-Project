// import { useRegister } from "../../api/authApi";
// import { useUserContext } from "../../contexts/UserContext";
// import { Link, useNavigate } from "react-router";
// import { toast } from "react-toastify";

// export default function Register() {
//     const navigate = useNavigate();
//     const { register } = useRegister();
//     const { userLoginHandler } = useUserContext();

//     const registerHandler = async (formData) => {
//         const { email, password } = Object.fromEntries(formData);

//         const confirmPassword = formData.get('confirm-password');

//         if (password !== confirmPassword) {
//             toast.error('Password missmatch');

//             return;
//         }

//         try {
//             const authData = await register(email, password);

//             userLoginHandler(authData);
//             toast.success('Successful Register');

//             navigate(-1);
//         } catch (err) {
//             toast.error(err.message)
//         }
//     }


//     return (
//         <section id="register-page" className="content auth">
//             <form id="register" action={registerHandler}>
//                 <div className="container">

//                     <h1>Register</h1>

//                     <label htmlFor="email">Email:</label>
//                     <input type="email" id="email" name="email" placeholder="Enter email..." />

//                     <label htmlFor="pass">Password:</label>
//                     <input type="password" name="password" id="register-password" />

//                     <label htmlFor="con-pass">Confirm Password:</label>
//                     <input type="password" name="confirm-password" id="confirm-password" />

//                     <input className="btn submit" type="submit" value="Register" />

//                     <p className="field">
//                         <span>If you already have profile click <Link to="/login">here</Link></span>
//                     </p>
//                 </div>
//             </form>
//         </section>
//     );
// }

import { useState } from "react";
import { useRegister } from "../../api/authApi";
import { useUserContext } from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function Register() {
    const navigate = useNavigate();
    const { register } = useRegister();
    const { userLoginHandler } = useUserContext();

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formValues.email) || formValues.email.length < 10) {
            newErrors.email = "Enter a valid email (min 10 characters).";
        }

        if (formValues.password.length < 5) {
            newErrors.password = "Password must be at least 5 characters.";
        }

        if (formValues.confirmPassword !== formValues.password) {
            newErrors.confirmPassword = "Passwords do not match.";
        } else if (formValues.confirmPassword.length < 5) {
            newErrors.confirmPassword = "Password must be at least 5 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const registerHandler = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const authData = await register(formValues.email, formValues.password);

            userLoginHandler(authData);
            toast.success("Successful Register");
            navigate(-1);
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    return (
        <section id="register-page" className="content auth">
            <form id="register" onSubmit={registerHandler}>
                <div className="container">
                    <h1>Register</h1>

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                        placeholder="Enter email..."
                        className={errors.email ? 'input-error' : ''}
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}

                    <label htmlFor="register-password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="register-password"
                        value={formValues.password}
                        onChange={handleChange}
                        className={errors.password ? 'input-error' : ''}
                    />
                    {errors.password && <p className="error-text">{errors.password}</p>}

                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirm-password"
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                        className={errors.confirmPassword ? 'input-error' : ''}
                    />
                    {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

                    <input className="btn submit" type="submit" value="Register" />

                    <p className="field">
                        <span>If you already have profile click <Link to="/login">here</Link></span>
                    </p>
                </div>
            </form>

            <style>{`
                .input-error {
                    border: 1px solid red;
                }
                .error-text {
                    color: red;
                    font-size: 0.9rem;
                    margin-top: 0.2rem;
                    margin-bottom: 0.5rem;
                }
            `}</style>
        </section>
    );
}


