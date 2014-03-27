var fs = require('fs');
var max = 605,
    min = 0,
    maxVo = 3.1
    irSensorModel = 'irModel'.toLowerCase(); //gp2y0a41sk0f'

console.log("Generating Analog and Vo Ranges ...")

var fileBegin = "module.exports = {\n" +
                "analogRange: { max: " + max + ", min: " + min + "},\n" +
                "rangeDistances:{\n";

var fileEnd = "};\n";

fs.writeFileSync('' + irSensorModel + '.js', fileBegin, { flag: 'a'}, function(err){
  if (err) throw err;
})

for (var i = max; i > 0; i = i- 5){
  var res = (i / max) * maxVo;
  var data = "" + i + ": {\n  dist: ?,\n  vo: " + res + "\n},\n";
  fs.writeFileSync('' + irSensorModel + '.js', data, { flag: 'a'}, function(err){
    if (err) throw err;
  })
}

fs.writeFileSync('' + irSensorModel + '.js', fileEnd, { flag: 'a'}, function(err){
  if (err) throw err;
})
