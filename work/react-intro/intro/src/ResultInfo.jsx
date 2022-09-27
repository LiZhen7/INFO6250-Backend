import { getResult } from './compare';

function ResultInfo({ word }) {
    return (
        <div className="resultInfo">
            {getResult(word) === "empty" && <p></p>}
            {getResult(word) === "invalid" && <p>"{word}" was not a valid word!</p>}
            {getResult(word) === "right" && <p>"{word}" is the secret word!</p>}
            {getResult(word) >= 0 && getResult(word) <= 5 && <p>"{word}" had {getResult(word)} letters in common.</p>}
        </div>
    );
}

export default ResultInfo;