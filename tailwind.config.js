module.exports = {
	mode: 'jit',
	purge: ['./public/**/*.html', './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}'],
	plugins: [require('@tailwindcss/typography')],
};