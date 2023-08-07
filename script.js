var output = document.querySelector('output')
var result = 0

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
            output.textContent = result
        } catch(e) {
            console.log(e)
            alert(e)
        }
    } else if (value === "c" | value === "с" | value === "C") {
        output.textContent = ''
    } else {
            output.textContent += value
        }
}

function parsing(expr) {
    var item = ''
    arr = []
    for (var i = 0; i < expr.length; i++) {
        if (expr[i] === '+' | expr[i] === '-' | expr[i] === '/' | expr[i] === '*') {
            if (item != '') arr.push(item) 
            arr.push(expr[i])
            item = ''
        } else {
            item += expr[i]
        }
    }
    if (item != '') arr.push(item)
    getResult(arr)
}

function getResult(arr) {
    if (arr[1] == '+') result = Number(arr[0]) + Number(arr[2])
    else if (arr[1] == '-') result = Number(arr[0]) - Number(arr[2])
    else if (arr[1] == '*') result = Number(arr[0]) * Number(arr[2])
    else if (arr[1] == '/') {
        if (arr[2] == 0) result = 'Деление на 0'
        else result = Number(arr[0]) / Number(arr[2])
    }
}