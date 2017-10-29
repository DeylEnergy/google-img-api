const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const dbPromise = mongoose.connect('mongodb://localhost/googleimg', {
  useMongoClient: true
});

const RequestedSchema = mongoose.Schema({
  query: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});
exports.Request = mongoose.model('UserQueries', RequestedSchema);

exports.showLastQueries = (cb) => {
  dbPromise.then(db => {
    exports.Request.find({}, cb);
  });
};

exports.insertingQuery = query => {
  dbPromise.then(db => {
    const data = new exports.Request(query);
    data.save(err => {
      if (err) throw err;
      else {
        console.log('A new request added');
      }
    });
  });
};
