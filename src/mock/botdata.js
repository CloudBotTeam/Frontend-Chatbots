import Mock from 'mockjs';

const Type = ['QQ', 'WeChat'];

const BotData = function(){
    let ChatbotList = []; // 定义需要的数据
    for (let i = 0; i <= 5; i++) {
        let Chatbot = { // 根据数据模板生成模拟数据
            bot_name: Mock.Random.last(), // 随机生成机器人名字
            bot_id: (10000+i).toString(), // 随机生成机器人id
            timestamp: Mock.Random.datetime(), // 随机生成创建时间
            bot_type: Type[Mock.Random.integer(0, 1)], // 随机生成类型, QQ:0, WeChat:1
            status: Mock.Random.integer(0, 2), // 随机生成状态, 未启动:0, 运行中:1, 故障:2
        }
        ChatbotList.push(Chatbot)
    }
    return{
        data:ChatbotList
    }
}

const BotDetail = function(id){
    var grouplist = [];
    for (let i = 0; i <= 5; i++) {
        grouplist.push({ // 根据数据模板生成模拟数据
            group_name: Mock.Random.last(), // 随机生成机器人名字
            group_id: (20000+i).toString(), // 随机生成机器人id
            timestamp: Mock.Random.datetime(), // 随机生成创建时间
            group_type: Type[Mock.Random.integer(0, 1)], // 随机生成类型, QQ:0, WeChat:1
        })
    }

    let BotInfo = {
        bot_name: Mock.Random.last(), // 随机生成机器人名字
        timestamp: Mock.Random.datetime(), // 随机生成创建时间
        bot_type: Type[Mock.Random.integer(0, 1)], // 随机生成类型, QQ:0, WeChat:1
        managed_groups:grouplist,
    }
    return{
        data:BotInfo
    }
}

const DeleteBot = function(opt){
    const id = opt.url.substr(opt.url.length-5,5);
    console.log('DeleteBotID', id);
}

const DeleteGroups = function(opt){
    let data = JSON.parse(opt.body);
    console.log('BotID', data.bot_id, 'DeleteGroupID', data.delet_groups);
}

// 请求包含 '/robots' 字段的接口，会被拦截到该随机数据格式
Mock.mock('/robots', 'get', BotData);

// '/robots/{{bot_id}}'
Mock.mock(RegExp('/robots' + ".*"), "get", (opt) =>{
    const id = opt.url.substr(opt.url.length-5,5);
    return Mock.mock(BotDetail(id));
});

// '/robots/deletegroups'
Mock.mock('/robots/deletegroups', 'delete', DeleteGroups);

// '/robots/{{bot_id}}'
Mock.mock(RegExp('/robots' + ".*"), "delete", DeleteBot);