window.onload = function () {
    var app = new Vue({
        el: '#webapp',
        data: {
            list: [],
            current: {},
            news: {},
            editorMessage: 'Hello Vue!'
        },
        methods: {
            save: function () {
                if (!app.news.title) {
                    app.editorMessage = 'Title is required';
                    return;
                }

                if (!app.news.content) {
                    app.editorMessage = 'Content is required';
                    return;
                }

                app.editorMessage = '';
                var s = function (data) {
                    $("#modal-editor").modal('hide')
                    app.loadNews();
                }
                var e = function (err) {
                    app.editorMessage = err;
                }
                saveRequst(app.news, s, e);
            },
            createNews: function () {
                $("#modal-editor").modal('show');
            },
            openNewsDetail: function (id) {
                this.loadDetail(id);
                $("#modal-detail").modal('show');
            },

            loadDetail: function (id) {
                detail(id, function (data) {
                    app.current = data;
                }, function (err) {
                    var json = JSON.parse(err);
                    app.current = json;
                });
            },
//
            formatTime: function (time) {
                return moment(time).format('l');
            },
            loadNews: function () {
                listRequst(function (data) {
                    var list = JSON.parse(data);
                   // app.$set('list',list);
                    app.list = list;
                }, function (err) {
                    console.log(err)
                })

            }

        }
    });
    app.loadNews();
}