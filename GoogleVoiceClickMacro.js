(function googleVoiceClickMacro(gobal) {
    // 配置文件
    const CONFIG = {
        loopCount: 100000, // 循环次数
        sleepTimes: 2000, // 两次循环之间睡眠时间
    }

    const dispatchEvent = Symbol('dispatchMouseEvent')

    let document = gobal.document,
        x = Array.from(document.querySelectorAll('.goog-button-base-content')),
        element = x[x.length - 1]

    // 鼠标点击事件生成器
    class MouseEventGenerator {
        constructor(ele) {
            this.ele = ele
            this.eventList = ['mouseover', 'mousedown', 'click', 'mouseup']
        }
        // 私有方dispatchEvent法
        [dispatchEvent](target, ...args) {
            let e = document.createEvent('MouseEvent')
            e.initEvent.apply(e, args)
            target.dispatchEvent(e)
        }
        // 主函数
        __main__() {
            this.eventList.forEach(v => {
                this[dispatchEvent](this.ele, v, true, true)
            })
        }
    }

    const googleVoiceClick = new MouseEventGenerator(element)

    function getTime() {
        let time = new Date
        return time.toString()
    }

    async function timeout(obj, ms) {
        await new Promise((resolve) => {
            if (obj.ele.innerHTML === 'Continue »') {
                setTimeout(resolve, ms);
            }
        });
    }

    async function asyncLoop(config, obj) {
        let {
            loopCount,
            sleepTimes,
        } = config
        for (let i = 1; i < loopCount; ++i) {
            await timeout(obj, sleepTimes).then(() => {
                obj.__main__()
            })
            console.log(`${i}: ${getTime()}`) // 打印循坏当前执行的次数和事件
        }
    }
    asyncLoop(CONFIG, googleVoiceClick).then(() => {
        console.log(`${CONFIG.loopCount}次已经完成`) // 循坏次数完成
    })
}(window))