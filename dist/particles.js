function createCanvas(){
    
    function Particle() {
    }

    Particle.prototype = {

        init: function( x, y, radius, color) {
            this.alive = true;

            this.x = x || 0.0;
            this.y = y || 0.0;
            this.radius = radius || 10;
            this.color = color || "#FFF";
            
            this.theta = random( TWO_PI );
            this.vx = sin( this.theta ) * random( 0, 2 );
            this.vy = cos( this.theta ) * random( 1, 3 );

            this.gx = 0;
            this.gy = 0.1;
        },

        move: function() {

            this.x += this.vx;
            this.y += this.vy;

            this.vx += this.gx;
            this.vy += this.gy;

            this.radius *= 0.95;
            this.alive = this.radius > 1;
        },

        draw: function( canvas ) {
            canvas.beginPath();
            canvas.arc( this.x, this.y, this.radius, 0, TWO_PI );
            canvas.fillStyle = this.color;
            canvas.fill();
        }
    };

    var MAX_PARTICLES = 280;
    var COLOURS = [ '#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423' ];
    
    var particles = [];
    var pool = [];
    var canvasWrapper = $("<div>")
        .css({
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            pointerEvents: "none",
            width: "100%",
            height: "100%"
        })
        .appendTo(document.body);
    var canvas = Sketch.create({
        container: canvasWrapper[0],
        type: Sketch.CANVAS
    });

    canvasWrapper.find("canvas").css({
        width: "100%",
        height: "100%"
    });
    

    canvas.draw = function() {
        canvas.globalCompositeOperation  = 'lighter';

        for ( var i = particles.length - 1; i >= 0; i-- ) {
            particles[i].draw( canvas );
        }
    }

    canvas.update = function() {

        var i, particle;

        for ( i = particles.length - 1; i >= 0; i-- ) {

            particle = particles[i];

            if ( particle.alive ) particle.move();
            else pool.push( particles.splice( i, 1 )[0] );
        }
    };

    canvas.spawnParticle = function( x, y ) {
        var particle, theta, force;

        if ( particles.length >= MAX_PARTICLES )
            pool.push( particles.shift() );

        particle = pool.length ? pool.pop() : new Particle();
        particle.init( x, y, random( 3, 7 ), random( COLOURS ));
        
        particles.push( particle );
    };
    
    return canvas;
}