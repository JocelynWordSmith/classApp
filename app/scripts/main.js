'use strict';

//initialize parse location
Parse.initialize('dt8DfJoVpPqTM004VdtOUEeXXqRdxBfc88fksbNN', 'gsPQIKflI4ErhhNa4Ad6HNzcyhEjoYjumZLJRKcE');

var router = new AppRouter();
Parse.history.start();



// var TestObject = Parse.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({foo: 'bar'}).then(function(object) {
//   alert('yay! it worked');
// });