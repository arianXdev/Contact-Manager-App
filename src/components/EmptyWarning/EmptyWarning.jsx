import "./EmptyWarning.css";

const EmptyWarning = () => {
	return (
		<div className="emptyWarning">
			<img src={require("../../assets/images/No-Data.gif")} alt="No Data" />
			<p>هیچ مخاطبی وجود ندارد...</p>
		</div>
	);
};

export default EmptyWarning;
