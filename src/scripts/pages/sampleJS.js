var SampleJS = [
  {
    stub: "~Cindent0~~ccomment~// Ahh, good ole JavaScript formatting~l0~"
        + "~Cindent0~~l0~"
        + "~Cindent0~~ccomment~// Let's see what a simple function might look like with the context highlighting doing it's thing:~l0~"
        
    , writing:
        "~Cindent0~function~Cfunc~ superImportantMethod~CfuncName~(~carg~meaningOfLife = 42~c0~) {~l0~"
        + "~Cindent1~var~Cfunc~ ultimateQ ~ckey~= ~q+~What is six times seven?~q-~~c0~;~l0~"
      + "~Cindent0~}"
  }
  , {
    stub: "~Cindent0~~l0~"
        + "~Cindent0~~ccomment~/* So here we have multiple blocks of simulated code, but in order to keep the line numbers on the left from restaarting, the source for this page has been primed with a 'numStart' variable. It's simply the number of linebreaks in the previous SimType.~l0~"
        + "~Cindent0~~ccomment~You know, I should code in a means for the SimType component to just figure that out on its own!~l0~"
        + "~Cindent0~~l0~"
        
    , writing:  "~Cindent0~function~Cfunc~ writeAutoNumLine~CfuncName~() {~l0~"
   + "~p350~" + "~Cindent1~"
                  + "var~Cfunc~ updateDate ~ckey~= ~c0~new~Ckey~ Date(~q+~1/1/2017~q-~);~l0~"
                  
              + "~Cindent1~if~Cfunc~ (~c0~Date~Cfunc~.now() ~ckey~>=~c0~ updateDate)~l0~"
                + "~Cindent2~console.~c0~log~Cfunc~(~q+~Hey Matt! Come make these fixes already!~q-~);~l0~"
              + "~Cindent1~else~Cfunc~ {~l0~"
                + "~Cindent2~setTimeout({ ~c0~function~Cfunc~() {~l0~"
                  + "~Cindent3~writeAutoNumLine();~l0~"
                + "~Cindent2~}, 10000})~l0~"
              + "~Cindent0~}"
    , numStart: 9

   }
];

module.exports = SampleJS;