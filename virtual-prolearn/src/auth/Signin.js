import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { loginWithEmail, } from "./Auth";
import { AuthContext } from "../context/Authcontext";
const Signin = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const signin = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            const data = await loginWithEmail(email, password);
            login(data.access, data.refresh); // ✅ update context + localStorage
            navigate("/home");
        } catch (err) {
            setError(err.message || "Login failed");
        } finally {
            setSubmitting(false);
        }
    };

    const togglePassword = () => {
        const input = document.getElementById("passwordInput");
        input.type = input.type === "password" ? "text" : "password";
        const icon = document.querySelector("#passwordInput + .bi");
        if (input.type === "text") {
            icon.classList.replace("bi-eye-fill", "bi-eye-slash-fill");
        } else {
            icon.classList.replace("bi-eye-slash-fill", "bi-eye-fill");
        }
    };
    return (
        <div className="container ">
            <div className="row  align-items-center">
                <div className=" mt-5 col-12 col-lg-6 ">
                    <div className="mb-3">
                        <div className="mb-3">
                            <img src="../../img/logo.21564628.svg" />
                        </div>
                        <div className="mb-3">
                            <h1 className="roboto fw-bold">Welcome</h1>
                        </div>
                        <div className="mb-5">
                            <img src="../../img/signin-label.0d954d20.svg" />
                        </div>
                    </div>
                    <form onSubmit={signin} >
                        <div className="d-flex flex-column justify-content-start mb-3">
                            <span className="roboto mb-2">Email Address</span>
                            <div className="position-relative mb-2">
                                <input type="email" className="form-control form-control-lg roboto"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <i className="bi bi-envelope-fill position-absolute email-icon"></i>
                            </div>
                        </div>
                        <div className="mb-3">
                            <span className="roboto mb-2">Password</span>
                            <div className="position-relative mb-3">
                                <input type="password" id="passwordInput" className="form-control form-control-lg roboto "
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <i
                                    className="bi bi-eye-fill position-absolute pass-icon"
                                    onClick={togglePassword}
                                ></i>
                            </div>
                            <div className="d-flex flex-row justify-content-between">
                                <span className="roboto"> By entering VPL you agree to <a href="#"> Our Teams of Use</a></span>
                                <span className="roboto"><a href="#" className="text-secondary">Forgot Password</a></span>
                            </div>
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div>
                            <button className="text-white border-0 w-100 mb-2 py-2 fs-6 fw-bold in-clr" type="submit" disabled={submitting}>
                                {submitting ? "Signing In..." : "Sign In"}
                            </button>
                            <div className="d-flex flex-column align-items-center">
                                <span className="text-center roboto text-secondary">Don't have an account yet? <a href="/signin" className="text-dark">Sign up Build a Course.</a> </span>
                                <span className="text-center roboto text-secondary">Attending A Course? Contact your course instructor to create an account.</span>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-12 col-lg-6 mt-5">
                    <img src="../../img/new-login-banner.ef5236ac.png" className="img-fluid" />
                </div>
            </div>
        </div>
    )
}

export default Signin