
## 在 app.js 中注册各种中间件 -- 放在最前面的
    -- 处理静态资源的
    -- 处理 post 请求的
    -- 处理 cookie 的

## 注册路由中间件  -- 放在中间
    -- app.use('一级路由', controller)
    -- controller 控制器
        -- 1. 处理 URl 传递的参数 req.query / req.body / req.params
        -- 2. 连接数据库进行增删改查 
            --2.1 创建 mogoose scheme 模型
            --2.2 通过模型 增删改查 (操作数据库是异步的，返回的是一个promsie)
        -- 3. 数据库操作完毕后，返回对应的数据，在 controller 中接收数据，返回给前端

    --  
## 注册错误处理中间件 -- 放在最后  


## token 配合 jwt 和 axios 的请求响应拦截器 使用

    -- 1. 在登录页面 (未登录的时候没有 token ，不用在请求拦截器设置)
        -- 登录成功后，后端生成 token 并且传递给前端 
            -- 前端的登录页面拿到返回的token ，同时在 axios 的响应拦截器中 将 token 存储在 localStorage 中
        -- 在别的页面进行接口请求时，在 axios 的请求拦截器中 添加 token 传给后端校验，
            -- 响应拦截器中重新存储最新的后端返回的 token

    -- 2. 通过 node 的应用级中间件，进行全局的 路由和接口的 token 过期校验，
            -- 过滤掉 login 相关的接口和路由
            -- token 存在 (接口相关的) --> 判断返回的是 true 还是 false 
                -- verify 验证是 true(有效) --> 重新设置token过期时间 --> next()
                -- verify 验证是 false(过期) --> res.status(401).send({errCode:"-1",
                errorInfo:"token过期"})
                -- 前端在 响应拦截器的 错误处理函数，统一处理 401 时，删除本地存储的token，并且重定向到 login 页面
            -- token 不存在 (普通页面) --> next()  