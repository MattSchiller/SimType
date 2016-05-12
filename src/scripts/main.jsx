var React   = require('react');
var SimType = require('./SimType/simType.jsx');
var Menu    = require('./menu.jsx');

var About       = require('./pages/about.js');
var SampleJS    = require('./pages/sampleJS.js');
var SampleStyle = require('./pages/sampleStyle.js');

var App = React.createClass({
  getInitialState: function() {
    return {
        menuIndex: 0
      , menuItems: [ "about.html"
                   , "sampleJS.js"
                   , "sampleStyle.css"]
      , content:   [ [ About ]
                   , SampleJS
                   , [ SampleStyle ]
                   ]
    }
  },
  
  menuClick: function(menuIndex) {
    if (menuIndex != this.state.menuIndex)
      this.setState({ menuIndex });
  },
  
  render: function() {
    let pages = this.state.content.map( function(content, i) {
        let myElements = [];
        for (let eachContent of content) {
          myElements.push(
              <SimType content    = { eachContent }
                       options    = { {
                                        show:     i == this.state.menuIndex } }
                       key        = { i + myElements.length }
                />
            )
        }
        return myElements;
      }.bind(this) );
    
    return (
      <div>
        <div id = "header">
          <h2 onClick = { function() {
              this.menuClick(0) }.bind(this) }
            >Sim Type</h2>
          <Menu
            items   = { this.state.menuItems }
            clicked = { this.menuClick }
            currInd = { this.state.menuIndex }
            />
        </div>
        <div id = "codePages">
        { pages }
        </div>
      </div>
      )
  }

});
//**********************************Page initialization
ReactDOM.render(
  <App />,
  document.getElementById('content')
);