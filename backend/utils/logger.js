// import pkg from 'signale';

// const { Signale } = pkg;

// const logger = new Signale();

// logger.config({
//   displayFilename: false,
//   displayTimestamp: true,
//   displayDate: false
// });

// export default logger;



import pkg from 'signale';
const { Signale } = pkg;

class Logger extends Signale{
    constructor(){
        super({
            config : {
                displayDate: true,
                displayFilename: false,
                displayTimestamp: true
            }
        })
    }
}

const logger = new Logger();

export default logger;