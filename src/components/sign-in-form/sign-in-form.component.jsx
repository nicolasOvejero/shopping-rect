import { useState } from "react";
import { signInAuthWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.style.scss';

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormField = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!password || !email) {
            alert("Password and Email are required");
            return;
        }

        try {
            const response = await signInAuthWithEmailAndPassword(email, password);
            console.log(response);
            resetFormField();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break
                default:
                    console.log('user login encounter an error', error);
            }
        }
    } 

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    const signInWithGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    return (
        <div className="sign-in-contianer">
            <h2>Already have an account ?</h2>
            <p>Sign in with you email and password</p>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />

                <FormInput 
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType='google' onClick={signInWithGoogleUser}>Google Sign in</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;