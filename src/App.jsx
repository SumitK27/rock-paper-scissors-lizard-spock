import React, { useState } from "react";
import "./styles.css";

import rock from "./assets/rock.png";
import paper from "./assets/paper.png";
import scissors from "./assets/scissors.png";
import lizard from "./assets/lizard.png";
import spock from "./assets/spock.png";
import trophy from "./assets/trophy.png";

const Button = (props) => {
    return (
        <div value={props.name} onClick={props.onClick}>
            <img className="user-selection-img" src={props.img} alt="img" />
        </div>
    );
};

export default function App() {
    const [game, setGame] = useState({
        name: "You",
        gameStarted: false,
        userSelection: "",
        pcSelection: "",
        round: 0,
        userScore: 0,
        pcScore: 0,
        message: "",
    });

    const reset = () => {
        setGame({
            ...game,
            round: 0,
            userSelection: "",
            pcSelection: "",
            userScore: 0,
            pcScore: 0,
            message: "",
        });
    };

    const playGame = (e) => {
        const user = e.target.parentNode.getAttribute("value");
        const pc = ["Rock", "Paper", "Scissors", "Lizard", "Spock"][
            Math.floor(Math.random() * 5)
        ];

        if (user === pc) {
            setGame({
                ...game,
                message: (game.message = "It's a tie!"),
            });
        } else if (
            (user === "Scissors" && pc === "Paper") ||
            (user === "Paper" && pc === "Rock") ||
            (user === "Rock" && pc === "Lizard") ||
            (user === "Lizard" && pc === "Spock") ||
            (user === "Spock" && pc === "Scissors") ||
            (user === "Scissors" && pc === "Lizard") ||
            (user === "Lizard" && pc === "Paper") ||
            (user === "Paper" && pc === "Spock") ||
            (user === "Spock" && pc === "Rock") ||
            (user === "Rock" && pc === "Scissors")
        ) {
            setGame({
                ...game,
                userScore: (game.userScore += 1),
                message: (game.message = "You won!"),
            });
        } else {
            setGame({
                ...game,
                pcScore: (game.pcScore += 1),
                message: (game.message = "You lost!"),
            });
        }

        setGame({
            ...game,
            round: (game.round += 1),
            userSelection: user,
            pcSelection: pc,
        });
    };

    return (
        <div className="App">
            <h1 className="title">Rock, paper, scissors, lizard, spock!</h1>
            <h1 className="rounds">
                {game.userSelection === ""
                    ? "No rounds yet!"
                    : `Round: ${game.round}`}
            </h1>

            <div className="play-box">
                <div className="box user-box">
                    <h1>{game.name}</h1>
                    {game.userScore < 3 ? (
                        <>
                            <div className="user-selection">
                                <Button
                                    name="Rock"
                                    onClick={game.pcScore < 3 ? playGame : ""}
                                    img={rock}
                                />
                                <Button
                                    name="Paper"
                                    onClick={game.pcScore < 3 ? playGame : ""}
                                    img={paper}
                                />
                                <Button
                                    name="Scissors"
                                    onClick={game.pcScore < 3 ? playGame : ""}
                                    img={scissors}
                                />
                                <Button
                                    name="Lizard"
                                    onClick={game.pcScore < 3 ? playGame : ""}
                                    img={lizard}
                                />
                                <Button
                                    name="Spock"
                                    onClick={game.pcScore < 3 ? playGame : ""}
                                    img={spock}
                                />
                            </div>
                            <h3>
                                {game.userSelection === ""
                                    ? "Pick one!"
                                    : `Your choice: ${game.userSelection}`}
                            </h3>
                        </>
                    ) : (
                        <>
                            <img src={trophy} alt="img" />
                            <h3>Victory!</h3>
                        </>
                    )}
                </div>
                <div className="message-box">
                    {game.userSelection === "" ? (
                        <h1>VS</h1>
                    ) : (
                        <>
                            <h3 className="message">{game.message}</h3>
                        </>
                    )}
                </div>

                <div className="box pc-box">
                    <h1>Computer</h1>
                    {game.pcScore < 3 ? (
                        game.userSelection === "" ? (
                            <h3>Waiting for your selection!</h3>
                        ) : (
                            <>
                                <img
                                    className="pc-selection-img"
                                    src={
                                        game.pcSelection === "Rock"
                                            ? rock
                                            : game.pcSelection === "Paper"
                                            ? paper
                                            : game.pcSelection === "Scissors"
                                            ? scissors
                                            : game.pcSelection === "Lizard"
                                            ? lizard
                                            : spock
                                    }
                                    alt="img"
                                />
                                <h3>PC selected: {game.pcSelection}</h3>
                            </>
                        )
                    ) : (
                        <>
                            <img src={trophy} alt="img" />
                            <h3>Victory!</h3>
                        </>
                    )}
                </div>
            </div>
            <div className="score-box">
                <h1>{game.userScore}</h1>
                <div />
                <h1>{game.pcScore}</h1>
            </div>
            {game.userSelection !== "" && (
                <div onClick={reset} className="reset-btn">
                    <h3>
                        {game.userScore === 3 || game.pcScore === 3
                            ? "Play again"
                            : "Reset"}
                    </h3>
                </div>
            )}
        </div>
    );
}
