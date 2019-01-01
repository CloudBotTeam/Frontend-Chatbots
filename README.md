# Frontend #

&nbsp;

# Running

```bash
git clone https://github.com/CloudBotTeam/Frontend-Chatbots.git

npm install
# 如果报错可以尝试以下操作 但仍然不建议用cnpm
npm install --registry=https://registry.npm.taobao.org

npm run dev
```
浏览器访问 http://localhost:9001



&nbsp;

# 目录结构

```shell
├── src                        // 源代码
│   ├── api                    // Login请求
│   ├── components             // 全局UI组件
│   ├── mock                   // mock随机数据
│   │    ├── botdata.js        // bot相关数据的模拟
│   │    ├── groupdata.js      // group相关数据的模拟
│   │    ├── login.js          // login相关数据的模拟
│   │    ├── index.js          // login路径匹配 引入了所有mock模块
│   ├── router                 // 路由
│   ├── store                  // 全局store管理
│   ├── utils                  // 全局公用方法
│   ├── containers             // 自适应布局组合
│   ├── view                   // view界面
│   │    ├── login             // 登录界面
│   │    ├── errorPages        // 错误界面
│   │    ├── Chatbot.vue       // bot列表 /chatbot
│   │    ├── BotDetail.vue     // bot详情 /botdetail/{{bot_id}}
│   │    ├── BotAddGroup.vue   // 在bot下添加group /botaddgroup?id={{bot_id}}
│   │    ├── CreateBot.vue     // 添加bot /createbot
│   │    ├── Group.vue         // group列表 /group
│   │    ├── GroupDetail.vue   // group详情 /groupdetail/{{group_id}}
│   │    ├── GroupAddServ.vue  // 在group下添加service /groupaddserv?id={{group_id}}
│   │    ├── CreateGrop.vue    // 添加group /addgroup?id={{group_id}}
│   │    ├── Service.vue       // service列表 /service
│   │    ├── Service-expand.vue// 配合service下拉列表使用
│   │    ├── ServDetail.vue    // service详情 /servdetail/{{serv_id}}
│   │    ├── CreateServList.vue// 创建一个service组 /createservlist？id={{serv_id}}
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等


```





&nbsp;

# 进度

- bot
  - [x] 查看bot列表 `Get` '/robots'
  - [x] 查看某个bot的信息和它管理的所有group `Get` '/robots/{{bot_id}}'
  - [x] 删除一个bot `Delete` '/robots/{{bot_id}}'
  - [x] 删除一个bot下管理的某些group(可以多选批量删除) `Delete` '/robots/deletegroups'
  - [x] 添加一个bot `Post` '/robots'
  - [x] 添加一些bot和group的对应关系 `Post` '/robots/addgroups'
  - [x] 删除所有bot `Delete` '/robots'

- group
  - [x] 查看group列表 `Get` '/groups'
  - [x] 查看某个group的信息和它管理的所有service `Get` '/groups/{{group_id}}'
  - [x] 删除一个group `Delete` '/groups/{{group_id}}'
  - [x] 删除一个group下管理的某些service(可以多选批量删除) `Delete` '/groups/deleteservs'
  - [x] 添加一个group
  - [x] 添加一些group和service的对应关系
  - [ ] ~~group管理的service分类显示(我再尝试着挣扎一下)~~
  - [x] 删除所有group

- service
  - [x] 查看service列表 `Get` '/services'
  - [x] 查看某个service的详细信息 `Get` '/services/{{serv_id}}'
  - [x] 添加一个自定义service组 `Post` '/services/{{serv_id}}'
  - [x] 删除一个自定义service组 `Delete` '/services/{{serv_id}}'
  - [x] 删除所有自定义service组 `Delete` '/services'



&nbsp;

# 接口

## 1. bot



### 1.1 获取所有 bot

#### 基本信息

**Path：** /robots

**Method：** GET

**接口描述：**



&nbsp;

#### 返回数据

