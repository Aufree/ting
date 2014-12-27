  $(function() {
    if($("#particles").size()>0){
      (function() {
        var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;
        width = $('#canvas-bg').width();
        height= $('#canvas-bg').height();
        target = {x: 0, y: height};
        largeHeader = document.getElementById('canvas-bg');
        largeHeader.style.height = height+'px';
        canvas = document.getElementById('particles');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        circles = [];
        for(var x = 0; x < width*0.5; x++) {
          var c = new Circle();
          circles.push(c);
        }
        animate();
          window.addEventListener('resize',function(){
          width = window.innerWidth;
              canvas.width = width;
          });
          function animate() {
              if(animateHeader) {
                  ctx.clearRect(0,0,width,height);
                  for(var i in circles) {
                      circles[i].draw();
                  }
              }
              requestAnimationFrame(animate);
          }
          function Circle() {
              var _this = this;

              (function() {
                  _this.pos = {};
                  init();
              })();

              function init() {
                  _this.pos.x = Math.random()*width;
                  _this.pos.y = height+Math.random()*100;
                  _this.alpha = 0.1+Math.random()*0.3;
                  _this.scale = 0.1+Math.random()*0.3;
                  _this.velocity = Math.random();
              }

              this.draw = function() {
                  if(_this.alpha <= 0) {
                      init();
                  }
       
                  _this.pos.x -=0.1;
                  _this.pos.y -= _this.velocity;
                  _this.alpha -= 0.0005;
                  ctx.beginPath();
                  ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
                  ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
                  ctx.fill();
              };
          }
      })();
    }})