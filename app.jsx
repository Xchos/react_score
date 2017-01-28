var PLAYERS = [
  {id: 1, name: "Lukáš Zelenka", score: 30},
  {id: 2, name: "Jan Novák", score: 35},
  {id: 3, name: "Jana Nováková", score: 32},
];
function Header(props) {
  return(
    <div className="header">
        <h1>{props.title}</h1>
      </div>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired
};

function Counter(props){
  return (
    <div className="counter">
      <button className="counter-action decrement">-</button>
      <div className="counter-score">{props.score}</div>
      <button className="counter-action increment">+</button>
    </div>
  );
}

Counter.propTypes = {
  score: React.PropTypes.number.isRequired,  
};

function Player(props) {
  return (
    <div className="player">
      <div className="player-name">{props.name}</div>
      <Counter score={props.score} />
    </div>
  );
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,  
};

function Application(props) {
  return (
    <div className="scoreboard">
      <Header title={props.title} />
      <div className="players"> 
        {props.players.map(function(player){
          return <Player name={player.name} score={player.score} key={player.id} />;
        })}
      </div>
    </div>
  );
}

Application.propTypes = {
  title: React.PropTypes.string,
  players: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
    id: React.PropTypes.number.isRequired    
  })).isRequired,
};

Application.defaultProps = {
  title: "Tabulka výsledků"
};

ReactDOM.render(<Application players={PLAYERS} />, document.getElementById('container'));