const mongoose = require('mongoose');
const config = require('../config');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,

};
mongoose.connect(
    config.get('db')?.host ?? 'mongodb://localhost:27017', options
).catch((error) => console.error('error', 'Mongoose connection Issue:', error));

mongoose.connection.on('connected', () =>
    console.info('info', 'Mongoose connection:', 'Connection Established'),
);

// Connectivity status on connection resetting
mongoose.connection.on('reconnected', () =>
    console.info('info', 'Mongoose connection:', 'Connection Reestablished'),
);

mongoose.connection.on('disconnected', () =>
    console.info('info', 'Mongoose connection:', 'Connection Disconnected'),
);

// Connectivity Status  On connection close
mongoose.connection.on('close', () =>
    console.info('info', 'Mongoose connection Issue:', 'Connection Closed'),
);

// Connectivity Status  On error
mongoose.connection.on('error', (error) =>
    console.error('error', 'Mongoose connection Issue:', error),
);


module.exports = mongoose