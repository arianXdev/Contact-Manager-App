import "./EmptyWarning.css";

const EmptyWarning = () => {
	return (
		<div className="emptyWarning">
			<img src={require("../../assets/images/No-Data.gif")} alt="No Data" />
			<p>هیج مخاطبی یافت نشد...</p>
		</div>
	);
};

export default EmptyWarning;
