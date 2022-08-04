const formatNumberWithCommas = (text: number | string) => {
	return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default formatNumberWithCommas;
