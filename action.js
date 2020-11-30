function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function div(a, b) {
    return a / b;
}

function mul(a, b) {
    return a * b;
}

function sq(a) {
    return Math.pow(a, 2);
}

function sqr(a) {
    return Math.pow(a, 0.5);
}

function calculate(operation, a, b) {
    switch (operation) {
        case add:
            return add(a, b);
        case sub:
            return sub(a, b);
        case div:
            return div(a, b);
        case mul:
            return mul(a ,b);
        case sq:
            return sq(a);
        case sqr:
            return sqr(a);
    }
}