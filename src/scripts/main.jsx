var React   = require('react');
//Menu    = require('./menu.jsx');
var SimType = require('./simType.jsx');


var App = React.createClass({
  
  render: function() {
    let content = "Lorem ipsu" + "~p600" + "m dolor sit amet,~b2 consectetur adipiscing elit, "
                + "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad "
                + "minim veniam, ~b10quis nostrud exercitation ullamco laboris nisi ut aliquip ex"
                + "ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit"
                + "esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat~b2"
                + "non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      , options = { classes: true }
    return <SimType
              content = { content }
              options = { options }
          />
  }

});
//**********************************Page initialization
ReactDOM.render(
  <App />,
  document.getElementById('content')
);