| 参数名称 | 类型 | 默认值 | 备注 |
| -------- | ---- | ---- | ---- |
| bot_list  |  object []  |      |  item 类型: object  |
| ├─ bot_id |  string  |      |    |
| ├─ bot_type |  string  |      |    |
| ├─ status |  integer  |      |  目前是int（0/1/2/3），可以改成string（'未启动'/'运行中'/'故障'/'未登录'）  |



&nbsp;

### 1.2 获取一个 bot 的基本信息和它管理的所有 group

#### 基本信息

**Path：** /robots/{{bot_id}}

**Method：** GET

**接口描述：**



&nbsp;

#### 请求参数

**路径参数**

| 参数名称 | 示例 | 备注 |
| -------- | ---- | ---- |
| bot_id  |      |      |



&nbsp;

#### 返回数据

| 参数名称 | 类型 | 默认值 | 备注 |
| -------- | ---- | ---- | ---- |
| bot_type  |  string  |      |    |
| connect_url  |  string  |      |  登录链接  |
| group_list  |  object[]  |      |  item 类型: object  |
| ├─ group_id |  string  |      |    |
| ├─ group_name |  string  |      |    |
| ├─ group_type |  string  |      |    |



&nbsp;

### 1.3 删除一个bot

#### 基本信息

**Path：** /robots/{{bot_id}}

**Method：** DELETE

**接口描述：**



&nbsp;

#### 请求参数

**Headers**

| 参数名称 | 参数值 | 示例 | 备注 |
| -------- | ---- | ---- | ---- |
| Content-Type  |  application/x-www-form-urlencoded  |      |      |


**路径参数**

| 参数名称 | 示例 | 备注 |
| -------- | ---- | ---- |
| bot_id  |      |      |



&nbsp;

### 1.4 删除一个 bot 下管理的某些 group

#### 基本信息

**Path：** /robots/deletegroups

**Method：** DELETE

**接口描述：**



&nbsp;

#### 请求参数

**Headers**

| 参数名称 | 参数值 | 示例 | 备注 |
| -------- | ---- | ---- | ---- |
| Content-Type  |  application/json  |      |      |

**Body**

| 参数名称 | 类型 | 默认值 | 备注 |
| -------- | ---- | ---- | ---- |
| bot_id  |  string  |      |    |
| delet_groups |  object[]  |      |  item 类型: object  |
| ├─ group_id |  string  |      |    |



&nbsp;

### 1.5 添加一个 bot

#### 基本信息

**Path：** /robots

**Method：** POST

**接口描述：**



&nbsp;

#### 请求参数

**Headers**

| 参数名称 | 参数值 | 示例 | 备注 |
| -------- | ---- | ---- | ---- |
| Content-Type  |  application/json  |      |      |

**Body**

| 参数名称 | 类型 | 默认值 |	是否必要 | 备注 |
| -------- | ---- | ---- | ---- | ---- |
| bot_type  |  string  |      |    |    |
| managed_groups |  object[]  |    |   非必要   |  item 类型: object  |
| ├─ group_id |  string  |      |  非必要  |    |


&nbsp;

### 1.6 在一个 bot 下添加一些 group

#### 基本信息

**Path：** /robots/addgroups

**Method：** POST

**接口描述：**



&nbsp;

#### 请求参数

**Headers**

| 参数名称 | 参数值 | 示例 | 备注 |
| -------- | ---- | ---- | ---- |
| Content-Type  |  application/json  |      |      |

**Body**

| 参数名称 | 类型 | 默认值 | 备注 |
| -------- | ---- | ---- | ---- |
| bot_id  |  string  |      |    |
| add_groups |  object[]  |      |  item 类型: object  |
| ├─ group_id |  string  |      |    |



&nbsp;
### 1.7 删除所有 bot

#### 基本信息

**Path：** /robots

**Method：** DELETE

**接口描述：**



&nbsp;
#### 请求参数

**Headers**

| 参数名称 | 参数值 | 示例 | 备注 |
| -------- | ---- | ---- | ---- |
| Content-Type  |  application/x-www-form-urlencoded  |      |      |




