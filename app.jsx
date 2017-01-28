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




function Counter(props) {
    return (
      <div className="counter">
        <button className="counter-action decrement" onClick={function(){props.onChange(-1);}} >-</button>
        <div className="counter-score">{props.score}</div>
        <button className="counter-action increment" onClick={function(){props.onChange(1);}} >+</button>
      </div>
    );
}

Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
}


function Player(props) {
  return (
    <div className="player">
      <div className="player-name">{props.name}</div>
      <Counter score={props.score} onChange={props.onScoreChange}/>
    </div>
  );
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired,
};

var Application = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      id: React.PropTypes.number.isRequired,    
      score: React.PropTypes.number.isRequired,    
    })).isRequired,
  },

  getDefaultProps: function() {
    return {
      title: "Tabulka výsledků",
    }
  },

  getInitialState: function() {
    return {
      players: this.props.initialPlayers,
    };
  },
  
  onScoreChange: function(index, delta) {
    this.state.players[index].score += delta;
    this.setState(this.state);
  },

  render: function() {
    return (
      <div className="scoreboard">
        <Header title={this.props.title} />
        <div className="players"> 
          {this.state.players.map(
            function(player, index){
              return (
                <Player 
                  onScoreChange={function(delta) {this.onScoreChange(index, delta)}.bind(this)}
                  name={player.name}
                  key={player.id}
                  score={player.score}
                />
              );
            }.bind(this)
          )}
        </div>
      </div>
    );
  }
});


ReactDOM.render(<Application initialPlayers={PLAYERS} />, document.getElementById('container'));