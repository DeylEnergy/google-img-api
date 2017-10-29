const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const dbPromise = mongoose.connect('mongodb://localhost/googleimg', {
  useMongoClient: true
});

const RequestedSchema = mongoose.Schema({
  term: {
    type: String,
    required: true
  },
  when: {
    type: Date,
    required: true
  }
});
exports.Request = mongoose.model('UserQueries', RequestedSchema);

exports.showLastQueries = (cb) => {
    exports.Request.find({}, {_id:0, __v:0}, cb).sort({_id: -1});
};

exports.insertingQuery = query => {
    const data = new exports.Request(query);
    data.save(err => {
      if (err) throw err;
      else {
        console.log('A new request added');
      }
    });
};
