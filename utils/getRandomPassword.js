module.exports = function () {
    const tmpPsw = Math.random().toString(36).substr(2, 6) // 随机生成6位的数字英文字符串
    return tmpPsw
}
