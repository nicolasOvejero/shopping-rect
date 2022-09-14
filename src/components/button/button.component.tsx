import { FC, ButtonHTMLAttributes } from 'react';
import { 
    BaseButton,
    InvertedButton,
    GoogleSignInButton
 } from './button.style';

export enum BUTTON_TYPES_CLASSES {
    base = 'base',
    google = 'google-sign-in',
    inverted = 'inverted',
}

const getButton = (buttonType = BUTTON_TYPES_CLASSES.base): typeof BaseButton =>
    ({
        [BUTTON_TYPES_CLASSES.base]: BaseButton,
        [BUTTON_TYPES_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPES_CLASSES.inverted]: InvertedButton,
    }[buttonType])
 
export type ButtonProps = {
    buttonType?: BUTTON_TYPES_CLASSES;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ 
    children,
    buttonType,
    ...otherProps
}) => {
    const CustomButton = getButton(buttonType);

    return (
        <CustomButton  {...otherProps}>
            { children }
        </CustomButton>
    );
}

export default Button;