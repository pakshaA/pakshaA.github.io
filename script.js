var output = document.querySelector('output')

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
            output.textContent = countResult(output.textContent)
        } catch(e) {
            console.log(e)
        }
    } else if (value.match(/C|c|с/)) {
        output.textContent = ''
    } else if (value.match(/CE|Backspace/)) {
        output.textContent = output.textContent.substring(0, output.textContent.length - 1)
    } else {
        output.textContent += value
    }
}

function countResult(expr) {
    var func = new Function('return ' + expr)
    return func()
}