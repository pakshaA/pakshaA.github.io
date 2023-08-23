let output = document.querySelector('output')
let arr = new Array()
let BracketsLvl = []
let result = 0
let newArr = []

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function () {
        calc(this.value)
    })
})

document.addEventListener('keydown', event => {
    if ((event.key).match(/[0-9.\/*\-+\(\)=]|Backspace|Enter|c|с/)) calc(event.key)
})

function calc(value) {
    if (value.match(/=|Enter/)) {
        try {
            parsing(output.textContent)
            if (result === undefined) result = 'Деление на 0'
            output.textContent = result
        } catch(e) {
            console.log(e)
            alert(e)
        }
    } else if (value === "c" | value === "с" | value === "C") {
        BracketsLvl = []
        output.textContent = ''
    } else if (value.match(/CE|Backspace/)) {
        if (output.textContent[output.textContent.length - 1] === ')') 
            BracketsLvl.push(true)
        else if (output.textContent[output.textContent.length - 1] === '(') 
            BracketsLvl.pop()
        output.textContent = output.textContent.substring(0, output.textContent.length - 1)
    } else {
        if (value === '(') {
            BracketsLvl[BracketsLvl.length] = true
            output.textContent += value
        } else if (value === ')') {
            for(let i = 1; i <= BracketsLvl.length; i++) {
                if (BracketsLvl[BracketsLvl.length - i] === true) {
                    BracketsLvl[BracketsLvl.length - i] = false
                    BracketsLvl.pop()
                    output.textContent += value
                    break
                }
            }
        } else {
            output.textContent += value
        }
    }
}

function parsing(expr) {
    let item = ''
    arr = []
    for (let i = 0; i < expr.length; i++) {
        if (expr[i] === '+' | expr[i] === '-' | expr[i] === '/' | expr[i] === '*') {
            if (item != '') arr.push(item) 
            arr.push(expr[i])
            item = ''
        } else if (expr[i] === '(') {
            arr.push(expr[i])
        } else if (expr[i] === ')') {
            if (item != '') arr.push(item) 
            arr.push(expr[i])
            item = ''
        } else {
            item += expr[i]
        }
    }
    if (item != '') arr.push(item)
    checkBrackts(arr)
}

function checkBrackts (arr) {
    let openedBrackers = []
    let closedBrackers = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '(') {
            openedBrackers.push(i)
        } else if (arr[i] === ')') {
            closedBrackers.push(i)
        }
    }
    if (openedBrackers.length != closedBrackers.length) {
        alert('Закрыты не все скобки.')
    } else if (openedBrackers.length != 0) {
        while (openedBrackers.length != 0) {
            let open = openedBrackers.pop()
            let close = closedBrackers.pop()
            let inBrackesArr = []
            for (let i = 0; i < (close-open+1); i++) {
                inBrackesArr[i] = arr[open+i]
            }
            inBrackesArr.pop()
            inBrackesArr.shift()
            inBrackesArr =  calcInBrackets(inBrackesArr)
            arr.splice(open, close - open + 1, inBrackesArr)
            inBrackesArr = []
        }
    }
    calcResult(arr)
}

function calcInBrackets(inBrackes) {
    let resultInBrackers 
    for (let i = 0; i < inBrackes.length; i++) {
        if (inBrackes[i] === '*') {
            resultInBrackers = Number(inBrackes[i-1]) * Number(inBrackes[i+1])
            inBrackes.splice(i-1, 3, String(resultInBrackers))
            i=0
        } else if (inBrackes[i] === '/') {
            resultInBrackers = Number(inBrackes[i-1]) / Number(inBrackes[i+1])
            inBrackes.splice(i-1, 3, String(resultInBrackers))
            i=0
        }
    }
    for (let i = 0; i < inBrackes.length; i++) {
        if (inBrackes[i] === '+') {
            resultInBrackers = Number(inBrackes[i-1]) + Number(inBrackes[i+1])
            inBrackes.splice(i-1, 3, String(resultInBrackers))
            i=0
        } else if (inBrackes[i] === '-'){
            resultInBrackers = Number(inBrackes[i-1]) - Number(inBrackes[i+1]) 
            inBrackes.splice(i-1, 3, resultInBrackers)
            i=0
        }
    }
    return inBrackes[0]
}

function calcResult(arr) {
    for (let i = 0; i < arr.length; i++) {
        let avgResult = 0
        if (arr[i] === '*' | arr[i] === '/') {
            if (arr[i] === '*') {
                avgResult = arr[i-1] * arr[i+1]
            } else {
                avgResult = arr[i-1] / arr[i+1]
            }
            arr.splice(i-1, 3, avgResult)
        }
    }
    for (let i = 0; i < arr.length; i++) {
        let avgResult = 0
        if (arr[i] === '-' | arr[i] === '+') {
            if (arr[i] === '+') {
                avgResult = arr[i-1] + arr[i+1]

            } else {
                avgResult = arr[i-1] - arr[i+1]
            }
            arr.splice(i-1, 3, avgResult)
        }
    }

    result = arr[0]
}
