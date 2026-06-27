import { Link } from "react-router-dom";
import ProgressChart from "../progress-chart/ProgressChart";
import "./ProgressCard.css";

function ProgressCard({
    data,
    link,
    buttonText,
}) {
    return (

        <section className="card">

            <h2>{data.title}</h2>

            <div className="progress-content">

                <ProgressChart
                    data={data}
                />

                {

                    <div className="progress-topics">

                        {data.segments.map((segment) => (

                            <div
                                className="topic-progress-row"
                                key={segment.label}
                            >

                                <span className="topic-name">
                                    {segment.label}
                                </span>

                                <span className="topic-percentage">
                                    {segment.percentage}%
                                </span>

                                <span className="topic-count">
                                    {segment.completed} / {segment.total}
                                </span>

                            </div>
                        ))}
                    </div>
                }

            </div>

            {buttonText && (

                <Link to={link}>

                    <button className="continue-btn">
                        {buttonText}
                    </button>

                </Link>

            )}
        </section>

    );
}
export default ProgressCard;