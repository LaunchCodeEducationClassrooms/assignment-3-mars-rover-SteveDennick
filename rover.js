class Rover {
   constructor(position) {
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = 110;
   }
  receiveMessage(message) {
    let results = [];
    for (let i = 0; i < message.commands.length; i++) {
      if (message.commands[i].commandType === 'STATUS_CHECK') {
        results.push({completed: true,
       roverStatus: {
       mode: this.mode,
       generatorWatts: this.generatorWatts,
       position: this.position}});
      }
      if (message.commands[i].commandType === 'MOVE') {
        if (this.mode === 'LOW_POWER') {
          results.push({completed: false})
        }else{
          this.position = message.commands[i].value;
          results.push({completed: true})
        }
      }
      if (message.commands[i].commandType === 'MODE_CHANGE') {
        this.mode = message.commands[i].value;
        results.push({completed: true});
      }
    }
    
  let response = {
    message: message.name,
    results: results
  };
  return response;
}
}



module.exports = Rover;