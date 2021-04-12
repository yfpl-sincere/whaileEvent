// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    // 统一为有 权限的接口 设置 header 请求头
    if (options.url.indexOf('/my/') !== -1) { // indexOf () 检索相应的字符串
        options.headers = {
            Authorization: localStorage.getItem('token') || '' //????? application 中 localStorage 无内容
        }
    }
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认真失败！') {
            // 1.强制清空 token
            localStorage.removeItem('token')
                // 2.强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})