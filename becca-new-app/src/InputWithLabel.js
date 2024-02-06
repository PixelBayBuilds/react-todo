import React, { useRef, useEffect } from "react";
import styles from "./InputWithLabel.module.css";

const InputWithLabel = ({ id, children, value, onChange, onSubmit }) => {
	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	});

	return (
		<>
			<form onSubmit={onSubmit}>
				<label htmlFor={id}>{children}</label>
				<input
					type="text"
					name="title"
					id={id}
					value={value}
					onChange={onChange}
					ref={inputRef}
				></input>
				<button type="submit" className={styles.add}>
					Add To Do
				</button>
			</form>
		</>
	);
};
export default InputWithLabel;
