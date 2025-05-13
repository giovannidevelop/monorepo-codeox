import { FcGoogle } from "react-icons/fc";
import { CiFacebook } from "react-icons/ci";
import "./authButton.scss"

const AuthButton = ({ text }) => {

    const responseGoogle = (response) => {
        console.log('responseGoogle');
        console.log(response);
    }
    const responseFacebook = (response) => {
        console.log('responseFacebook');
        console.log(response);
    }

    return (
        <div className="auth-button">
            <button onClick={() => responseGoogle()} className="auth-button-google">
                <FcGoogle className="auth-button-google-icon" />
                {text} con Google.
            </button>

            <button className="auth-button-facebook" onClick={responseFacebook}>
                <CiFacebook className="auth-button-facebook-icon" />
                <span>{text} con Facebook.</span>
            </button>

        </div>
    );
}

export default AuthButton;