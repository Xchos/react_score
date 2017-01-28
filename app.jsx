var PLAYERS = [
  {id: 1, name: "Lukáš Zelenka"},
  {id: 2, name: "Jan Novák"},
  {id: 3, name: "Jana Nováková"},
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


var Counter = React.createClass({
  propTypes: {},
  getInitialState: function() {
    return {
      score: 0
    }
  },
  render: function() {
    return (
      <div className="counter">
        <button className="counter-action decrement">-</button>
        <div className="counter-score">{this.state.score}</div>
        <button className="counter-action increment">+</button>
      </div>
    );
  }
});



function Player(props) {
  return (
    <div className="player">
      <div className="player-name">{props.name}</div>
      <Counter />
    </div>
  );
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
};

function Application(props) {
  return (
    <div className="scoreboard">
      <Header title={props.title} />
      <div className="players"> 
        {props.players.map(function(player){
          return <Player name={player.name} key={player.id} />;
        })}
      </div>
    </div>
  );
}

Application.propTypes = {
  title: React.PropTypes.string,
  players: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.number.isRequired    
  })).isRequired,
};

Application.defaultProps = {
  title: "Tabulka výsledků"
};

ReactDOM.render(<Application players={PLAYERS} />, document.getElementById('container'));