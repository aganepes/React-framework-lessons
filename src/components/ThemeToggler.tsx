import React from 'react'
import { useTheme } from '../hooks/useTheme'

function ThemeToggler() {
	const { state, dispatch } = useTheme();

	const handleToggle = () => {
		dispatch({ type: "TOGGLE_THEME" });
	}
	const isDark = state.theme === "dark";

	return (
		<div
			style={{
				padding: "20px",
				backgroundColor: isDark ? "#333" : "#f0f0f0",
				color: isDark ? "white" : "black",
				border: "1px solid gray",
				borderRadius: "8px"
			}}>
			<h2>Current Theme : ** {isDark ? "Dark" : "Light"}</h2>
			<button onClick={handleToggle}>
				Change to theme
			</button>
			<p style={{ marginTop: "15px" }}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nemo ratione possimus iste perspiciatis optio quod maiores officiis deserunt dolore, illo nam? Fuga quis aspernatur a saepe eveniet fugit quasi?
			</p>
		</div>
	)
}

export default ThemeToggler;