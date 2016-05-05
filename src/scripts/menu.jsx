var React = require('react');

var Menu = React.createClass({
  getInitialState: function() {
    return ({
        myClass: "menu"
      })
    
  },
  
  getDefaultProps: function() {
    return ({
        items: [];
      })
  },
  
  componentWillReceiveProps: function() {
    
  },
  
  componentDidMount: fuction() {
    
  },
  
  render: function() {
    return
      <div className = { this.state.myID } >
        Here's a menu
      </div>
  }

});

module.exports = Menu;