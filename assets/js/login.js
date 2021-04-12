$(function() {
    // 1.为a链接绑定点击事件，

    $('#link_reg').on('click', function() {
        // 2.事件中切换两个div的显示和隐藏
        $('.login-box').hide()
        $('.reg-box').show()

    });
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    // form表单校验
    var form = layui.form;
    form.verify({
        //自定义一个叫做 pwd 的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位，切不能出现空格'], //注意  /^[\S]{6,12}$/ 正则中 S大写

        repwd: function(value) {
            //通过形参拿到是 确认密码框的内容
            // 在 拿到密码框的内容
            var pwd = $('.reg-box [name=password]').val(); //jq 中属性选择器 和  .val()使用
            if (pwd !== value) {
                return "两次输入不同"
            }

            // 进行比较 判断 失败提示消息即可；
        }
    })

    // //   监听注册表单 提交事件
    $('#form_reg').on('submit', function(e) {
        // debugger;
        e.preventDefault(); //阻止默认提交行为 防止提交刷新 表单内容丢失
        // debugger
        $.ajax({
            type: 'POST',
            // url: 'http://api-breakingnews-web.itheima.net/api/reguser',
            url: '/api/reguser',

            // ulrl: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            success: function(res) {
                if (res.status !== 0) {
                    // return console.log(res.message);
                    return layer.msg(res.message)

                }
                console.log('注册成功！');
                layer.msg('注册成功，请登录！')
                    // 模拟人的点击行为
                $('#link_login').click()
            }
        });
    });




    // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            // url: 'http://api-breakingnews-web.itheima.net/api/login',
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token) //token 是服务器 处理传递的数据 的返回
                    // 跳转到后台主页
                location.href = '/index.html'
            }
        });
    });



});