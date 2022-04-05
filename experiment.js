const btn_html_timer =
    `<style onload="tid=setInterval(timer, 1000)"></style>
     <button onclick="clearInterval(tid)" class="jspsych-btn" disabled=true>%choice%</button>`

const feedback_right = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: green"> √ </span>`

const feedback_wrong = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: red"> X </span>`

const subID = jsPsych.randomization.randomID(8)


/* Blocks: HTML DOM Settings */

var set_html_style = {
    type: 'call-function',
    func: function() {
        document.body.style.backgroundColor = 'rgb(250, 250, 250)' // background color
        document.body.style.color = 'black' // font color
        document.body.style.fontSize = '20pt'
        document.body.style.fontFamily = '微软雅黑'
        document.body.style.fontWeight = 'bold' // 'normal', 'bold'
        document.body.style.lineHeight = '1.6em' // line space
        document.body.style.cursor = 'default' // 'default', 'none', 'wait', ...
        document.body.onselectstart = function() { return false } // 禁止选中文字 <body oncontextmenu="return false">
        document.body.oncontextmenu = function() { return false } // 禁用鼠标右键 <body onselectstart="return false">
        document.onkeydown = function() {
            // 屏蔽键盘按键 (https://www.bejson.com/othertools/keycodes/)
            if ((event.keyCode in { 27: 'Esc', 116: 'F5', 123: 'F12' }) ||
                (event.ctrlKey && event.keyCode in { 85: 'U' })
            ) { return false }
        }
    },
}

var set_html_style_EAST = {
    type: 'call-function',
    func: function() {
        document.body.style.backgroundColor = 'black'
        document.body.style.color = 'white'
        document.body.style.fontSize = '32pt'
        document.body.style.fontFamily = '微软雅黑'
        document.body.style.fontWeight = 'normal'
        document.body.style.lineHeight = '1.2em'
        document.body.style.cursor = 'none'
    },
}


/* Blocks: Basics */

var open_fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: true,
    message: `
    <p style="font: 16pt 微软雅黑; text-align: left; line-height: 1.6em">
    <b>
    本测验共包含 30 道题目，预计需要 3-5 分钟时间。<br/>
    测验将在一个「全屏页面」呈现，请在电脑上进行，并使用主流浏览器打开本网页。<br/>
    测验数据仅供研究使用，严格保密。<br/>
    如果你同意参与，并且清楚理解了上述要求，请点击开始：
    </p>`,
    button_label: '点击这里开始',
    delay_after: 100
}

var welcome = {
    type: 'html-keyboard-response',
    stimulus: `
    <p style="font: bold 32pt 微软雅黑; color: #B22222">
    欢迎参与本次测验</p>
    <p style="font: 20pt 微软雅黑; color: black"><br/>
    <按空格键继续><br/>
    <b>测验过程中请勿中途暂停或退出</b><br/><br/></p>
    <p style="font: 20pt 华文中宋; color: grey">
    江西师范大学心理学院<br/>2022年</p>`,
    choices: [' '],
    post_trial_gap: 100
}

var warmup = {
    type: 'html-button-response',
    stimulus: '<p>请做好准备……</p>',
    choices: ['<span id="timer">3</span>秒后继续'],
    button_html: btn_html_timer
}

var instr_likert = {
    type: 'instructions',
    pages: [
        `<p style="text-align: left">
        本测验分为两部分。<br/>
        在第一部分测验中，将依次呈现一系列陈述（共20个），<br/>
        请根据你自身的真实情况，表明你对这些陈述的同意程度：<br/><br/>
        1 = 非常不同意<br/>
        2 = 不同意<br/>
        3 = 不太确定<br/>
        4 = 同意<br/>
        5 = 非常同意</p>`,
    ],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '我已了解，开始测验'
}

var instr_fc = {
    type: 'instructions',
    pages: [
        `<p style="text-align: left">
        第一部分测验已结束。<br/>
        下面开始第二部分（共10道题目）：<br/>
        在每次呈现的两个陈述（A和B）中，根据你认为的偏好程度做出相应的选择<br/><br/>
        1 = 更偏向A（A更加符合我）<br/>
        2 = 略微偏向A<br/>
        3 = A和B同样符合我<br/>
        4 = 略微偏向B<br/>
        5 = 更偏向B（B更加符合我）</p>`,
    ],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '我已了解，开始测验'
}

var close_fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: false,
    delay_after: 0
}


/* Blocks: Surveys */

var Sex = {
    type: 'html-button-response',
    data: { varname: 'Sex' },
    stimulus: '你的性别',
    choices: ['男', '女', '其他'],
    on_finish: function(data) { addRespFromButton(data) }
}

