$(function() {
    // 调用getUserInfo 获取用户基本信息
    getUserinfo()

    var layer = layui.layer;
    // 点击按钮 实现退出功能
    $('#btnLogout').on('click', function() {
        // console.log("ok");
        layer.confirm('确认退出登录？', { icon: 3, title: '提示' }, function(index) {
            // 1.清空本地存储的 token
            localStorage.removeItem('token')

            // 2. 重新跳转到登录页面
            location.href = '/login.html'
                // 关闭confirm询问框
            layer.close(index);
        })

    })

})


//定义 getUserinfo  获取用户的基本信息 函数
function getUserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || '' //????? application 中 localStorage 无内容
        // },
        success: function(res) {
            //  console.log(res); 
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar() 渲染用户的头像
            renderAvatar(res.data)

        },

        // 不论成功还是失败 最终都会调用 complete 回调函数
        // complete: function(res) {
        //     // console.log('执行了 complete 回调：');
        //     // console.log('res');
        //     // 在 complete 回调函数中， 可以使用 res.responseJSON 拿到服务器响应 的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认真失败！') {
        //         // 1.强制清空 token
        //         localStorage.removeItem('token')
        //             // 2.强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 1.获取用户的名称
    var name = user.nickname || user.username || user
        // 2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 3.按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.laui-nav-img').hide()
        var first = name[0].toUpperCase() //获取 第一个字符toUpperCase()？？？？？
        $('.text-avatar').html(first).show()

    }
}