import Mock from 'mockjs';

const ServData = function(){
    let ServData = [];

    ServData.push(
        {
            type: '电影',
            serv_default: 1,
            id: 30000,
            serv_list:[
                {
                    serv_id: "00001",
                    serv_name: "豆瓣",
                    serv_type: '电影',
                },
                {
                    serv_id: "00002",
                    serv_name: "豆浆",
                    serv_type: '电影',
                },
                {
                    serv_id: "00003",
                    serv_name: "豆奶",
                    serv_type: '电影',
                },
            ]
        },
        {
            type: '追星',
            serv_default: 1,
            id: 30001,
            serv_list:[
                {
                    serv_id: "00004",
                    serv_name: "微博",
                    serv_type: '追星',
                },
                {
                    serv_id: "00005",
                    serv_name: "中博",
                    serv_type: '追星',
                },
                {
                    serv_id: "00006",
                    serv_name: "大博",
                    serv_type: '追星',
                }
            ]
        },
        {
            type: '游戏',
            serv_default: 1,
            id: 30002,
            serv_list:[
                {
                    serv_id: "00007",
                    serv_name: "Steam",
                    serv_type: '游戏',
                },
                {
                    serv_id: "00008",
                    serv_name: "Stream",
                    serv_type: '游戏',
                },
                {
                    serv_id: "00009",
                    serv_name: "Sream",
                    serv_type: '游戏',
                },
            ]
        },
    );

    for(let i = 3; i < 5; i++){
        ServData.push({
            type: Mock.Random.cword(3, 5),
            serv_default: 0,
            id: 30000 + i,
            serv_list:[
                {
                    serv_id: "00001",
                    serv_name: "豆瓣",
                    serv_type: '电影',
                },
                {
                    serv_id: "00004",
                    serv_name: "微博",
                    serv_type: '追星',
                },
                {
                    serv_id: "00007",
                    serv_name: "Steam",
                    serv_type: '游戏',
                },
            ]
        })
    }

    return{
        data:ServData
    }
}

const CreateServList = function(opt){
    let data = JSON.parse(opt.body);
    console.log('ID:', data.data.id, 'Type:', data.data.type, 'Servs:', data.data.add_servs);
}

const ServDetail = function(id){
    var ServInfo = {
        serv_name: "豆浆",
        serv_type: "电影",
        serv_description: Mock.Random.csentence(),
    }
    return{
        data:ServInfo
    }
}

// '/services' 所有service
Mock.mock('/services', 'get', ServData);

// '/services' 添加service组
Mock.mock('/services', 'post', CreateServList);

// '/services/{{serv_id}}' 某个service的详细信息
Mock.mock(RegExp('/services' + ".*"), "get", (opt) =>{
    const id = opt.url.substr(opt.url.length-5,5);
    return Mock.mock(ServDetail(id));
});