&nbsp;&nbsp;

## 2. group

### 2.1 获取所有 group

#### 基本信息

**Path：** /groups

**Method：** GET

**接口描述：**



&nbsp;

#### 返回数据

| 参数名称 | 类型 | 默认值 | 备注 |
| -------- | ---- | ---- | ---- |
| group_list  |  object []  |      |  item 类型: object  |
| ├─ group_id |  string  |      |    |
| ├─ group_name |  string  |      |    |
| ├─ group_type |  string  |      |    |



&nbsp;

### 2.2 获取一个 group 的基本信息和它管理的所有 service

### 基本信息

**Path：** /groups/{{group_id}}

**Method：** GET

**接口描述：**



&nbsp;

#### 请求参数

**路径参数**

| 参数名称 | 示例 | 备注 |
| -------- | ---- | ---- |
| group_id  |      |      |



&nbsp;

#### 返回数据

| 参数名称 | 类型 | 默认值 | 备注 |
| -------- | ---- | ---- | ---- |
| group_name  |  string  |      |    |
| group_type  |  string  |      |    |
| serv_list  |  object[]  |      |  item 类型: object  |
| ├─ serv_id |  string  |      |    |
| ├─ serv_name |  string  |      |    |
| ├─ serv_type |  string  |      |    |



&nbsp;

### 2.3 删除一个 group

#### 基本信息

**Path：** /groups/{{group_id}}

**Method：** DELETE

**接口描述：**



&nbsp;

#### 请求参数

**Headers**

| 参数名称 | 参数值 | 示例 | 备注 |
| -------- | ---- | ---- | ---- |
| Content-Type  |  application/x-www-form-urlencoded  |      |      |


**路径参数**

| 参数名称 | 示例 | 备注 |
| -------- | ---- | ---- |
| group_id  |      |      |



&nbsp;

### 2.4 删除一个 group 下管理的某些 service

#### 基本信息

**Path：** /groups/deleteservs

**Method：** DELETE

**接口描述：**



&nbsp;

#### 请求参数

**Headers**

| 参数名称 | 参数值 | 示例 | 备注 |
| -------- | ---- | ---- | ---- |
| Content-Type  |  application/json  |      |      |

**Body**

| 参数名称 | 类型 | 默认值 | 备注 |
| -------- | ---- | ---- | ---- |
| group_id  |  string  |      |    |
| delet_servs |  object[]  |      |  item 类型: object  |
| ├─ serv_id |  string  |      |    |


&nbsp;

### 2.5 添加一个 group

#### 基本信息

**Path：** /groups

**Method：** POST

**接口描述：**



&nbsp;

#### 请求参数

**Headers**

| 参数名称 | 参数值 | 示例 | 备注 |
| -------- | ---- | ---- | ---- |
| Content-Type  |  application/json  |      |      |

**Body**

| 参数名称 | 类型 | 默认值 |	是否必要 | 备注 |
| -------- | ---- | ---- | ---- | ---- |
| group_id  |  string  |      |    |    |
| group_name  |  string  |      |    |    |
| group_type  |  string  |      |    |    |
| managed_servs |  object[]  |    |   非必要   |  item 类型: object  |
| ├─ serv_id |  string  |      |  非必要  |    |


&nbsp;

### 2.6 在一个 group 下添加一些 services

#### 基本信息

**Path：** /groups/addservs

**Method：** POST

**接口描述：**



&nbsp;

#### 请求参数

**Headers**

| 参数名称 | 参数值 | 示例 | 备注 |
| -------- | ---- | ---- | ---- |
| Content-Type  |  application/json  |      |      |

**Body**

| 参数名称 | 类型 | 默认值 | 备注 |
| -------- | ---- | ---- | ---- |
| group_id  |  string  |      |    |
| add_servs |  object[]  |      |  item 类型: object  |
| ├─ serv_id |  string  |      |    |



&nbsp;
### 2.7 删除所有 group

#### 基本信息

**Path：** /groups

