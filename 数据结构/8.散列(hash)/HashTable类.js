// HashTable 类的构造函数定义如下:

function HashTable () {
    this.table = new Array(137)
    this.simpleHash = simpleHash
    this.showDistro = showDistro
    this.put = put
    // this.get = get
}

// 初步实现 HashTable 类
function HashTable () {
    this.table = new Array(137)
    this.simpleHash = simpleHash
    this.showDistro = showDistro
    this.put = put
    // this.get = get
}

function put (data) {
    var pos = this.simpleHash(data)
    for (let i = 0; i < data.length; i++) {
        total += data.charCodeAt(i)
    }
    return total % this.table.length
}

function simpleHash (data) {
    var total = 0
    for (let i = 0; i < data.length; i++) {
        total += data.charCodeAt(i)
    }
    return total % this.table.length
}

function showDistro () {
    var n = 0
    for (let i = 0; i < this.table.length; i++) {
        if (this.table[i] != undefined) {
            print(i + ':' + this.table[i])
        }
    }
}