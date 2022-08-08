import { innerData } from "../types"

// 生成长数据
const longData: Array<innerData> = []
const randomStr = 'QAZWSXEDCRFVTGBYHNUJMIKOLP'

for (let index = 0; index < 5000; index++) {
    const obj: innerData = {
        id: index,
        name: randomStr[Math.floor(Math.random() * 26)],
        word: `this index => ${index}`,
        timeStrap: new Date().getTime()
    }
    longData.push(obj)
}

export default longData