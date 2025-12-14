/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode:"class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
			colors:{
				time_bg:"#9135FA",
				time_text_bg:"#00FD32",
				next_btn_bg:"#F8504F",
				container_bg:"#C388BB",
				quiz_numb_bg:"#976EB5",
				white_bg:"#EFEEEF",
				red_bg:"#F8504F",
				green_bg:"#36C95B",
				black_color:{
					600:"#231527",
					800:"#0B090C",
				}

			}
    }
  },
  plugins: []
}