var Age = {
    type: 'survey-html-form',
    data: { varname: 'Age' },
    preamble: '你的年龄',
    html: `
    <p><input name="Q0" type="number" placeholder="15~99" min=15 max=99
    oninput="if(value.length>2) value=value.slice(0,2)" required /></p>`,
    button_label: '继续',
    on_finish: function(data) { addRespFromSurvey(data) }
}

var LIKERT = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: `
        <p style="font-size: 16pt; font-weight: normal">
        请表明你对该陈述的同意程度<br/>
        （1 = 非常不同意，5 = 非常同意）</p>`,
        choices: ['1', '2', '3', '4', '5'],
        on_finish: function(data) { addRespFromButtonScale(data, 'LIKER') },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i: 1 }, s: '我是聚会的核心人物' },
        { data: { i: 2 }, s: '我容易感到压力过大' },
        { data: { i: 3 }, s: '我话不多' },
        { data: { i: 4 }, s: '我和其他人在一起时感到自在' },
        { data: { i: 5 }, s: '我注重细节' },
        { data: { i: 6 }, s: '我是个低调的人' },
        { data: { i: 7 }, s: '我会同情他人的感受' },
        { data: { i: 8 }, s: '我很少感到沮丧' },
        { data: { i: 9 }, s: '我常把事情弄得一团糟' },
        { data: { i: 10 }, s: '我总是主动开始谈话' },
        { data: { i: 11 }, s: '我很容易被打扰' },
        { data: { i: 12 }, s: '我经常忘记把东西放回原处' },
        { data: { i: 13 }, s: '我的想象力欠佳' },
        { data: { i: 14 }, s: '我不喜欢引起别人的注意' },
        { data: { i: 15 }, s: '我会推卸职责' },
        { data: { i: 16 }, s: '我会使用晦涩的文字' },
        { data: { i: 17 }, s: '我能感受到他人的情绪' },
        { data: { i: 18 }, s: '我会花时间反思事情' },
        { data: { i: 19 }, s: '我对我的工作很严谨' },
        { data: { i: 20 }, s: '我时常感到沮丧' },
    ],
    randomize_order: false
}

var Forced_choice = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: `
        <p style="font-size: 16pt; font-weight: normal">
        请在这两个陈述A和B中，根据你的偏好程度做出选择<br/>
        （1 = 更偏向A，5 = 更偏向B）</p>`,
        choices: ['1', '2', '3', '4', '5'],
        on_finish: function(data) { addRespFromButtonScale(data, 'RSES') },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i: 1 }, s: 'A.我容易感到压力过大<br/>B.我话不多' },
        { data: { i: 2 }, s: 'A.我不喜欢引起别人的注意<br/>B.我经常忘记把东西放回原处' },
        { data: { i: 3 }, s: 'A.我会推卸职责<br/>B.我的想象力欠佳' },
        { data: { i: 4 }, s: 'A.我很容易被打扰<br/>B.我是聚会的核心人物' },
        { data: { i: 5 }, s: 'A.我是个低调的人<br/>B.我注重细节' },
        { data: { i: 6 }, s: 'A.我常把事情弄得一团糟<br/>B.我会使用晦涩的文字' },
        { data: { i: 7 }, s: 'A.我时常感到沮丧<br/>B.我会花时间反思事情' },
        { data: { i: 8 }, s: 'A.我和其他人在一起时感到自在<br/>B.我会同情他人的感受' },
        { data: { i: 9 }, s: 'A.我能感受到他人的情绪<br/>B.我对我的工作很严谨' },
        { data: { i: 10 }, s: 'A.我很少感到沮丧<br/>B.我总是主动开始谈话' },
    ],
    randomize_order: false
}

var OpenEnded = {
    type: 'survey-text',
    data: { varname: 'OpenEnded' },
    questions: [{
        prompt: '测验已全部完成，你可以分享任何疑问或想法：',
        placeholder: '非必答',
        rows: 5,
        columns: 50,
        required: false
    }],
    button_label: '完成',
    on_finish: function(data) { addRespFromSurvey(data) }
}

/* Combine Timelines */

//人口学变量
var demographics = {
    timeline: [
        Sex, Age,
    ]
}

var surveys = {
    timeline: [
        instr_likert, LIKERT,
        instr_fc, Forced_choice,
    ]
}

// 总时间线
var main_timeline = [
    set_html_style,
    open_fullscreen,
    welcome,
    warmup,
    demographics,
    surveys,
    OpenEnded,
    close_fullscreen,
]

/* Launch jsPsych */

jsPsych.init({
    timeline: main_timeline,
    on_finish: function() {
        jsPsych.data.get().localSave('csv', `data_${subID}.csv`) // download from browser
        document.getElementById('jspsych-content').innerHTML += '测验结束，感谢您的参与！'
    }
})