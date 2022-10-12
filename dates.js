// most of the time you want to use an external library
let d;

d = new Date();
console.log(Date.now());
console.log(d);
console.log(d.toString());

d = new Date(123);
console.log(d.toString());

d = new Date('2019-08-02T11:30:00+10:00');
console.log(d.toString());

// month index - 0 is jenuarry
// day
// hour
// minutes
// seconds
// miliseconds
// timezone is local
d = new Date(2019, 0, 2, 11, 10, 10, 24);
console.log(d.toString());

console.log(d.getFullYear()); // 2019
console.log(d.getMonth()); // YOU GET THE INDEX!
console.log(d.getDate());
console.log(d.getHours(), 'HOURS');
console.log(d.getMinutes());
console.log(d.getSeconds());
console.log(d.getTime()); // 1546423810024
console.log(d.getUTCHours(), 'HOURS'); // WITHOUT THE +GMT+0200 (IT'S GMT+0100)

console.log(d.toISOString()); // 2019-01-02T10:10:10.024Z
console.log(d.toLocaleString('en-AU')); // 02/01/2019, 11:10:10 am
console.log(d.toLocaleString('en-US')); // 1/2/2019, 11:10:10 AM
console.log(
  d.toLocaleString('en-AU', {
    timeZone: 'America/Los_Angeles',
  })
); // Australian date formatting with US timezone
console.log(d);
console.log(
  JSON.stringify({
    myDate: d,
  })
);
