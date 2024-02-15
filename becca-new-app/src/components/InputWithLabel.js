import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
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
					className={styles.input}
				></input>
				<button type="submit" className={styles.add}>
					Add To Do
				</button>
			</form>
		</>
	);
};
InputWithLabel.propTypes = {
	id: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
};
export default InputWithLabel;
