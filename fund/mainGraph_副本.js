/**
 * Created by Administrator on 2018/4/11 0011.
 */
var divID_main="mainGraph";
var clusterSelect=0;
var myChart_main = echarts.init(document.getElementById(divID_main));
var option = null;
var selectName=[];
var categoriesMain = [];
var relationThreshold=0;
var overlapThreshold=0;
var myChart_main_data;

var app_main = {};
var posList = [
    'left', 'right', 'top', 'bottom',
    'inside',
    'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
    'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
];
var clusterList_mian=['单点聚类','多点聚类','全部聚类','全部取消聚类'];
// var setOverlapThreshold;
// var setRalationThreshold;

app_main.configParameters = {
    clusterOption: {
        options: echarts.util.reduce(clusterList_mian, function (map, pos) {
            map[pos] = pos;
            return map;
        }, {})
    },
    setOverlapThreshold: {
        min: 0,
        max: 1,
        step:0.01,
    },
    setRalationThreshold: {
        min: 0,
        max: 1,
        step:0.01,
    },

    // verticalAlign: {
    //     options: {
    //         top: 'top',
    //         middle: 'middle',
    //         bottom: 'bottom'
    //     }
    // },

};
var runDebounce = _.debounce(function(){refreshMyChart_main(myChart_main_data);}, 300, {
    trailing: true
});
var lastClusterOption='单点聚类';
app_main.config = {
    clusterOption: '单点聚类',
    setOverlapThreshold: 0.01,
    setRalationThreshold: 0.01,
    onChange: function () {
        relationThreshold=app_main.config.setRalationThreshold;
        overlapThreshold=app_main.config.setOverlapThreshold;
        runDebounce();
        //refreshMyChart_main(myChart_main_data);
        if( app_main.config.clusterOption!=lastClusterOption){
            lastClusterOption=app_main.config.clusterOption;
        if (app_main.config.clusterOption=="单点聚类"){
            clusterSelect=0;
            if (selectName.length>1 ){
                //需要重新请求
                buf=selectName[selectName.length-1];
                selectName=[];
                selectName.push(buf);
                getGraphData(selectName);
            }
        }
        else if (app_main.config.clusterOption=="多点聚类"){
            clusterSelect=1;
        }
        else if (app_main.config.clusterOption=="全部聚类"){
            selectName=categoriesMain;
            clusterSelect=2;
            getGraphData(selectName);
        }
        else{
            selectName=[];
            clusterSelect=3;
            getGraphData(selectName);
        }
        }

    }
};
// if (gui_main) {
//     $(gui_main.domElement).remove();
//     gui_main.destroy();
//     gui_main = null;
// }
if (app_main.config) {
    gui_main = new dat.GUI({
        autoPlace: false
    });
    $(gui_main.domElement).css({
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1000
    });
    $('#'+divID_main).append(gui_main.domElement);

    var configParameters = app_main.configParameters || {};
    for (var name in app_main.config) {
        var value = app_main.config[name];
        if (name !== 'onChange' && name !== 'onFinishChange') {
            var isColor = false;
            // var value = obj;
            var controller;
            if (configParameters[name]) {
                if (configParameters[name].options) {
                    controller = gui_main.add(app_main.config, name, configParameters[name].options);
                }
                else if (configParameters[name].min != null) {
                    controller = gui_main.add(app_main.config, name, configParameters[name].min, configParameters[name].max).step(configParameters[name].step);
                }
            }
            app_main.config.onChange && controller.onChange(app_main.config.onChange);
            app_main.config.onFinishChange && controller.onFinishChange(app_main.config.onFinishChange);
        }
    }
}


function isInArray(arr,value){
    for(var i = 0; i < arr.length; i++){
        if(value === arr[i]){
            return i;
        }
    }
    return -1;
}


function getGraphData(list1)
{
    $.ajax({url:mylocalURL+"fundGraph",type: "POST",data:{ 'nameList':list1.join('*'),"galleryIndex":0},success:function(result){
        myChart_main.hideLoading();
        getGraphsuccess(result)	;

    }});

}
var linear = d3.scale.linear()
    .domain([100,1300])  //需要做相应的修改
    .range([10,20]);

