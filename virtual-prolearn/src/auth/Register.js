import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
const Register = () => {
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [ok, setOk] = useState(false);

    const pwdRef = useRef(null);
    const cpwdRef = useRef(null);

    const handleChange = (e) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    };

    const toggleType = (refId) => {
        const input = refId.current;
        if (!input) return;
        input.type = input.type === "password" ? "text" : "password";
    };
    
    const navigate = useNavigate()
    const submit = async (e) => {
        e.preventDefault();
        setError(null);
        setOk(false);
        setSubmitting(true);
        try {
            const res = await fetch("http://localhost:8000/api/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(typeof data === "object" ? JSON.stringify(data) : String(data));
            } else {
                setOk(true);
                navigate("/signin")

            }
        } catch (err) {
            setError(err.message || "Network error");
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <div className="d-flex flex-row justify-content-center align-items-center gap-5 mt-5">
            <div className="ms-5 mt-5 ">
                <div className="mb-3">
                    <div>
                        <img src="../../img/logo.21564628.svg" />
                    </div>
                    <div>
                        <h1 className="roboto fw-bold">Create Your Account</h1>
                    </div>
                    <div>
                        <img src="../../img/signupLabel.0733dd0e.svg" />
                    </div>
                </div>
                <form onSubmit={submit} >
                    <div>
                        <div className="d-flex flex-row justify-content-start gap-2 mb-3">
                            <div className="d-flex flex-column justify-content-start">
                                <span className="roboto">First Name</span>
                                <div className="position-relative mb-3">
                                    <input type="text" className="form-control form-control-lg roboto ps-5"
                                        name="first_name"
                                        value={form.first_name}
                                        onChange={handleChange}
                                    />
                                    <i className="bi bi-person-circle position-absolute email-icon"></i>
                                </div>
                            </div>
                            <div className="d-flex flex-column justify-content-start">
                                <span className="roboto">Last Name</span>
                                <div className="position-relative mb-3">
                                    <input type="text" className="form-control form-control-lg roboto ps-5"
                                        name="last_name"
                                        value={form.last_name}
                                        onChange={handleChange}
                                    />
                                    <i className="bi bi-person-circle position-absolute email-icon"></i>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-column justify-content-start mb-3">
                            <span className="roboto">Email Address</span>
                            <div className="position-relative mb-3">
                                <input type="email" className="form-control form-control-lg roboto"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                                <i className="bi bi-envelope-fill position-absolute email-icon"></i>
                            </div>
                        </div>

                        {/* Optional: user_type select */}
                        {/* <div className="mb-3">
                            <span className="roboto">User Type</span>
                            <select
                                name="user_type"
                                value={form.user_type}
                                onChange={handleChange}
                                className="form-control form-control-lg roboto"
                            >
                                <option value="basic">Basic</option>
                                <option value="manager">Manager</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div> */}

                        <div className="mb-3">
                            <span className="roboto">Password</span>
                            <div className="position-relative mb-3">
                                <input type="password" id="passwordInput" className="form-control form-control-lg roboto "
                                    ref={pwdRef}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    minLength={8}
                                    required
                                />
                                {/* <i className="bi bi-eye-fill position-absolute pass-icon "
                                onClick={() => {
                                    const input = document.getElementById("passwordInput");
                                    input.type = input.type === "password" ? "text" : "password";
                                    const icon = document.querySelector("#passwordInput + .bi");
                                    if (input.type === "text") {
                                        icon.classList.replace("bi-eye-fill", "bi-eye-slash-fill");
                                    } else {
                                        icon.classList.replace("bi-eye-slash-fill", "bi-eye-fill");
                                    }
                                }}
                            ></i> */}
                                <i
                                    className="bi bi-eye-fill position-absolute pass-icon"
                                    onClick={() => toggleType(pwdRef)}
                                    role="button"
                                    aria-label="Toggle password visibility"
                                ></i>
                            </div>
                        </div>
                        <div className="mb-3">
                            <span className="roboto">Confirm Password</span>
                            <div className="position-relative mb-3">
                                <input type="password" id="confirmpasswordInput" className="form-control form-control-lg roboto"
                                    ref={cpwdRef}
                                    name="confirm_password"
                                    value={form.confirm_password}
                                    onChange={handleChange}
                                    minLength={8}
                                    required
                                />
                                {/* <i className="bi bi-eye-fill position-absolute pass-icon"
                                onClick={() => {
                                    const input = document.getElementById("confirmpasswordInput");
                                    input.type = input.type === "password" ? "text" : "password";
                                    const icon = document.querySelector("#confirmpasswordInput + .bi");
                                    if (input.type === "text") {
                                        icon.classList.replace("bi-eye-fill", "bi-eye-slash-fill");
                                    } else {
                                        icon.classList.replace("bi-eye-slash-fill", "bi-eye-fill");
                                    }
                                }}
                            ></i> */}
                                <i
                                    className="bi bi-eye-fill position-absolute pass-icon"
                                    onClick={() => toggleType(cpwdRef)}
                                    role="button"
                                    aria-label="Toggle confirm password visibility"
                                ></i>
                            </div>
                            <span className="roboto text-secondary">By entering VPL you agree to <a href="" className="up-clr"> Our Terms of Use</a></span>
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {ok && <div className="alert alert-success">Account created!</div>}

                        <div>
                            <button className="text-white border-0 w-100 mb-2 py-2 in-clr roboto" type="submit" disabled={submitting} >
                                {submitting ? "Signing up..." : "Sign up"}
                            </button>
                            <span className="text-center roboto text-secondary">Already have an account? <a href="/signin" className="roboto up-clr">Sign in.</a> </span>
                        </div>

                    </div>
                </form>

            </div>
            <div>
                <img src="../../img/signup-banner.png" />
            </div>
        </div>
    )
}

export default Register