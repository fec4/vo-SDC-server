var picLinks = [];
var prefix = 'https://hrrfec.s3.amazonaws.com/pic_';

if (picLinks.length === 0) {
  for(var i = 1; i < 1000; i++) {
    if (i < 10) {
      picLinks.push(prefix + '00' + `${i}` + '.jpg');
    } else if (i < 100 && i >= 10) {
      picLinks.push(prefix + '0' + `${i}` + '.jpg');
    } else if (i >= 100) {
      picLinks.push(prefix + `${i}` + '.jpg');
    }
  }
}

exports.data = picLinks;