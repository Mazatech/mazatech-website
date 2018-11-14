/* sweetScroll load */
document.addEventListener("DOMContentLoaded", function () {
  const sweetScroll = new SweetScroll({/* some options */});

  /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
  particlesJS('particles-js', {
    "particles": {
    "number": {
      "value": 60,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ff1010"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 5,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 10,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 200,
      "color": "#ffffff",
      "opacity": 0.25,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 256,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 128,
        "size": 64,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 1
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

}, false);
