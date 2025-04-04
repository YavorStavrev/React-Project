import { useActionState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { useLogin } from "../../api/authApi";
import { UserContext } from "../../contexts/UserContext";
import { toast } from 'react-toastify';

export default function Login() {
    const navigate = useNavigate();
    const { userLoginHandler } = useContext(UserContext);
    const { login } = useLogin();

    const loginHandler = async (_, formData) => {
        const values = Object.fromEntries(formData);

        try {
            const authData = await login(values.email, values.password);

            userLoginHandler(authData);

            toast.success('Successful Login')

            navigate(-1);
        } catch (err) {
            toast.error(err.message)
        }
    };

    const [_, loginAction, isPending] = useActionState(loginHandler, { email: '', password: '' });

    return (
        <section id="login-page" className="auth">
            <form id="login" action={loginAction}>
                <div className="container">
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Enter email..." />

                    <label htmlFor="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password" />
                    <input type="submit" className="btn submit" value="Login" disabled={isPending} />
                    <p className="field">
                        <span>If you don't have profile click <Link to="/register">here!</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
}
