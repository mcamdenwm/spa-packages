/**
 * Simple string replacement. Takes a string like,
 * "Hello ${0}, ${1}" and replaces the tokens with the
 * values passed from the arguments list.
 * Remove/Replace once we have translations.
 * @param {String} str
 * @param {String} ...n
 * @return {String}
 */
const formatString = (str, ...rest) => {
	let result = str;

	rest.forEach((n, i) => {
		result = result.replace(`\${${i}}`, n);
	});

	return result;
};

export {
	formatString,
};