function getGraphsuccess(graph){
    myChart_main.hideLoading();
    myChart_main_data=graph;
    refreshMyChart_main(myChart_main_data);
}
function refreshMyChart_main(graph){

    categoriesMain=graph['category'];
    var categories=[];
    for (var i = 0; i < graph['category'].length; i++) {
        categories[i] = {
            name: graph['category'][i]
        };
    }
    graph.nodes.forEach(function (node) {
        // node.itemStyle = null;//可以控制symbol颜色

        node.value = node.symbolSize;
        node.symbolSize = linear(node.symbolSize);//可以控制symbol大小
        node.category = node.category;// 分类从0开始取
        // Use random x, y
        node.type='node';
        node.x = node.y = null;
        node.draggable = true;

    });
    graph.links.forEach(function (link) {
        // node.itemStyle = null;//可以控制symbol颜色
        link.type='edge';
        if(Math.abs(link.overlap)<=overlapThreshold || Math.abs(link.value)<=relationThreshold){
            link.lineStyle.normal.opacity=0;
        }
        else  link.lineStyle.normal.opacity=1;

    });
    option = {
        title: {
            text: '基金初步分析',
            subtext: 'Default layout',
            top: 40,
            left: 'right'
        },
        tooltip: {
            triggerOn:'mousemove|click',
            enterable:'true',
        },
        legend: [{
            // selectedMode: 'single',
            data: categories.map(function (a) {
                return a.name;
            })
        }],
        animation: false,
        calculable: true,
        series : [
            {
                name: 'matrix2',
                type: 'graph',
                layout: 'force',
                data: graph.nodes,//一定要有id
                links:graph.links ,//getLinks(graph.links,10) 源目的节点使用节点id
                categories: categories,//只是一个名字而已，名字随便设置，但更关注索引
                roam: true,
                label: {
                    normal: {

                        position: 'right',
                        fontStyle:'oblique'
                    },
                    emphasis: {
                        position: 'right',
                        show: true
                    }
                },
                lineStyle:{
                    width:1,
                    opacity:1,
                    color:'#444'
                },
                draggable:true,
                focusNodeAdjacency: true,
                force: {
                    //斥力的大小，影响边的长度
                    repulsion: 100,
                    //边长的范围
                    edgeLength:[50,80]
                },
                //图标可自定义
                symbol:'circle',
                symbolSize :10,
                //边的端点的图标 ,常见箭头：edgeSymbol: ['circle', 'arrow']
                edgeSymbol: ['none', 'none'],
                edgeLabel:{
                },
                tooltip:{// 需要填充 和管理 selectName（不包含子属性名）， 和发送getScatterData(['','']);【内部使用子属性名】
                    formatter: function (params, ticket, callback) {
                        var strHtml='';
                        if(params['data']['type']=='node')	{
                            strHtml='node: '+params['data']['id']+'<br/>value: '+params['data']['value']+'条';
                        }
                        else{
                            strHtml='edge: '+params['data']['source']+'==>'+params['data']['target']+'<br/>correlation: '+params['data']['value']+'<br/>overlap: '+params['data']['overlap'];
                        }

                        return strHtml;
                    }
                },

            }
        ]
    };
    myChart_main.setOption(option);


}

myChart_main.showLoading();
getGraphData([]);//先请求一次
if (option && typeof option === "object") {
    myChart_main.setOption(option, true);
}

myChart_main.on('click',	function(params){
    //单点聚类、多点聚类、全部聚类、全部取消聚类
    if(params['data']['type']=='node')	{
        name=params['data']['id'].split(',')[0];
        if ($('#isRefresh').prop("checked")){
            switch (clusterSelect){
                case 3:
                case 0:if(selectName[0]==name) {getGraphData([]); selectName=[];}
                else {selectName=[];selectName.push(name);getGraphData(selectName);}
                    break;
                case 1:
                case 2:i=isInArray(selectName,name);
                    if(i==-1)
                    {
                        selectName.push(name);getGraphData(selectName);
                    }else{
                        selectName.splice(i,1);
                        getGraphData(selectName);
                    }
                    break;
            }
        }
    }
    else{
        if ($('#isRefresh').prop("checked")){
            getScatterData([params['data']['source'],params['data']['target']]);
        }
    }
});




