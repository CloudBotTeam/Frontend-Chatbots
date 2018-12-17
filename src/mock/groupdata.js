import Mock from 'mockjs';

const servType = ['电影', '游戏', '追星'];
const groupType = ['QQ', 'WeChat'];

const GroupData = function(){
    let GroupList = []; // 定义需要的数据
    for (let i = 0; i <= 25; i++) {
        let Group = { // 根据数据模板生成模拟数据
            group_name: Mock.Random.last(), // 随机生成群名字
            group_id: (20000+i).toString(), // 随机生成群id
            timestamp: Mock.Random.datetime(), // 随机生成创建时间
            group_type: groupType[Mock.Random.integer(0, 1)], // 随机生成类型, QQ:0, WeChat:1
        }
        GroupList.push(Group)
    }
    return{
        data:GroupList
    }
}

const GroupDetail = function(id){
    var servlist = [];
    for (let i = 0; i <= 5; i++) {
        servlist.push({
            serv_name: Mock.Random.last(), // 随机生成service名字
            serv_id: (20000+i).toString(), // 随机生成service_id
            serv_type: servType[Mock.Random.integer(0, 2)], // 随机生成类型
        })
    }
    
    let GroupInfo = {
        group_name: Mock.Random.last(),
        timestamp: Mock.Random.datetime(),
        group_type: groupType[Mock.Random.integer(0, 1)], // 随机生成类型, QQ:0, WeChat:1
        managed_servs:servlist,
    }
    return{
        data:GroupInfo
    }
}

const DeleteGroup = function(opt){
    const id = opt.url.substr(opt.url.length-5,5);
    console.log('DeleteGroupID:', id);
}

const DeleteServs = function(opt){
    let data = JSON.parse(opt.body);
    console.log('GroupID:', data.group_id, 'DeleteServID:', data.delet_servs);
}

//请求包含 '/groups' 字段的接口，会被拦截到该随机数据格式
Mock.mock('/groups', 'get', GroupData);

//'/groups/{{group_id}}'
Mock.mock(RegExp('/groups' + ".*"), "get", (opt) =>{
    // 最佳实践，将请求和参数都打印出来，以便调试
    const group_id = opt.url.substr(opt.url.length-5,5);
    return Mock.mock(GroupDetail(group_id));
});

// '/robots/deleteservs'
Mock.mock('/groups/deleteservs', 'delete', DeleteServs);

//'/groups/{{group_id}}'
Mock.mock(RegExp('/groups' + ".*"), "delete", DeleteGroup);

