//t-sne 筛选，需要更新所有视图
/*
externalRefreshMain();
externalRefreshParallel();
externalSlightRefreshMain();
*/

getTabs2ActiveID();
function tsne_size_update(){
    // tsneScatter.resize({height:700,width:700});
    getTabs2ActiveID();
    tsneScatter.resize({width:$(tabs2ActiveID).width(),height:500});
}

var tsneScatter = echarts.init(document.getElementById("t-sne"));
var tsneOption = null;
var tsneData = [
    [[7.486530780792236, 24.708782196044922, 0], [6.86874532699585, 27.2205867767334, 0], [7.6101908683776855, 27.612224578857422, 0], [8.00197696685791, 27.598011016845703, 0], [7.896238327026367, 24.650672912597656, 0], [7.704470157623291, 22.787321090698242, 0], [8.45893669128418, 27.209335327148438, 0], [7.473389625549316, 25.453115463256836, 0], [8.25815486907959, 28.346384048461914, 0], [7.2528815269470215, 26.793045043945312, 0], [7.093339920043945, 23.245832443237305, 0], [8.067750930786133, 26.09398078918457, 0], [7.158837795257568, 27.501359939575195, 0], [7.859926700592041, 28.813447952270508, 0], [7.013984680175781, 21.959129333496094, 0], [7.549585342407227, 21.78431510925293, 0], [7.334159851074219, 22.660030364990234, 0], [7.368222236633301, 24.663482666015625, 0], [6.821596622467041, 22.484407424926758, 0], [7.8923115730285645, 23.641563415527344, 0], [6.372684001922607, 23.895524978637695, 0], [7.73131799697876, 23.947540283203125, 0], [6.664567470550537, 28.602052688598633, 0], [6.256158828735352, 25.18549346923828, 0], [8.644475936889648, 25.971792221069336, 0], [6.625345230102539, 26.83904266357422, 0], [6.819243907928467, 25.280197143554688, 0], [7.129024982452393, 24.305715560913086, 0], [7.010838508605957, 24.66344451904297, 0], [8.090882301330566, 26.910560607910156, 0], [7.729287147521973, 26.884798049926758, 0], [6.439036846160889, 23.97214126586914, 0], [8.110179901123047, 22.618492126464844, 0], [7.635857582092285, 22.088417053222656, 0], [7.252881050109863, 26.793045043945312, 0], [6.65778112411499, 26.34791374206543, 0], [6.479757308959961, 23.352455139160156, 0], [7.2528815269470215, 26.793045043945312, 0], [7.98077917098999, 28.403520584106445, 0], [7.242760181427002, 25.114349365234375, 0], [7.751913547515869, 25.037090301513672, 0], [8.850749969482422, 28.72844696044922, 0], [7.74574089050293, 28.334291458129883, 0], [6.290938377380371, 24.920761108398438, 0], [8.539761543273926, 23.4372501373291, 0], [7.140254497528076, 27.525501251220703, 0], [8.00741958618164, 23.582971572875977, 0], [8.01351261138916, 27.61297607421875, 0], [7.295608043670654, 23.483985900878906, 0], [7.261850833892822, 25.835729598999023, 0]],
    [[-5.542805194854736, -6.06608772277832, 1], [-3.8679628372192383, -6.06990385055542, 1], [0.163080096244812, -3.001542091369629, 1], [-4.301788330078125, -6.399115562438965, 1], [-1.0834531784057617, -5.147861480712891, 1], [-3.6899056434631348, -6.796986103057861, 1], [1.7700092792510986, -2.5816409587860107, 1], [-4.536698818206787, -5.990917205810547, 1], [0.8040934801101685, -3.9097208976745605, 1], [1.483293890953064, -2.361464738845825, 1], [-1.5552036762237549, -5.013425350189209, 1], [-0.295509397983551, -2.679102659225464, 1], [-2.903848886489868, -6.427123069763184, 1], [0.9406659603118896, -4.021141529083252, 1], [-4.6453633308410645, -5.660459041595459, 1], [-0.9633697867393494, -5.552695274353027, 1], [-0.5302809476852417, -3.670747756958008, 1], [-1.3308954238891602, -7.264400482177734, 1], [0.28727567195892334, -3.296692132949829, 1], [-2.8368098735809326, -7.955662727355957, 1], [-1.5612905025482178, -4.2314453125, 1], [-4.409411430358887, -8.228623390197754, 1], [-2.702984571456909, -6.08197546005249, 1], [-3.4758856296539307, -5.351457118988037, 1], [-4.315262317657471, -5.668734550476074, 1], [-5.258307933807373, -6.492678165435791, 1], [-2.2934517860412598, -5.940696716308594, 1], [1.109235405921936, -3.300985813140869, 1], [0.6044905781745911, -3.0187981128692627, 1], [0.8126571178436279, -2.913740873336792, 1], [0.039968136698007584, -3.861875534057617, 1], [-3.9113049507141113, -9.018410682678223, 1], [-0.5625834465026855, -5.503646373748779, 1], [-2.6918201446533203, -6.878244876861572, 1], [-5.058380603790283, -6.284091472625732, 1], [-1.2994440793991089, -7.024738788604736, 1], [-0.1632460504770279, -4.7189154624938965, 1], [0.21690811216831207, -3.536403179168701, 1], [-0.7667422294616699, -3.9933853149414062, 1], [-2.8314297199249268, -6.17179012298584, 1], [-0.2660444378852844, -3.62428617477417, 1], [1.7030754089355469, -2.5746543407440186, 1], [-0.34015128016471863, -4.256106853485107, 1], [-0.6566209197044373, -4.708331108093262, 1], [-0.7005098462104797, -4.636291027069092, 1], [-2.6457810401916504, -5.249007701873779, 1], [1.9051413536071777, -2.618446111679077, 1], [-0.34262287616729736, -4.339653015136719, 1], [-3.201059103012085, -9.483667373657227, 1], [-1.516680121421814, -2.8270795345306396, 1], [-2.9396252632141113, -9.723456382751465, 1], [-2.979623794555664, -10.200568199157715, 1], [-4.0834269523620605, -9.50346565246582, 1], [-2.6357336044311523, -9.436395645141602, 1], [-4.38104248046875, -8.475688934326172, 1], [-3.8716328144073486, -8.167815208435059, 1], [-3.467495918273926, -8.232094764709473, 1], [-4.739635467529297, -8.416133880615234, 1], [-3.154064416885376, -8.107519149780273, 1], [-3.2010955810546875, -9.483572006225586, 1], [-4.61908483505249, -9.027009010314941, 1], [-3.211653709411621, -8.865047454833984, 1]],
    [[-5.706246852874756, -6.56847620010376, 2], [-5.923790454864502, -7.52271842956543, 2], [-9.431025505065918, -10.13270378112793, 2], [-8.784246444702148, -11.838037490844727, 2], [-6.465974807739258, -10.437225341796875, 2], [-7.955960750579834, -10.891152381896973, 2], [-9.6959867477417, -12.946815490722656, 2], [-9.041595458984375, -12.751644134521484, 2], [-7.081768035888672, -11.580172538757324, 2], [-9.82679557800293, -11.64809799194336, 2], [-7.097209930419922, -9.070338249206543, 2], [-6.003738880157471, -9.739872932434082, 2], [-7.942043781280518, -10.54017448425293, 2], [-8.084844589233398, -9.506381034851074, 2], [-6.817698955535889, -10.216713905334473, 2], [-10.335646629333496, -12.539360046386719, 2], [-9.726719856262207, -13.339085578918457, 2], [-8.783879280090332, -10.997496604919434, 2], [-9.64811897277832, -13.160714149475098, 2], [-8.51473331451416, -10.781970977783203, 2], [-8.840971946716309, -12.271428108215332, 2], [-7.111635684967041, -10.647846221923828, 2], [-8.424948692321777, -12.394067764282227, 2], [-8.975866317749023, -12.680569648742676, 2], [-10.321188926696777, -12.52796745300293, 2], [-7.292662143707275, -10.656387329101562, 2], [-5.064753532409668, -10.254751205444336, 2], [-9.590510368347168, -12.581950187683105, 2], [-8.96617317199707, -9.707174301147461, 2], [-6.778892993927002, -10.133228302001953, 2], [-8.07607364654541, -10.303311347961426, 2], [-8.550164222717285, -10.419622421264648, 2], [-7.932342052459717, -9.402382850646973, 2], [-8.958829879760742, -11.08818244934082, 2], [-9.058444023132324, -10.474841117858887, 2], [-7.805943012237549, -9.62535285949707, 2], [-6.924258708953857, -9.418133735656738, 2], [-8.695621490478516, -9.303678512573242, 2]]
];

