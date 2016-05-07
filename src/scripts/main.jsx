var React   = require('react');
var SimType = require('./simType.jsx');


var App = React.createClass({
  
  render: function() {
    let content = "function " + "~Cfunc " + "getResume" + "~CfName " + "() {"  + "~l1 "
                  + "~cindent,comment " + "Here's some indented text "
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