**Method：** DELETE

**接口描述：**



&nbsp;
#### 请求参数

**Headers**

| 参数名称 | 参数值 | 示例 | 备注 |
| -------- | ---- | ---- | ---- |
| Content-Type  |  application/x-www-form-urlencoded  |      |      |


&nbsp;&nbsp;



## 3. service

### 3.1 获取所有 service

#### 基本信息

**Path：** /services

**Method：** GET

**接口描述：**



&nbsp;

#### 返回数据

| 参数名称 | 类型 | 默认值 | 备注 |
| -------- | ---- | ---- | ---- |
| data_serv  |  object []  |      |  item 类型: object  |
| ├─ type |  string  |      |  该分类的名称  |
| ├─ servlist |  object []  |      |  该分类下的service列表  |
| │    ├── serv_id |  string  |      |  该service的id  |
| │    ├── serv_type |  string  |      |  该service的分类  |
| │    ├── serv_name |  string  |      |  该service的名称  |



&nbsp;
### 3.2 添加一个 service 组

#### 基本信息

**Path：** /services

**Method：** POST

**接口描述：**



&nbsp;

#### 请求参数

**Headers**

| 参数名称 | 参数值 | 示例 | 备注 |
| -------- | ---- | ---- | ---- |
| Content-Type  |  application/json  |      |      |

**Body**

| 参数名称 | 类型 | 默认值 | 备注 |
| -------- | ---- | ---- | ---- |
| id  |  string  |      |  service组id  |
| type  |  string  |      |  service组名称  |
| add_servs |  object[]  |    |  添加的service列表  item 类型: object  |
| ├─ serv_id |  string  |      |  添加的service的id  |



&nbsp;

### 3.3 获取一个 service 的信息

#### 基本信息

**Path：** /services/{{serv_id}}

**Method：** GET

**接口描述：**



&nbsp;

#### 请求参数

**路径参数**

| 参数名称 | 示例 | 备注 |
| -------- | ---- | ---- |
| serv_id  |      |      |



&nbsp;

#### 返回数据

| 参数名称 | 类型 | 默认值 | 备注 |
| -------- | ---- | ---- | ---- |
| serv_name  |  string  |      |    |
| serv_type  |  string  |      |    |
| serv_description  |  object[]  |      |  item 类型: object  |



&nbsp;

### 3.4 删除一个自定义service组

#### 基本信息

**Path：** /services/{{id}}

**Method：** DELETE

**接口描述：**



&nbsp;

#### 请求参数

**Headers**

| 参数名称 | 参数值 | 示例 | 备注 |
| -------- | ---- | ---- | ---- |
| Content-Type  |  application/x-www-form-urlencoded  |      |      |


**路径参数**

| 参数名称 | 示例 | 备注 |
| -------- | ---- | ---- |
| id  |      |      |



&nbsp;

### 3.5 删除所有自定义service组

#### 基本信息

**Path：** /services

**Method：** DELETE

**接口描述：**



&nbsp;

#### 请求参数

**Headers**

| 参数名称 | 参数值 | 示例 | 备注 |
| -------- | ---- | ---- | ---- |
| Content-Type  |  application/x-www-form-urlencoded  |      |      |






&nbsp;&nbsp;
## 补充

1. 用 mock.js 拦截了 ajax 请求并返回随机数据，接后端时把 mock 去掉即可；
2. 目前登录也是用 mock 来验证用户名密码，如果要做登录的话去掉 mock 发后端验证用户名密码即可，如果不做的话就用目前的假登录也行；
3. chatbot 和 group 页删除 bot 或 group 一次只能删一个，请求数据是 string （要删除的id）；botdetail 和 groupdetail 页删除 group 或 service 可以批量删，请求数据是 object[] （要删除的id列表）；都试了一下，最后用哪种都行；
4. 尽可能的在响应式了，但还是不太理想，不管了...；
5. 目前无法做到在分类下拉列表里多选元素，所以在自定义service组选择要加哪些service的时候无法分类显示。