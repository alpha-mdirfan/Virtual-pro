import { useState, useEffect } from "react";
import { authFetch } from "../auth/Auth";
const Imgup = () => {
    const [preview, setPreview] = useState(null); // start with null
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await authFetch("http://localhost:8000/api/me/");
                const data = await res.json();
                if (!res.ok) throw new Error("Failed to fetch user data");
                setFirstName(data.first_name);
                setLastName(data.last_name);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="d-flex flex-row justify-content-between px-2">
            <div className="d-flex flex-row align-items-center gap-3">
                <div className="img-size overflow-visible cursor-pointer p-2 text-center">
                    {/* Upload box */}
                    <div className="bord-img border-1 border-dotted border-secondary mx-auto d-flex align-items-center justify-content-center bg-white img-up img-size"
                        onClick={() => document.getElementById("imageUpload").click()}>
                        {preview ? (<img src={preview} alt="Preview" className="img-fluid object-fit-cover w-100 h-100" />)
                            : (<span className="text-secondary  ">+<br />Avatar Logo or Avatar</span>)}
                        {/* Hidden file input */}
                        <input type="file" accept="image/*" id="imageUpload" className="d-none" onChange={handleImageChange} />
                    </div>
                    {/* Label below the box */}
                </div>
                <div >
                    <p className="ml-5 roboto fs-5 fw-bold my-0"> { firstName + " " + lastName }</p>
                    <span className="roboto d-block cursor-pointer pb-5" onClick={() => document.getElementById("imageUpload").click()} >
                        <i class="bi bi-pencil font-14"></i>Add Logo or Avatar
                    </span>
                </div>
            </div>
            <div>
                <button type="button" className="transact-his roboto font-14 fw-bold mt-2 bg-white shadow px-3">SEE ALL COURSES</button>
            </div>
        </div>
    );
};

export default Imgup;