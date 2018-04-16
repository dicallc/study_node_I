var mongoose = require('mongoose');

var NewsSchema = new mongoose.Schema({
    title: String,
    content: String,
    // 设置默认值
    createTime: {type: Date, default: Date.now}
});

var News = mongoose.model('News', NewsSchema);