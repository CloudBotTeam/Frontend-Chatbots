# Frontend #

## Running

```bash
git clone https://github.com/CloudBotTeam/Frontend-Chatbots.git

npm install
# 如果报错可以尝试以下操作 但仍然不建议用cnpm
npm install --registry=https://registry.npm.taobao.org

npm run dev
```
浏览器访问 http://localhost:9001



## 目录结构
```shell
├── src                        // 源代码
│   ├── api                    // Login请求
│   ├── components             // 全局UI组件
│   ├── mock                   // mock随机数据
│   ├── router                 // 路由
│   ├── store                  // 全局store管理
│   ├── utils                  // 全局公用方法
│   ├── containers             // 自适应布局组合
│   ├── view                   // view界面
│   │    ├── login             // 登录界面
│   │    ├── errorPages        // 错误界面
│   │    ├── Chatbot.vue       // bot列表 /chatbot
│   │    ├── BotDetail.vue     // bot详情 /botdetail/{{bot_id}}
│   │    ├── Group.vue         // group列表 /group
│   │    ├── GroupDetail.vue   // group详情 /groupdetail/{{group_id}}
│   │    ├── Service.vue       // service列表 /service
│   │    ├── ServDetail.vue    // service详情 /servdetail/{{serv_id}}
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等


```



## 进度

- bot
	- [x] 查看bot列表 `Get` '/robots'
	- [x] 查看某个bot的信息和它管理的所有group `Get` '/robots/{{bot_id}}'
	- [x] 删除一个bot `Delete` '/robots/{{bot_id}}'
	- [x] 删除一个bot下管理的某些group(可以多选批量删除) `Delete` '/robots/deletegroups'
	- [ ] 添加一个bot
	- [ ] 添加一对bot和group的对应关系
	- [ ] 删除所有bot

- group
	- [x] 查看group列表 `Get` '/groups'
	- [x] 查看某个group的信息和它管理的所有service `Get` '/groups/{{group_id}}'
	- [x] 删除一个group `Delete` '/groups/{{group_id}}'
	- [x] 删除一个group下管理的某些service(可以多选批量删除) `Delete` '/groups/deleteservs'
	- [ ] 添加一个group
	- [ ] 添加一对（或一组）group和service的对应关系
	- [ ] group管理的service分类显示
	- [ ] 删除所有group

