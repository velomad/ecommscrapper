import React from "react";
import { ButtonSize, ButtonType } from "../../themes/buttonTheme";

const Button = ({ size, type, children, transition }) => {
	return (
		<button
			className={`${ButtonType[type]} ${ButtonSize[size]}  ${
				transition && `transition duration-500 ease-in-out rounded-lg`
			}  `}
		>
			{children}
		</button>
	);
};

export default Button;