tsneOption = {
    /* backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
        offset: 0,
        color: '#f7f8fa'
    }, {
        offset: 1,
        color: '#cdd0d5'
    }]), */
    title: {
        text: 't-SNE'
    },
    tooltip: {
        axisPointer: {
            type: 'cross'
        }
    },
    toolbox: {
        feature: {
            myTool1: {
                show: true,
                title:'获取tsne图',
                //icon: 'image://http://echarts.baidu.com/images/favicon.png',
                icon: 'path://M512 960c-278.748 0-505.458-222.762-511.848-499.974 5.92 241.864 189.832 435.974 415.848 435.974 229.75 0 416-200.576 416-448 0-53.020 42.98-96 96-96s96 42.98 96 96c0 282.77-229.23 512-512 512zM512-64c278.748 0 505.458 222.762 511.848 499.974-5.92-241.864-189.832-435.974-415.848-435.974-229.75 0-416 200.576-416 448 0 53.020-42.98 96-96 96s-96-42.98-96-96c0-282.77 229.23-512 512-512z',
                onclick: function (){
                    showToast('info',"tsne图计算中。。。");
                    $.ajax({url:mylocalURL+"getTSNE",type: "POST",data:{"galleryIndex":0,"perplexity": app_main.config.perplexity},success:function(result){
                        //result
                        showToast('success',"tsne获取成功");
                        tsneData=result;
                        tsenRefreshData(result);

                    }});
                }
            }
        }
    },
    brush: {
        toolbox: ['rect', 'polygon', 'keep', 'clear'],
        xAxisIndex: 0,
        throttleType:'debounce',
        throttleDelay:1000,
    },
    legend: {
        top: 22,
        right: 10,
    },
    xAxis: {
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        }
    },
    yAxis: {
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
        scale: true
    },
    series: [{
        name: '0',
        data: tsneData[0],
        type: 'scatter',
        tooltip: {
            formatter: function (param) {
                return [
                    'dataName: ' + param.data[2],
                ].join('<br/>')
            }
        },
        label: {
            emphasis: {
                show: false,
                // formatter: function (param) {
                //     return [
                //         'dataName: ' + param.data[2],
                //         'class: ' + param.data,
                //     ].join('<br/>')
                //     //return param.data[0].toFixed(2)+','+param.data[1].toFixed(2);
                // },
                // position: 'top'
            }
        },
        itemStyle: {
            normal: {
                shadowBlur: 10,
                shadowColor: 'rgba(120, 36, 50, 0.5)',
                shadowOffsetY: 5,
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                    offset: 0,
                    color: 'rgb(251, 118, 123)'
                }, {
                    offset: 1,
                    color: 'rgb(204, 46, 72)'
                }])
            }
        }
    }]
};
tsenRefreshData(tsneData);
function tsenRefreshData(data1){
    tsneOption.series=[];
    for (i in data1){
        tsneOption.series.push(
            {
                name: i,
                data: data1[i],
                type: 'scatter',
                tooltip: {
                    formatter: function (param) {
                        return [
                            'dataName: ' + param.data[2],
                        ].join('<br/>')
                    }
                },
                label: {
                    emphasis: {
                        show: false,
                        // formatter: function (param) {
                        //     return [
                        //         'dataName: ' + param.data[2],
                        //         'class: ' + param.data,
                        //     ].join('<br/>')
                        //     //return param.data[0].toFixed(2)+','+param.data[1].toFixed(2);
                        // },
                        // position: 'top'
                    }
                },
                itemStyle: {
                    normal: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(120, 36, 50, 0.5)',
                        shadowOffsetY: 5,
                        /*  color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                             offset: 0,
                             color: 'rgb(251, 118, 123)'
                         }, {
                             offset: 1,
                             color: 'rgb(204, 46, 72)'
                         }]) */
                    }
                }
            }
        );

    }
    tsneScatter.setOption(tsneOption, true);
}


if (tsneOption && typeof tsneOption === "object") {
    tsneScatter.setOption(tsneOption, true);
}
tsneScatter.on('brushSelected', function (params) {
    if(params.batch[0]['areas'].length==0){return;}
    var array=params.batch[0]['selected'];
    //array[0]["dataIndex"]=arr
    var dataIdList=[];
    for (i in array){
        for(j in array[i]["dataIndex"])
        {
            dataIdList.push(tsneData[ array[i]['seriesName'] ][array[i]["dataIndex"][j]][3]);
        }
    }
    if (dataIdList.length==0) return;
    //alert("相关数据计算中。。。");
    showToast('warning',"相关数据计算中。。。");
    $.ajax({url:mylocalURL+"getIdList",type: "POST",data:{ 'idList':JSON.stringify(dataIdList), "galleryIndex":0},success:function(result){
        showToast('success',"计算完毕");
        externalRefreshMain();
    }});

});


