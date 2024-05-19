import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';


const Login = () => {

    // const chaptchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const { loginUser, sweetAlert } = useContext(AuthContext);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        loginUser(email, password)
            .then(res => {
                const user = res.user;
                console.log(user);
                sweetAlert("login sucess")
            })
    }

    const handleValidateCaptcha = (e) => {
        const userCaptchaValue = e.target.value;
        console.log(userCaptchaValue);
        if (validateCaptcha(userCaptchaValue)) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
    }

    return (
        <div>
            <Helmet>
                <title>Bistro | Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type the text above" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button disabled={disabled} className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        <div>
                            <h3>New hear</h3>
                            <Link to="/signUp">Create an account</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;