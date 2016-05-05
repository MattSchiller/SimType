var React = require('react');

//Given a string, this module simulates typing of that string into the div

var SimType = React.createClass({
  getInitialState: function() {
    return {
        typed:    ""
      , contentPos: -1
    }
  },
  
  getDefaultProps: function() {
    return {
        content: ""
      , options: {
            classes: false
          }
      }
  },
  
  componentDidMount: function() {
    this._charTimeout = 50;
    this._backTimeout = 100;
    this._escape      = "~";
    this._backspace   = "b";
    this._pause       = "p";
    this._openClass   = "c";
    this._closeClass  = "C";
    
    this.updateTyped();
  },
  
  componentDidUpdate: function() {
    this.updateTyped();
  },
  
  updateTyped: function() {
    if (this.state.contentPos >= this.props.content.length - 1) return;
    
    if (this._backspacing) return;
    
    var contentPos  = this.state.contentPos + 1
      , nextChar  = this.props.content[contentPos];
        
    if (this.props.content[contentPos] == this._escape) {
    //Let's attempt to execute the action command
    //Backspace: ~b#, # = number of backspaces
    //Pause:     ~p#, # = time in ms to wait
      if (contentPos + 1 < this.props.content.length) {
        contentPos++;
        
        let actionChar = this.props.content[contentPos];
        let value   = this.getValue( this.props.content.substring( contentPos,  this.props.content.length) )
          , digits  = value.toString().length;
          
        contentPos += digits;
        
        
        //Change this code to something similar to the keyhandlers thing
        switch (actionChar) {
          case this._backspace:
            this.backspace( value, contentPos );
            return;
          
          case this._pause:
            this.pause( value, contentPos );
            return;
          
          case this._openClass:
            this.beginClass( value, contentPos );
        }
            
      }
      
    }
    
    //We're appending a regular character or an errored escape char
    var typed = this.state.typed + nextChar
      , self  = this;
      
    setTimeout(function() {
        self.setState({
              typed
            , contentPos
          });
      }, self._charTimeout * Math.random() );
  },
  
  backspace: function(iterations, contentPos) {
    let typed = this.state.typed.slice(0, -1);
    
    if (typed.length == 0 || iterations == 1)
      //We're done backspacing after this call
      this._backspacing = false;
    else {
      
      this._backspacing = true;
      
      var self = this
        , nextIterations = iterations - 1;
        
      setTimeout(function() {
          self.backspace( nextIterations, contentPos )
        }, self._backTimeout)
    }
    
    this.setState({
        typed
      , contentPos
      });
  },
  
  pause: function( timeout, contentPos ) {
    var self = this;
    
    setTimeout(function() {
      self.setState({ contentPos })
    }, timeout)
  },
  
  getValue: function(str) {
    let myNum = str.match( /[0-9]+/ );
    if (myNum.length == 0) return 0;
    return parseInt( myNum[0] );
  },
  
  convertTyped: function() {
    return this.state.typed;
  },
  
  render: function() {
    return (
      <div >
        { this.convertTyped() }
      </div>
      )
  }
  
});

module.exports = SimType;