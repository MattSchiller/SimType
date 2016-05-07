var React   = require('react');
var SimType = require('./simType.jsx');


var App = React.createClass({
  
  render: function() {
    let content = "~Cindent0~" + "function " + "~Cfunc~" + "getContactInfo" + "~CfuncName~" + "() {"  + "~l0~"
                  + "~Cindent1~"
                      + "var" + "~Cfunc~" + " email " + "~ckey~" + "= " + "~q+~" + "~p500~" + "matt.s.schiller@gmail.com" + "~q-~"
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