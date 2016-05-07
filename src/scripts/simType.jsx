var React       = require('react');
var TypedBucket = require('./typedBucket.js');

//Given a string, this module simulates typing of that string into the div

var SimType = React.createClass({
  getInitialState: function() {
    return {
        contentPos: -1
      , typed: [ new TypedBucket() ]
    }
  },
  
  getDefaultProps: function() {
    return {
        content: ""
      , options: {
            classes: true
          }
      }
  },
  
  componentDidMount: function() {
    this._charTimeout = 50;
    this._backTimeout = 100;
    this._escape      = "~";
    this._qChar       = '"';
    this._newLine     = "line";
    this._indent      = "indent";
    
    this.updateTyped();
  },
  
  componentDidUpdate: function() {
    this.updateTyped();
  },
  
  updateTyped: function() {
    if (this.state.contentPos >= this.props.content.length - 1) return;
    
    if (this._backspacing) return;
    
    var contentPos  = this.state.contentPos + 1
      , nextChar    = this.props.content[contentPos];
        
    if (nextChar == this._escape) {
    //Let's attempt to execute the action command
      if (contentPos + 1 < this.props.content.length) {
        contentPos ++;
        
        let actionChar = this.props.content[ contentPos ];
        this.attemptAction( actionChar, contentPos );
      }
      
      return;
    }
    
    //We're appending a regular character or an errored escape char
    var typed = this.state.typed
      , self  = this;
    
    if (this._quoting) {    //Insert next char befor trailing space
      let text = typed[ typed.length-1 ].text
        , len  = text.length;
      
      typed[ typed.length-1 ].text = text.slice(0, -1) + nextChar + text.slice(len-1);
    
    } else
      typed[ typed.length-1 ].text += nextChar;
    
    setTimeout(function() {
        self.setState({ typed, contentPos });
      }, self._charTimeout * Math.random() );
  },
  
  attemptAction: function(action, contentPos) {
    //Backspace: ~b#, # = number of backspaces
    //Pause:     ~p#, # = time in ms to wait
    if (this.escapedActions[ action ]) {
      contentPos++;
      let value   = this.getValue( contentPos )
        , digits  = value.toString().length;
      
      contentPos += digits;
      this.escapedActions[ action ].call( this, value, contentPos );
    }
  },
  
  getValue: function(contentPos) {
    let str = this.props.content.substring( contentPos,  this.props.content.length)
      , val = str.match( /[^~]+/ );
      
    if (val.length == 0) return false;
    return val[0];
  },
  
  escapedActions: {
    b: function( iterations, contentPos ) {
      //Backspace
      let typed    = this.state.typed
        , typedPos = typed.length - 1;
      
      iterations = parseInt( iterations );

      if (Number.isInteger(iterations)) {
      
        typed[ typedPos ].text = typed[ typedPos ].text.slice(0, -1);
        
  //RIGHT NOW WE LIMIT BEHAVIOR TO NEVER ALLOW BACKSPACING MORE THAN THE CURRENT TEXT BUCKET
        
        //Check if this text bucket is empty
        if (typed[ typedPos ].text.length == 0 || iterations == 1) {
          //We're done backspacing after this call
          this._backspacing = false;
          if (typed[ typedPos ].text.length != 0) typed.push[ new TypedBucket ];
        
        } else {
          this._backspacing = true;
          
          var self = this
            , nextIterations = iterations - 1;
            
          setTimeout(function() {
              self.escapedActions.b.call( self, nextIterations, contentPos )
            }, self._backTimeout)
        }
      }
      
      this.setState({ typed, contentPos });
    },
  
    p: function( timeout, contentPos ) {
      //Pause
      var self = this;
      
      timeout = parseInt( timeout );
      
      setTimeout(function() {
          self.setState({ contentPos })
        }, timeout)
    },
    
    c: function( classVal, contentPos ) {
      //Creates a new typedBucket for this new piece of text and applies the class immediately
      let typed = this.state.typed
        , typedPos = typed.length;
        
      typed.push( new TypedBucket( "", classVal ) );
      
      this.setState({ typed, contentPos});
    },
    
    C: function( classVal, contentPos ) {
      //Closes the current typedBucket and applies the given class
      let typed = this.state.typed
        , typedPos = typed.length - 1;
      
      typed[ typedPos ].className += typed[ typedPos ].className == "" ? classVal : " " + classVal;
      typed.push( new TypedBucket );
      
      this.setState({ typed, contentPos });
    },
    
    l: function( immaterial, contentPos) {
      //Inserts the number of line breaks specified
      let typed = this.state.typed
        , typedPos = typed.length;
      
      typed.push( new TypedBucket );
      typed[ typedPos ].className = this._newLine;
      typed.push( new TypedBucket );
      
      var self = this;
      setTimeout(function() {
          self.setState({ typed, contentPos });
        }, self._charTimeout);
    },
    
    q: function( onOrOff, contentPos ) {
      //Adds a double quotes and conveys that there is a trailing quotation mark
      let typed = this.state.typed;
      
      if (onOrOff == '+') {
        this._quoting = true;
        typed.push( new TypedBucket( this._qChar + this._qChar, "str" ));
      } else this._quoting = false;
      
      this.setState({ typed, contentPos });
      
    },
    
  },

  convertTyped: function() {
    let typed = this.state.typed
      , j = 0
      , formattedTyped = [];
      
    while (j < typed.length) {
      if (~typed[ j ].className.indexOf( this._indent ) ) {
        //Get the className etc for this div
        let thisLineClass = typed[j].className
          , lineContents = [];
        
        j++;
        //Build the spans for the line's contents
        while ( j < typed.length && typed[j].className != this._newLine) {
          lineContents.push( this.toSpan( typed[j], j ) );
          j++;
        }
        
        formattedTyped.push(
          <div
            className = { thisLineClass }
            key = { j }
              >
            { lineContents }
          </div>
          )
      } else {
        formattedTyped.push( this.toSpan( typed[j], j ) );
      }
      
      j++;
    }
    
    return formattedTyped;
  },
  
  toSpan: function(segment, j) {
    return <span
              className = { segment.className }
              key = { j } >
                { segment.text }
           </span>
  },
  
  render: function() {
    let myClass = "thisClass";
    return (
      <div >
        { this.convertTyped() }
      </div>
      )
  }
  
});

module.exports = SimType;