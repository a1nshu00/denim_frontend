import LayoutMain from "@layout/main"
import '@assets/vendor/css/pages/page-auth.css'
import { useEffect, useState } from "react"
import AuthService from "../../../service/Auth";
import { useNavigate } from "react-router-dom";
// import { useAccessToken } from "../../../provider/accessToken";

export default function LoginPage() {
    const navigate = useNavigate();
    // const [accessToken, setAccessToken] = useAccessToken('');
    

    const [inputEmail, setInputEmail] = useState('');
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [inputPassword, setInputPassword] = useState('');
    const [inputRememberMe, setInputRememberMe] = useState(false);

    useEffect(function() {
        checkAuth();
    },[])

    const checkAuth = async () => {
        setCheckingAuth(true);
        if (await AuthService.check()) {
            navigate('/dashboard');
        }
        setCheckingAuth(false);
    }


    const submitForm  = async () => {
        const data   = { email:inputEmail, password:inputPassword, remember:inputRememberMe };

        const result = await AuthService.login(data);

        if (result.status) {
            localStorage.setItem('token', result.data.token);
            navigate('/dashboard');
        }
    }

    if (checkingAuth) return <></>

    return <LayoutMain withoutSidebar>
        <div className="authentication-wrapper authentication-basic container-p-y">
            <div className="authentication-inner">
                <div className="card">
                    <div className="card-body">
                        <div className="app-brand justify-content-center">
                            <a href="index.html" className="app-brand-link gap-2">
                                <span className="app-brand-logo demo">

                                </span>
                                <span className="app-brand-text demo text-body fw-bolder" style={{ textTransform: "capitalize" }}>DENIM HIKE</span>
                            </a>
                        </div>
                        <h4 className="mb-2">Welcome to Denim Hike! 👋</h4>
                        <p className="mb-4">Please sign-in to your account and start the adventure</p>
                        <form id="formAuthentication" className="mb-3" method="POST">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email or Username</label>
                                <input type="text" className="form-control" id="email" name="email-username" value={inputEmail} onChange={e => setInputEmail(e.target.value)} placeholder="Enter your email or username" autoFocus={true} />
                            </div>
                            <div className="mb-3 form-password-toggle">
                                <div className="d-flex justify-content-between">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <a href="auth-forgot-password-basic.html">
                                        <small>Forgot Password?</small>
                                    </a>
                                </div>
                                <div className="input-group input-group-merge">
                                    <input type="password" id="password" className="form-control" value={inputPassword} onChange={e => setInputPassword(e.target.value)} name="password" placeholder="············" aria-describedby="password" />
                                    <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="remember-me" value={inputRememberMe}  onChange={(e) => setInputRememberMe(e.target.checked)} />
                                    <label className="form-check-label" htmlFor="remember-me"> Remember Me </label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary d-grid w-100" type="button" onClick={submitForm}>Sign in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </LayoutMain>
}