// 1. reverse number
const q1 = function(num) {
    const sign = num < 0 ? -1 : 1
    num *= sign
    let res = 0
    while (num) {
        res = res * 10 + num % 10
        num = Math.floor(num / 10)
    }
    return res * sign
}
console.log(q1(32243))
console.log(q1(-32243))

// 2. palindrome
const q2 = function(word) {
    return word.split('').reverse().join('') === word
} 
console.log(q2('madam'))

// 3. combination of string
const q3 = function(str) {
    const res = []
    for (let l = 0; l < str.length; l++) {
        for (let r = l; r < str.length; r++) {
            res.push(str.substring(l, r + 1))
        }
    }
    return res
}
console.log(q3('dog'))

//  4. alphabetical order string
const q4 = function(str) {
    return str.split('').sort((a, b) => a.localeCompare(b)).join('')
}
console.log(q4('webmaster'))

// 5. uppercase first letter of word
const q5 = function(sentence) {
    return sentence.split(' ').filter(word => word.length > 0).map(word => word[0].toUpperCase() + word.substring(1)).join(' ')
}
console.log(q5('the quick brown fox'))

// 6. longest word within the string
const q6 = function(str) {
    return str.split(' ').reduce((longestWord, word) => word.length > longestWord.length ? word : longestWord)
}
console.log(q6('Web Development Tutorial'))

// 7. count vowels
const q7 = function(str) {
    const vowels = 'aeiouAEIOU'
    return str.split('').reduce((count, char) => vowels.includes(char) ? count + 1 : count, 0)
}
console.log(q7('The quick brown fox'))

// 8. check prime
const q8 = function(num) {
    if (num <= 1) return false
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false
    }
    return true
}
console.log(q8(5))

// 9. count type
const q9 = function(arg) {
    return typeof arg
}
console.log(q9(null))

// 10. create identity matrix
const q10 = function(n) {
    return new Array(n).fill().map((_, i) => new Array(n).fill().map((_ ,j) => i === j ? 1 : 0))
}
console.log(q10(4))

// 11. find the second lowest and second greatest numbers
const q11 = function(arr) {
    if (arr.length <= 1) return []
    arr.sort((a, b) => a - b)
    return [arr[1], arr[arr.length - 2]]
}
console.log(q11([1,2,3,4,5]))

// 12. check perfect number
const q12 = function(num) {
    let sum = 0
    for (let i = 1; i < num; i++) {
      if (num % i === 0) {
        sum += i
      }
    }
    return sum === num
}
console.log(q12(28))

// 13. factors of a positive integer
const q13 = function(num) {
    const factors = []
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) {
        factors.push(i)
      }
    }
    return factors
}
console.log(q13(28))

// 14. coins
const q14 = function(amount, coins) {
    const res = []
    for (let i = 0; i < coins.length; i++) {
      const coin = coins[i]
      while (amount >= coin) {
        res.push(coin);
        amount -= coin
      }
    }
    return res
}
console.log(q14(46, [25, 10, 5, 2, 1]))

// 15. compute the value of bn where n is the exponent and b is the bases
const q15 = function(b, n) {
    return b ** n
}

// 16. extract unique characters from a string
const q16 = function(str) {
    return [...new Set(str)].join('')
}
console.log(q16("thequickbrownfoxjumpsoverthelazydog"))

// 17. get the number of occurrences of each letter in specified string
const q17 = function(str) {
    return str.split('').reduce((map, char) => {
        map[char] = (map[char] ?? 0) + 1
        return map
    }, {})
}
console.log(q17("thequickbrownfoxjumpsoverthelazydog"))

// 18. binary search
const q18 = function(arr, target) {
    let left = 0, right = arr.length - 1
    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        if (arr[mid] === target) {
            return mid
        } else if (arr[mid] > target) {
            right = mid - 1
        } else {
            left = mid + 1
        }
    }
    return -1
}
console.log(q18([1,3,4,5,6,8,9], 3))

// 19. elements larger than a number
const q19 = function(arr, number) {
    return arr.filter(ele => ele > number)
}
console.log(q19([1,2,3,4,5,6], 3))

// 20. random string
const q20 = function(len) {
    const charList = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const arr = new Array(len).fill().map(() => charList[Math.floor(Math.random() * charList.length)])
    return arr.join('')
}
console.log(q20(5))

// 21. subset
const q21 = function(arr, len) {
    const res = []
    const backtrack = (path, begin) => {
        if (path.length === len) {
            res.push(path.slice())
            return
        }
        for (let i = begin; i < arr.length; i++) {
            path.push(arr[i])
            backtrack(path, i + 1)
            path.pop()
        }
    }
    backtrack([], 0)
    return res
}
console.log(q21([1,2,3], 2))

// 22. count the number of occurrences of the specified letter within the string
const q22 = function(str, char) {
    return str.split("").reduce((count, c) => c === char ? count + 1 : count, 0)
}
console.log(q22('microsoft.com', 'o'))

// 23. find the first not repeated character
const q23 = function(str) {
    const charCount = new Map()
    for (let char of str) {
      charCount.set(char, (charCount.get(char) ?? 0) + 1)
    }
    for (let char of str) {
      if (charCount.get(char) === 1) {
        return char
      }
    }
    return ''
}
console.log(q23("abacddbec"))

// 24. bubble sort
const q24 = function(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[j + 1]) {
                ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return arr
}
console.log(q24([5,2,7,1,9,3,8,0]))

// 25. longest country name
const q25 = function(arr) {
    return arr.reduce((longest, curr) => longest.length < curr.length ? curr : longest)
}
console.log(q25(["Australia", "Germany", "United States of America"]))

// 26. longest substring in a given a string without repeating characters
const q26 = function(str) {
    const lastIndex = {}
    let l = 0, r = 0
    let maxL = 0, maxR = 0
    while (r < str.length) {
        if (lastIndex[str[r]] !== undefined) {
            l = Math.max(l, lastIndex[str[r]] + 1)
        }
        lastIndex[str[r]] = r
        if (r - l > maxR - maxL) {
            maxL = l
            maxR = r
        }
        r += 1
    }
    return str.substring(maxL, maxR + 1)
}
console.log(q26('aaabca'))

// 27.  longest palindrome in a given string
const q27 = function(str) {
    const n = str.length
    const dp = new Array(n).fill().map(() => new Array(n).fill(false))
    let maxL = 0, maxR = 0
    
    for (let j = 0; j < n; j++) {
        for (let i = j; i >= 0; i--) {
            if (j - i <= 1) {
                dp[i][j] = str[i] === str[j]
            } else {
                dp[i][j] = str[i] === str[j] && dp[i + 1][j - 1]
            }
            if (dp[i][j] && j - i > maxR - maxL) {
                maxL = i
                maxR = j
            }
        }
    }
    
    return str.substring(maxL, maxR + 1)
}
console.log(q27("abracadabra"))

// 28 pass a 'JavaScript function' as parameter
const q28 = function(fn, ...arg) {
    return fn(...arg)
}
console.log(q28((...arg) => arg.reduce((sum, num) => sum + num), 1, 2, 3))

// 29 get the function name
const q29 = function(fn) {
    return fn.name
}
console.log(q29(q29))