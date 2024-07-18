exports.ramdomOrderNumber = () => {
    const prefix = "B", randomNumber = Math.floor(Math.random() * 1000)
    return prefix + randomNumber
}