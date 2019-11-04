<template>
  <div>
    <canvas id="duckwalk" width="500" height="500">
    </canvas>

    <!-- <svg style="width: 500px; height: 800px; background-color: #eee">
      <rect width="100" height="100" x="25" y="25" fill="orange" class="skippy"/>
    </svg> -->
    <button @click="changeColour">click</button>
  </div>
</template>

<script>
export default {
  name: "Scene",
  mounted: function() {
    // this.drawCanvas();
    // window.setInterval(this.drawCanvas, 50)
    window.requestAnimationFrame(this.drawCanvas);
  },
  props: {
    sentence: Object
  },
  data: function() {
    return {
      leftfoot: {
        path: 'm0,0c2.54427,10.27924 -0.93736,41.29121 14.06043,36.06448c14.9978,-5.22674 33.23712,-16.09266 36.1554,-11.49882c2.91829,4.59384 -6.63079,8.697 -3.21381,16.72555l7.12026,2.2827c4.10962,5.58941 -5.24554,6.27209 -7.12026,12.35216c0.26782,3.48449 12.3935,10.1548 0.80345,10.45348c-11.59005,0.29867 -39.63704,-1.85602 -45.74144,-7.9361c-4.22967,-2.6027 -5.96587,-9.62146 -8.20076,-14.18685l-13.54789,-50.006l19.68461,5.74941l0.00001,0l0,-0.00001z',
        startx: 279-50,
        starty: 288
      },
      rightfoot: {
        path: 'm0,0c2.54427,10.27924 -0.93736,41.29121 14.06043,36.06448c14.9978,-5.22674 33.23712,-16.09266 36.1554,-11.49882c2.91829,4.59384 -6.63079,8.697 -3.21381,16.72555l7.12026,2.2827c4.10962,5.58941 -5.24554,6.27209 -7.12026,12.35216c0.26782,3.48449 12.3935,10.1548 0.80345,10.45348c-11.59005,0.29867 -39.63704,-1.85602 -45.74144,-7.9361c-4.22967,-2.6027 -5.96587,-9.62146 -8.20076,-14.18685l-13.54789,-50.006l19.68461,5.74941l0.00001,0l0,-0.00001z',
        startx: 223+20,
        starty: 295-15
      },
      body: {
        path: 'm0,0c6.45266,29.37629 29.86231,27.8698 49.07023,66.4356c19.20791,38.56579 21.00866,51.82278 4.50186,76.83029c-16.5068,25.00751 -44.11819,40.67485 -82.83414,43.38651c-38.71596,2.71166 -75.93129,0.30129 -106.24379,-13.55829c-30.3125,-13.85958 -62.72586,-36.15543 -90.03711,-63.272c-27.31125,-27.11658 -51.02104,-67.79143 -71.12932,-103.04297c36.31496,5.42331 76.83167,32.53989 110.74565,23.50103c33.91398,-9.03886 94.83909,-8.73756 104.44305,-10.84663c9.60396,-2.10906 20.10828,-8.73756 28.81188,-19.88549l52.67171,0.45194l-0.00002,0.00001z',
        startx: 303,
        starty: 121
      },
      head: {
        path: 'm0,0c16.40867,2.91673 56.72884,19.40517 66.24465,29.64347c9.5158,10.2383 -4.8799,32.61972 16.10368,37.85793c20.98358,5.2382 -1.62953,17.07882 9.80774,25.12518c11.43727,8.04635 -12.26507,12.37113 1.03265,8.94845c26.59546,-6.84537 -3.53333,1.13887 -9.89005,5.18922c-6.35672,4.05034 12.78151,-9.69114 -0.71447,-5.84433l8.54793,-1.27499l12.44374,10.89308l-6.58787,-1.96432c5.12389,2.64886 -9.02782,0.29763 -5.85588,2.94649l7.31986,1.51789c-1.21998,8.36327 -24.90584,-13.64652 -10.75412,-5.25349c14.15171,8.39303 -1.44563,5.90827 -29.50505,10.43216c-28.05942,4.5239 -74.17448,9.0478 -83.44629,5.7144c-9.27181,-3.33342 -27.52568,-5.015 -41.65452,-34.04088c-14.12883,-29.02589 -9.61493,-39.79993 -5.19253,-53.10377c4.42241,-13.30384 12.56575,-21.78616 25.07049,-28.39344c12.50475,-6.60729 30.62137,-11.30975 47.03005,-8.39303l-0.00002,-0.00001l0.00002,0.00001l-0.00001,-0.00002z',
        startx: 263,
        starty: 6
      },
      bottomLip: {
        path: 'm0,0c6.91202,6.04632 39.24106,27.02534 38.98016,26.75948c-0.13045,-0.13293 2.97495,6.77028 -3.30453,8.09839c-6.27947,1.32812 -9.50384,0.28576 -16.08496,-2.93081c-6.58112,-3.21658 -5.38907,-1.1295 -12.59978,-5.92234l-6.35895,-1.93085c-4.45984,-0.30725 -4.0153,4.72216 -12.69713,-5.7723c-8.68182,-10.49446 -4.74777,-27.4578 -4.87822,-27.59072c-0.13045,-0.13293 5.6974,9.17057 9.97715,8.92043l6.96626,0.36874l-0.00001,-0.00002l0.00001,0l0.00001,0l-0.00001,-0.00001l0,0.00001z',
        startx: 354,
        starty: 95
      },
      topLip: {
        path: 'm0,0c5.67932,-2.06036 9.68153,-0.89772 20.42578,2.68669c10.74425,3.58442 13.68149,4.19758 20.86813,4.18417c7.18664,-0.01341 12.93152,5.44664 16.58566,2.72332c5.938,-1.21036 9.8553,-2.87015 14.58088,-3.18167c4.72557,-0.31153 -2.82899,8.92198 -10.36568,10.01233c-7.53669,1.09035 -13.36846,9.92295 -25.94747,6.81277c-12.57902,-3.11018 -30.54295,-0.43601 -33.29152,-3.62216c-2.74857,-3.18615 -8.53511,-17.55509 -2.85578,-19.61545l0,0.00001l0,-0.00001z',
        startx: 333,
        starty: 75
      },
      tick: 0
    }
  },
  methods: {
    drawCanvas() {
      var ctx = document.getElementById('duckwalk').getContext('2d');
      this.tick = this.tick < 0 ? 90 : this.tick-1;
      ctx.clearRect(0, 0, 500, 500)

      ctx.font = '48px serif';
      ctx.fillText(this.tick, 10, 50)
      var radians = (Math.PI/180)*((this.tick*4));
      ctx.fillText(Math.round(radians), 60, 50);
      var radians2 = (Math.PI/180)*((this.tick*4))
      ctx.fillText(Math.round(radians2), 100, 50);

      var leftLeg = new Path2D(this.leftfoot.path);
      ctx.save();
      ctx.translate(this.leftfoot.startx + (Math.sin(radians)*25),this.leftfoot.starty+ (Math.cos(radians) * 20));
      ctx.rotate(radians > Math.PI ? (2*Math.PI-radians)/4 : radians / 4);
      ctx.fillStyle = 'rgb(200, 0, 0)';
      ctx.fill(leftLeg);
      ctx.restore();

      var rightLeg = new Path2D(this.rightfoot.path);
      ctx.save();
      ctx.translate(this.rightfoot.starty + (Math.sin(radians2)*25), this.rightfoot.starty + (Math.cos(radians2) * 20));
      ctx.rotate(radians2 > Math.PI ? (2*Math.PI-radians2)/4 : radians2 / 4);
      ctx.fillStyle = 'rgb(200, 100, 0)';
      ctx.fill(leftLeg);
      ctx.restore();

      var head = new Path2D(this.head.path);
      ctx.save();
      ctx.translate(this.head.startx, this.head.starty+ (Math.cos(radians) * 15) + (Math.cos(radians2) * 10));
      ctx.fillStyle = '#ffff56';
      ctx.fill(head);
      ctx.restore();

      var bottomLip = new Path2D(this.bottomLip.path);
      ctx.save();
      ctx.translate(this.bottomLip.startx, this.bottomLip.starty + (Math.cos(radians) * 15) + (Math.cos(radians2) * 10));
      ctx.fillStyle = '#ffaa56';
      ctx.fill(bottomLip);
      ctx.restore();

      var topLip = new Path2D(this.topLip.path);
      ctx.save();
      ctx.translate(this.topLip.startx, this.topLip.starty + (Math.cos(radians) * 15) + (Math.cos(radians2) * 10));
      ctx.fillStyle = '#ffaa56';
      ctx.fill(topLip);
      ctx.stroke();
      ctx.restore();

      var body = new Path2D(this.body.path);
      ctx.save();
      ctx.translate(this.body.startx, this.body.starty+ (Math.cos(radians) * 15) + (Math.cos(radians2) * 10));
      ctx.fillStyle = '#ffff56';
      ctx.fill(body);
      ctx.restore();

      window.requestAnimationFrame(this.drawCanvas);
    }
  }
};
</script>

<style>

canvas {
  border: 1px solid black;
}

/* .leg_front_left { */
/* .leg_front_left { */
#svg_25 {
  animation: eating 5s infinite
  /* transition: all 2s ease-in-out; */
}

@keyframes eating {
  from {}

  50% {
   transform-origin: 50% 50%;
   /* transform: translateY(0px) rotate3d(0,0,0.1,180deg); */
   transform: rotate(90deg);
   /* transform: rotateX(90deg); */
  }

  to {}
}

/* .rotate {
} */

.bordered {
  border: 5px solid red;
}

.skippy {
  animation: skippyturn 5s infinite
  /* transform-origin: 50% 50%;
  transform: rotate(45deg); */
}

@keyframes skippyturn {
  from {}

  50% {
    transform-origin: 50% 50%;
    transform: rotate(90deg);
  }

  to {}
}
</style>