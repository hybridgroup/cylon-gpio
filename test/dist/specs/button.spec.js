(function() {
  "use strict";
  var BUTTON;

  BUTTON = source("button");

  describe("Cylon.Drivers.GPIO.Button", function() {
    var button;
    button = new BUTTON({
      name: 'button',
      device: {
        connection: 'connect',
        pin: 13
      }
    });
    describe("constructor", function() {
      it("sets @pin to the passed device's pin", function() {
        return expect(button.pin).to.be.eql(13);
      });
      return it("sets @isPressed to false by default", function() {
        return expect(button.isPressed).to.be.eql(false);
      });
    });
    it("provides an array of button commands", function() {
      return expect(button.commands()).to.be.eql(['isPressed']);
    });
    return describe("on the 'data' event", function() {
      button.device = {
        emit: sinon.spy()
      };
      context("when 1", function() {
        before(function() {
          button.connection = {
            digitalRead: function(_, callback) {
              return callback(1);
            }
          };
          return button.start(function() {});
        });
        it("emits 'push'", function() {
          return assert(button.device.emit.calledWith('push'));
        });
        return it('sets @isPressed to true', function() {
          return expect(button.isPressed).to.be.eql(true);
        });
      });
      return context("when 0", function() {
        before(function() {
          button.connection = {
            digitalRead: function(_, callback) {
              return callback(0);
            }
          };
          return button.start(function() {});
        });
        it("emits 'release'", function() {
          return assert(button.device.emit.calledWith('release'));
        });
        return it('sets @isPressed to false', function() {
          return expect(button.isPressed).to.be.eql(false);
        });
      });
    });
  });

}).call(this);