- service
	- [x] 查看service列表 目前在前端写死 (是前端写死比较好还是后端返回数据比较好？
	- [x] 查看某个service的信息 目前在前端写死
	- [ ] 添加一个自定义service组



## 接口
### 1. bot



#### 1.1 获取所有 bot

##### 基本信息

**Path：** /robots

**Method：** GET

**接口描述：**



&nbsp;

##### 返回数据

| 参数名称 | 类型 | 默认值 | 备注 |
| -------- | ---- | ---- | ---- |
| bot_list  |  object []  |      |  item 类型: object  |
| bot_name  |  string  |      |    |
| bot_type  |  string  |      |    |
| status  |  integer  |      |  目前是int，可以改成string  |
| timestamp  |  string  |      |  先留着，可以删掉  |



&nbsp;

#### 1.2 获取一个 bot 的基本信息和它管理的所有 group

##### 基本信息

**Path：** /robots/{{bot_id}}

**Method：** GET

**接口描述：**



&nbsp;

##### 请求参数

**路径参数**

| 参数名称 | 示例 | 备注 |
| -------- | ---- | ---- |
| bot_id  |      |      |



&nbsp;

##### 返回数据

| 参数名称 | 类型 | 默认值 | 备注 |
| -------- | ---- | ---- | ---- |
| bot_name  |  string  |      |    |
| bot_type  |  string  |      |    |
| timestamp  |  string  |      |  先留着，可以删掉  |
| group_list  |  object[]  |      |  item 类型: object  |
| group_id  |  string  |      |    |
| group_name  |  string  |      |    |
| group_type  |  string  |      |    |



&nbsp;

#### 1.3 删除一个bot

##### 基本信息

**Path：** /robots/{{bot_id}}

**Method：** DELETE

**接口描述：**



&nbsp;

##### 请求参数

**Headers**

| 参数名称 | 参数值 | 示例 | 备注 |
| -------- | ---- | ---- | ---- |
| Content-Type  |  application/x-www-form-urlencoded  |      |      |


**路径参数**

| 参数名称 | 示例 | 备注 |
| -------- | ---- | ---- |
| bot_id  |      |      |



&nbsp;

#### 1.4 删除一个 bot 下管理的某些 group

##### 基本信息
**Path：** /robots/deletegroups/{{bot_id}}

**Method：** DELETE

**接口描述：**



&nbsp;

##### 请求参数

**Headers**

| 参数名称 | 参数值 | 示例 | 备注 |
| -------- | ---- | ---- | ---- |
| Content-Type  |  application/json  |      |      |

**Body**

| 参数名称 | 类型 | 默认值 | 备注 |
| -------- | ---- | ---- | ---- |
| bot_id  |  string  |      |    |
| group_list  |  object[]  |      |  item 类型: object  |
| group_id  |  string  |      |    |



&nbsp;&nbsp;

### 2. group

#### 2.1 获取所有 group

##### 基本信息

**Path：** /groups

**Method：** GET

**接口描述：**



&nbsp;

##### 返回数据

| 参数名称 | 类型 | 默认值 | 备注 |
| -------- | ---- | ---- | ---- |
| group_list  |  object []  |      |  item 类型: object  |
| group_name  |  string  |      |    |
| group_type  |  string  |      |    |
| timestamp  |  string  |      |  先留着，可以删掉  |



&nbsp;

#### 2.2 获取一个 group 的基本信息和它管理的所有 service

##### 基本信息

**Path：** /groups/{{group_id}}

**Method：** GET

**接口描述：**



&nbsp;

##### 请求参数

**路径参数**

| 参数名称 | 示例 | 备注 |
| -------- | ---- | ---- |
| group_id  |      |      |



&nbsp;

##### 返回数据

| 参数名称 | 类型 | 默认值 | 备注 |
| -------- | ---- | ---- | ---- |
| group_name  |  string  |      |    |
| group_type  |  string  |      |    |
| timestamp  |  string  |      |  先留着，可以删掉  |
| serv_list  |  object[]  |      |  item 类型: object  |
| serv_id  |  string  |      |    |
| serv_name  |  string  |      |    |
| serv_type  |  string  |      |    |



&nbsp;

#### 2.3 删除一个 group

##### 基本信息

**Path：** /groups/{{group_id}}

**Method：** DELETE

**接口描述：**



&nbsp;

##### 请求参数

**Headers**

| 参数名称 | 参数值 | 示例 | 备注 |
| -------- | ---- | ---- | ---- |
| Content-Type  |  application/x-www-form-urlencoded  |      |      |


**路径参数**

| 参数名称 | 示例 | 备注 |
| -------- | ---- | ---- |
| group_id  |      |      |



&nbsp;

#### 2.4 删除一个 group 下管理的某些 service

##### 基本信息
**Path：** /groups/deleteservs

**Method：** DELETE

**接口描述：**



&nbsp;

##### 请求参数

**Headers**

| 参数名称 | 参数值 | 示例 | 备注 |
| -------- | ---- | ---- | ---- |
| Content-Type  |  application/json  |      |      |

**Body**

| 参数名称 | 类型 | 默认值 | 备注 |
| -------- | ---- | ---- | ---- |
| group_id  |  string  |      |    |
| serv_list  |  object[]  |      |  item 类型: object  |
| serv_id  |  string  |      |    |


## 补充

1. 用 mock.js 拦截了 ajax 请求并返回随机数据，接后端时把 mock 去掉即可；

2. 目前登录也是用 mock 来验证用户名密码，如果要做登录的话去掉 mock 发后端验证用户名密码即可，如果不做的话就用目前的假登录也行；
3. chatbot 和 group 页删除 bot 或 group 一次只能删一个，请求数据是 string （相应id）；botdetail 和 groupdetail 页删除 group 或 service 可以批量删，请求数据是 object[] （要删除的id列表）；都试了一下，最后用哪种都行；