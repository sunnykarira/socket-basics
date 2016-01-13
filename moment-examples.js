// momentjs.com
var moment = require('moment');
var now = moment(now);
//console.log(now._d);
console.log(now.format());

// We can manipulate time
//now.subtract(1, 'year');
//now.add

console.log(now.format());
console.log(now.format('h:mm a')); // 6:45 pm


// Challenge

// print Oct 5th 2016, 6:45pm
console.log(now.format('MMM Do YYYY, h:mm A'));


// UNIX timestamps Sending computer the timstamps
// Jan 1st 1970 is the ref. date
// epochconverter.com
// Comparing time with timestamps is easy
// In js dates are stored in js unix timestamp. It uses milliseconds


// UTC Timestamp
console.log(now.format('X'));

// js timestamp
console.log(now.format('x'));
//or in number form
console.log(now.valueOf());


// Converting time stamp in date
var timestamp = 1452695081627;
var timeStampMoment = moment.utc(timestamp);
// Conversion for timezone
console.log(timeStampMoment.local().format('h:mm a'));  // 11:06 am
