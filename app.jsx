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

function Application(props) {
  return (
    <div className="scoreboard">
      <Header title={props.title} />
      <div className="players"> 
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
    </div>
  );
}

Application.propTypes = {
  title: React.PropTypes.string
};

Application.defaultProps = {
  title: "Tabulka výsledků"
};

ReactDOM.render(<Application />, document.getElementById('container'));