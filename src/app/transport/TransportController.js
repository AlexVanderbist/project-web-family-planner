angular.module('app')
  .controller('TransportController', TransportController);

/** @NgInject */
function TransportController(DelijnService, $log, $window, $rootScope, ScreenConfigService, $scope) {

  // TODO: Preload the bus schedule before changing to slide

  var vm = this;

  // sketch stuff
  var Building, Skyline, dt, sketch, skylines, colors;
  sketch = Sketch.create({
    container: document.getElementById('city-bg'),
    fullscreen: false,
    width: 800,
    height: 400
  });
  sketch.speed = 120;
  sketch.viewHeight = sketch.height;
  skylines = [];
  dt = 1;
  colors = ['#e2e9f1', '#bdceea', '#96b3d3', '#839fc4', '#3e617f'];

  vm.nextBusses = [];

  vm.formatDepartureTime = function (time) {
    if(! time) return null;

    if(time.search('\'')) return time.replace('\'','');
    else return time;
  };

  function _init() {
    $log.debug('TransportController loaded!');

    DelijnService.getNextBusses(ScreenConfigService.screenConfig.busstop).then(
      function successResponse(response) {
        if(response.data && response.data.lijnen) {
          vm.nextBusses = response.data.lijnen;
        } else {
          // $rootScope.nextSlide();
          vm.notice = "No busses driving right now";
        }
      },
      function errorResponse(response) {
        $rootScope.nextSlide();
      });

    $rootScope.$on('$stateChangeStart', sketch.destroy);
  }
  _init();


  // TODO: Move sketch stuff for bg to a directive
  Building = function (config) {
    return this.reset(config);
  };
  Building.prototype.reset = function (config) {
    this.layer = config.layer;
    this.x = config.x;
    this.y = config.y;
    this.width = config.width;
    this.height = config.height;
    this.color = config.color;
    this.slantedTop = floor(random(0, 10)) === 0;
    this.slantedTopHeight = this.width / random(2, 4);
    this.slantedTopDirection = round(random(0, 1)) === 0;
    this.spireTop = floor(random(0, 15)) === 0;
    this.spireTopWidth = random(this.width * 0.01, this.width * 0.07);
    this.spireTopHeight = random(10, 20);
    this.antennaTop = !this.spireTop && floor(random(0, 10)) === 0;
    this.antennaTopWidth = this.layer / 2;
    return this.antennaTopHeight = random(5, 20);
  };
  Building.prototype.render = function () {
    sketch.fillStyle = sketch.strokeStyle = this.color;
    sketch.lineWidth = 2;
    sketch.beginPath();
    sketch.rect(this.x, this.y, this.width, this.height);
    sketch.fill();
    sketch.stroke();
    if (this.slantedTop) {
      sketch.beginPath();
      sketch.moveTo(this.x, this.y);
      sketch.lineTo(this.x + this.width, this.y);
      if (this.slantedTopDirection) {
        sketch.lineTo(this.x + this.width, this.y - this.slantedTopHeight);
      } else {
        sketch.lineTo(this.x, this.y - this.slantedTopHeight);
      }
      sketch.closePath();
      sketch.fill();
      sketch.stroke();
    }
    if (this.spireTop) {
      sketch.beginPath();
      sketch.moveTo(this.x + this.width / 2, this.y - this.spireTopHeight);
      sketch.lineTo(this.x + this.width / 2 + this.spireTopWidth, this.y);
      sketch.lineTo(this.x + this.width / 2 - this.spireTopWidth, this.y);
      sketch.closePath();
      sketch.fill();
      sketch.stroke();
    }
    if (this.antennaTop) {
      sketch.beginPath();
      sketch.moveTo(this.x + this.width / 2, this.y - this.antennaTopHeight);
      sketch.lineTo(this.x + this.width / 2, this.y);
      sketch.lineWidth = this.antennaTopWidth;
      return sketch.stroke();
    }
  };
  Skyline = function (config) {
    this.x = 0;
    this.buildings = [];
    this.layer = config.layer;
    this.width = {
      min: config.width.min,
      max: config.width.max
    };
    this.height = {
      min: config.height.min,
      max: config.height.max
    };
    this.speed = config.speed;
    this.color = config.color;
    this.populate();
    return this;
  };
  Skyline.prototype.populate = function () {
    var newHeight, newWidth, results, totalWidth;
    totalWidth = 0;
    results = [];
    while (totalWidth <= sketch.width + this.width.max * 2) {
      newWidth = round(random(this.width.min, this.width.max));
      newHeight = round(random(this.height.min, this.height.max));
      this.buildings.push(new Building({
        layer: this.layer,
        x: this.buildings.length === 0 ? 0 : this.buildings[this.buildings.length - 1].x + this.buildings[this.buildings.length - 1].width,
        y: sketch.height - newHeight,
        width: newWidth,
        height: newHeight,
        color: this.color
      }));
      results.push(totalWidth += newWidth);
    }
    return results;
  };
  Skyline.prototype.update = function () {
    var firstBuilding, lastBuilding, newHeight, newWidth;
    this.x -= sketch.speed * this.speed * dt;
    firstBuilding = this.buildings[0];
    if (firstBuilding.width + firstBuilding.x + this.x < 0) {
      newWidth = round(random(this.width.min, this.width.max));
      newHeight = round(random(this.height.min, this.height.max));
      lastBuilding = this.buildings[this.buildings.length - 1];
      firstBuilding.reset({
        layer: this.layer,
        x: lastBuilding.x + lastBuilding.width,
        y: sketch.height - newHeight,
        width: newWidth,
        height: newHeight,
        color: this.color
      });
      return this.buildings.push(this.buildings.shift());
    }
  };
  Skyline.prototype.render = function () {
    var i;
    i = this.buildings.length;
    sketch.save();
    sketch.translate(this.x, (sketch.height - sketch.viewHeight) / 20 * this.layer);
    while (i--) {
      this.buildings[i].render(i);
    }
    return sketch.restore();
  };
  sketch.setup = function () {
    var i, results;
    i = 5;
    results = [];
    while (i--) {
      results.push(skylines.push(new Skyline({
        layer: i + 1,
        width: {
          min: (i + 1) * 15,
          max: (i + 1) * 25
        },
        height: {
          min: 180 - i * 35,
          max: 350 - i * 40
        },
        speed: (i + 1) * 0.003,
        color: colors[i] //'hsl( 208, ' + (i * 9 + 5) + '%, ' + (80 - i * 13) + '% )'
      })));
    }
    return results;
  };
  sketch.clear = function () {
    return sketch.clearRect(0, 0, sketch.width, sketch.height);
  };
  sketch.update = function () {
    var i, results;
    dt = sketch.dt < 0.1 ? 0.1 : sketch.dt / 16;
    dt = dt > 5 ? 5 : dt;
    i = skylines.length;
    results = [];
    while (i--) {
      results.push(skylines[i].update(i));
    }
    return results;
  };
  sketch.draw = function () {
    var i, results;
    i = skylines.length;
    results = [];
    while (i--) {
      results.push(skylines[i].render(i));
    }
    return results;
  };


}
