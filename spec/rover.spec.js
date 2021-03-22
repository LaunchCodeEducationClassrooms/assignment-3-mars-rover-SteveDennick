const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let testRover = new Rover(5);
    let results = [testRover.position, testRover.mode, testRover.generatorWatts];
    expect(results).toEqual([5, 'NORMAL', 110]);
  });

  it("response returned by receiveMessage contains name of message", function() {
    let testRover = new Rover(5);
    let testMessage = new Message('test', 'test');
    expect(testRover.receiveMessage(testMessage).message).toEqual('test');
  });

  it("response returned by recieveMessage includes two results if two commands are sent in message", function() {
    let testRover = new Rover(5);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let length = testRover.receiveMessage(message).results.length;
    expect(length).toEqual(2);
  });

  it("responds correctly to status check command", function() {
    let testRover = new Rover(5);
    let statusCheck = [new Command('STATUS_CHECK')];
    let message = new Message('Status Check', statusCheck);
    expect(testRover.receiveMessage(message).results[0]).toEqual({completed: true, roverStatus: {mode: 'NORMAL', generatorWatts: 110, position: 5}});
  });

  it("responds correctly to mode change command", function() {
    let testRover = new Rover(5);
    let modeChange = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Mode Change', modeChange);
    expect(testRover.receiveMessage(message).results[0]).toEqual({completed: true});
    expect(testRover.mode).toEqual('LOW_POWER');
  });

  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let testRover = new Rover(5);
    let lowPowerMove = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 100)];
    let message = new Message('Move', lowPowerMove);
    expect(testRover.receiveMessage(message).results[1]).toEqual({completed: false});
  });

  it("responds with position for move command", function() {
    let testRover = new Rover(5);
    let move = [new Command('MOVE', 100)];
    let message = new Message('Move', move);
    testRover.receiveMessage(message);
    expect(testRover.position).toEqual(100);
  });

});
