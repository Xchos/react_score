var PLAYERS = [
  {id: 1, name: "Lukáš Zelenka", score: 30},
  {id: 2, name: "Jan Novák", score: 35},
  {id: 3, name: "Jana Nováková", score: 32},
];

var nextId = PLAYERS.lenght+1;

var AddPlayerForm = React.createClass({
  propTypes: {
    onAdd: React.PropTypes.func.isRequired,  
  },

  getInitialState: function() {
    return {
      name: "",
    }
  },

  onNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  
  onSubmit: function(e) {
      e.preventDefault();  

      this.props.onAdd(this.state.name);
      this.setState({name: ""});
  },
  
  render: function() {
    return (
      <div className="add-player-form">
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.name} onChange={this.onNameChange} />
          <input type="submit" value="Přidat" />
        </form>
      </div>
    );
  }
});



function Stats(props) {
  var totalPlayers = props.players.length;
  var totalScore = props.players.reduce(function(total, player){
    return total + player.score;
  }, 0);

  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Hráči</td>
          <td>{totalPlayers}</td>
        </tr>
        <tr>
          <td>Celkové skóre</td>
          <td>{totalScore}</td>
        </tr>
      </tbody>
    </table>
  );
};

Stats.propTypes = {
  players: React.PropTypes.array.isRequired,
};

function Header(props) {
  return(
    <div className="header">
        <Stats players={props.players} />
        <h1>{props.title}</h1>
      </div>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  players: React.PropTypes.array.isRequired,
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
      <a className="remove-player-ex" onClick={props.onRemove}>X</a>
      <div className="player-name">{props.name}</div>
      <Counter score={props.score} onChange={props.onScoreChange}/>
    </div>
  );
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired,
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

  onPlayerAdd: function(name) {
    this.state.players.push({
      name: name,
      score: 0,
      id: nextId,
    });
    this.setState(this.state);
    nextId++;
  },

  onRemovePlayer: function(index) {
    this.state.players.splice(index, 1);
    this.setState(this.state);
  },

  render: function() {
    return (
      <div className="scoreboard">
        <Header title={this.props.title} players={this.state.players} />
        <div className="players"> 
          {this.state.players.map(
            function(player, index){
              return (
                <Player 
                  onScoreChange={function(delta) {this.onScoreChange(index, delta)}.bind(this)}
                  name={player.name}
                  key={player.id}
                  score={player.score}
                  onRemove={function() {this.onRemovePlayer(index)}.bind(this)}
                />
              );
            }.bind(this)
          )}
        </div>
        <AddPlayerForm onAdd={this.onPlayerAdd} />
      </div>
    );
  }
});


ReactDOM.render(<Application initialPlayers={PLAYERS} />, document.getElementById('container'));