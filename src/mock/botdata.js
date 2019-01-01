import Mock from 'mockjs';

const Type = ['QQ', 'WeChat'];

const BotData = function(){
    let ChatbotList = []; // 定义需要的数据
    for (let i = 0; i <= 7; i++) {
        let Chatbot = { // 根据数据模板生成模拟数据
            bot_id: (10000+i).toString(), // 随机生成机器人id
            //timestamp: Mock.Random.datetime(), // 随机生成创建时间
            bot_type: Type[Mock.Random.integer(0, 1)], // 随机生成类型, QQ:0, WeChat:1
            status: Mock.Random.integer(0, 3), // 随机生成状态, 未启动:0, 运行中:1, 故障:2, 未登录:3
        }
        //console.log(Chatbot.connect_url),
        ChatbotList.push(Chatbot)
    }
    return{
        data:ChatbotList
    }
}

const BotDetail = function(id){
    var grouplist = [];
    for (let i = 0; i <= 5; i++) {
        grouplist.push({
            group_name: Mock.Random.last(),
            group_id: (20000+i).toString(),
            //timestamp: Mock.Random.datetime(),
            group_type: Type[Mock.Random.integer(0, 1)], // 随机生成类型, QQ:0, WeChat:1
        })
    }

    let BotInfo = {
        //timestamp: Mock.Random.datetime(),
        bot_type: Type[Mock.Random.integer(0, 1)], // 随机生成类型, QQ:0, WeChat:1
        managed_groups:grouplist,
        connect_url: "https://www.baidu.com",//随机url
        status: Mock.Random.integer(0, 3), // 随机生成状态, 未启动:0, 运行中:1, 故障:2, 未登录:3
    }
    return{
        data:BotInfo
    }
}

const DeleteBot = function(opt){
    const id = opt.url.substr(opt.url.length-5,5);
    console.log('DeleteBotID', id);
}

const DeleteAllBot = function(){
    console.log("delete all bots");
}

const DeleteGroups = function(opt){
    let data = JSON.parse(opt.body);
    console.log('BotID', data.bot_id, 'DeleteGroupID', data.delet_groups);
}

const CreateBot = function(opt){
    let data = JSON.parse(opt.body);
    console.log('BotType:', data.data.bot_type, 'Groups:', data.data.managed_groups);
}

const AddGroups = function(opt){
    let data = JSON.parse(opt.body);
    console.log('BotID:', data.data.bot_id, 'Groups:', data.data.add_groups);
}

// 请求包含 '/robots' 字段的接口，会被拦截到该随机数据格式
Mock.mock('/robots', 'get', BotData);

// '/robots/{{bot_id}}' 某个bot的详细信息
Mock.mock(RegExp('/robots' + ".*"), "get", (opt) =>{
    const id = opt.url.substr(opt.url.length-5,5);
    return Mock.mock(BotDetail(id));
});

// '/robots/deletegroups' 删除某个bot下的一些group
Mock.mock('/robots/deletegroups', 'delete', DeleteGroups);

// '/robots' 删除所有bot
Mock.mock('/robots', "delete", DeleteAllBot);

// '/robots/{{bot_id}}' 删除某个bot
Mock.mock(RegExp('/robots' + ".*"), "delete", DeleteBot);

// '/robots' 添加一个bot
Mock.mock('/robots', "post", CreateBot);

// '/robots/addgroups' 在某个bot下添加一些group
Mock.mock('/robots/addgroups', 'post', AddGroups);