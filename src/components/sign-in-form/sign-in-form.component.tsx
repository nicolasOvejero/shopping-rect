import { ChangeEvent, FormEvent, useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component";
import { SignInContainer, ButtonsContainer } from './sign-in-form.style';
import { useDispatch } from "react-redux";
import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const dispatch  = useDispatch();

    const resetFormField = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!password || !email) {
            alert("Password and Email are required");
            return;
        }

        try {
            dispatch(emailSignInStart(email, password));
            resetFormField();
        } catch (error) {
            console.log('user login encounter an error', error);
        }
    } 

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    const signInWithGoogleUser = async () => {
        dispatch(googleSignInStart());
    };

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                />

                <FormInput
                    label='Password'
                    type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                />
                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button
                        buttonType={BUTTON_TYPES_CLASSES.google}
                        type='button'
                        onClick={signInWithGoogleUser}
                    >
                        Sign In With Google
                    </Button>
            </ButtonsContainer>
            </form>
        </SignInContainer>
      );
}

export default SignInForm;