var mongoose = require('mongoose');
var News = mongoose.model('News');

module.exports = {
    // 新闻的创建
    create: function(req, res, next){
        console.log(req.body);
        var news = new News(req.body);
        news.save(function(err){
            if(err) return next(err);

            return res.json(news);
        });
    },

    // 获取列表
    list: function(req, res, next){
        // 对于这两个参数，还需要思考，如果用户传入负数怎么办
        var pagesize = parseInt(req.query.pagesize, 10) || 10;
        var pagestart = parseInt(req.query.pagestart, 10) || 1;

        News
            .find()
            // 搜索时，跳过的条数
            .skip( (pagestart - 1) * pagesize )
            // 获取的结果集条数
            .limit( pagesize)
            .exec(function(err, docs){
                if(err) return next(err);

                return res.json(docs);
            });
    },

    // 处理路由参数
    getById: function(req, res, next, id){
        if(!id) return next(new Error('News not Found'));

        News
            .findOne({_id: id})
            .exec(function(err, doc){
                if(err) return next(err);

                // 请思考一下，与 36 行的提示报错是一样的，这样做，有什么缺点
                if(!doc) return next(new Error('News not Found'));

                req.news = doc;
                return next();
            });
    },

    // 获取新闻详情
    get: function(req, res, next) {
        res.status(200);
        return res.json(req.news);
    }
};