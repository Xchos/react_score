function Application(props) {
  return (
    <div className="scoreboard">
      <div className="header">
        <h1>{props.title}</h1>
      </div>
      
      <div className="player">
        <div className="player-name">Lukáš Zelenka</div>
        <div className="counter">
          <button className="counter-action decrement">-</button>
          <div className="counter-score">30</div>
          <button className="counter-action increment">+</button>
        </div>
      </div>

      <div className="player">
        <div className="player-name">Jan Novák</div>
        <div className="counter">
          <button className="counter-action decrement">-</button>
          <div className="counter-score">29</div>
          <button className="counter-action increment">+</button>
        </div>
      </div>
    </div>
  );
}

Application.propTypes = {
  title: React.PropTypes.string.isRequired
};

ReactDOM.render(<Application title="Tabulka výsledků" />, document.getElementById('container'));