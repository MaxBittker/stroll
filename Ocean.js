  var husl = HUSL;
   //var click = new Audio('click.mp3');
  var Ocean = (function() {
      // Constant properties 
      // var width = 1200;
      // var height = 640;

       var canvas = document.getElementById('canvas'),
                context = canvas.getContext('2d');

        // resize the canvas to fill browser window dynamically
        window.addEventListener('resize', resizeCanvas, false);
        
        function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
             resizeCanvas();
      //var interval = 1000 / (60 /* fps */);
      var interval = 1000 / (25 /* fps */ );
      var frame = 1;
      //  var Xopen = [ 1, 1, -1,-1];
      // var Yopen	= [ -1, 1, 1,-1];	
      window.addEventListener("keydown", onKeyDown, false);
      // window.addEventListener("keyup", onKeyUp, false);
      var keyLeft = false,
          keyRight = false,
          keyDown = false,
          keyUp = true;
      // , keyUpE = false  
      // , keyLeftE = false
      // , keyDownE = false
      // , keyRightE = false;
      function KeyEvent(Boolean, keyCode) {
          switch (keyCode) {
              case 68: //d
                  keyRight = Boolean;
                  break;
              case 83: //s
                  keyDown = Boolean;
                  break;
              case 65: //a
                  keyLeft = Boolean;
                  break;
              case 87: //w
                  keyUp = Boolean;
                  break;
              case 39: //up
                  keyRight = Boolean;
                  break;
              case 40: //down
                  keyDown = Boolean;
                  break;
              case 37: //left
                  keyLeft = Boolean;
                  break;
              case 38: //up
                  keyUp = Boolean;
                  break;
          }
      }

      function onKeyDown(event) {
          var keyCode = event.keyCode;
          KeyEvent(true, keyCode);
          //console.log(keyLeft);
          //this.Ocean.step();
      }

      function Ocean(equation, canvas) {
          this.color = Math.random() * 360;
          this.canvas = canvas;
          // this.scale = 5 //canvas.getAttribute('width') / width;
          this.context = canvas.getContext('2d');
          this.imageData = this.context.createImageData(canvas.width , canvas.height );
          this.then = +Date.now();
          this.paused = false;
          this.drawFrame();
      }
      Ocean.prototype = {
          play: function() {
              this.paused = false;
              this.step();
          },
          pause: function() {
              this.paused = true;
          },
          step: function() {
              // Rerun the step() function every animation frame
              if (this.paused) return;
              requestAnimFrame(this.step.bind(this));
              var now = +Date.now();
              var delta = now - this.then;
              if (delta > interval) {
                  this.then = now;
                  this.drawFrame();
                  frame++;
              }
              // requestAnimFrame(this.step.bind(this));
              // this.drawFrame();
              // frame++;
              // keyUp = false;
              // keyLeft = false;
              // keyDown = false;
              // keyRight = false;
              // // }
          },
          WritePixel: function(i, color) {
              this.imageData.data[i] = Math.floor(color[0] * 255);
              this.imageData.data[i + 1] = Math.floor(color[1] * 255);
              this.imageData.data[i + 2] = Math.floor(color[2] * 255);
              this.imageData.data[i + 3] = 255;
          },
          drawFrame: function() {
              //console.log(this.frame);
              // this.context.fillRect(0, 0, 500, 500);
              // offset =5+ Math.round( (Math.sin(frame/3) *2)  + (Math.random()*60)) ; 
              // this.context.fillStyle = husl.p.toHex(40, 60, 2); ////t'#0010'+offset.toString(16);
              // this.context.fill();
              // this.context.scale(5,5);
              this.imageData = this.context.getImageData(0, 0, canvas.width, canvas.height);
              if (typeof(x) === 'undefined') {
                  x = canvas.width / 2;
                  y = canvas.height / 2;
              }
              // if(frame>1)
              // for (var x = 0; x < width; x++) {
              // for (var y = 0; y < height; y++) {
              // color = husl.p.toRGB(x, 100, 50);
              for (var i = 0; i < 500; i++) {
                  x += Math.floor((Math.random() * 3) - 1);
                  y += Math.floor((Math.random() * 3) - 1);
                  if (x<0) x+=canvas.width;
                  if (y<0) y+=canvas.height;
                  // console.log(Math.floor(Math.random()*3)-1);
                  color = husl.p.toRGB(this.color, 150, 50);
                  this.color += Math.floor(Math.random() * 3) - 1;
                  this.WritePixel(4 * (x % canvas.width + (y % canvas.height * canvas.width)), color);

                  this.WritePixel(4 * (x+1 % canvas.width + (y % canvas.height * canvas.width)), color);
                  this.WritePixel(4 * (x+2 % canvas.width + (y % canvas.height * canvas.width)), color);

                  this.WritePixel(4 * (x % canvas.width + (y+1 % canvas.height * canvas.width)), color);
                  this.WritePixel(4 * (x % canvas.width + (y+2 % canvas.height * canvas.width)), color);
              }
              // }
              // }
              this.context.putImageData(this.imageData, 0, 0);
          }
      };
      var requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
              window.setTimeout(callback, 0);
          };
      return Ocean;
  })();