// 1. reduce
const myReduce = function(callbackFn, initialValue) {
    const arr = this
    const startIndex = initialValue === undefined ? 1 : 0
    let accumulator = initialValue === undefined ? arr[0] : initialValue
    for (let i = startIndex; i < arr.length; i++) {
        accumulator = callbackFn(accumulator, arr[i], i, arr)
    }
    return accumulator
}

Array.prototype.myReduce = myReduce
console.log([1,2,3].myReduce((sum, num) => sum + num)) // 6
console.log([1,2,3].myReduce((sum, num) => sum + num, 2)) // 8


// 2. filter
const myFilter = function(callbackFn, thisArg) {
    const arr = this
    const res = []
    for (let i = 0; i < arr.length; i++) {
        if (callbackFn.call(thisArg, arr[i], i, arr)) {
            res.push(arr[i])
        }
    }
    return res
}

Array.prototype.myFilter = myFilter
console.log([1,2,3,4,5].myFilter(num => num > 3)) // [4, 5]


// 3. find
const myFind = function(callbackFn, thisArg) {
    const arr = this
    for (let i = 0; i < arr.length; i++) {
        if (callbackFn.call(thisArg, arr[i], i, arr)) {
            return arr[i]
        }
    }
}

Array.prototype.myFind = myFind
console.log([1,2,3,4,5].myFind(num => num > 3)) // 4
console.log([1,2,3,4,5].myFind(num => num > 6)) // undefined


// 4. concat
const myConcat = function(...args) {
    const arr = [...this]
    for (let element of args) {
        if (Array.isArray(element) || element[Symbol.isConcatSpreadable]) {
            arr.push(...element)
        } else {
            arr.push(element)
        }
    }
    return arr
}

Array.prototype.myConcat = myConcat
console.log([1,2].myConcat(3, [4, 5], [[6, 7]])) // [ 1, 2, 3, 4, 5, [6, 7]]
console.log([1, ,2].myConcat([3, ,4])) // [ 1, undefined, 2, 3, undefined, 4 ]
const arrayLike = { [Symbol.isConcatSpreadable]: true, length: 2, 0: 1, 1: 2 }
console.log(Array.prototype.concat.call(arrayLike, 3, 4)) // [1, 2, 3, 4]


// 5. push
const myPush = function(...args) {
    const arr = this
    for (let elemenet of args) {
        arr[arr.length] = elemenet
    }
    return arr.length
}

Array.prototype.myPush = myPush
const arrToPush = [1, 2]
console.log(arrToPush.myPush(3, 4, 5)) // 5
console.log(arrToPush) // [1, 2, 3, 4, 5]

// 6. pop
const myPop = function() {
    if (this.length > 0) {
        const returnValue = this[this.length - 1]
        this[this.length - 1] = undefined
        this.length -= 1
        return returnValue
    }
}

Array.prototype.myPop = myPop
const arrToPop = [1, 2]
console.log(arrToPop.myPop()) // 2
console.log(arrToPop) // [1]