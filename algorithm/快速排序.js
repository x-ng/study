/**
 * 快速排序思想:
 * 在数据集中,选择一个元素作为基准
 * 所有小于基准的元素,都移动到基准左边,所有大于基准的元素都移动到基准右边
 * 对基准左边和右边的两个子集,不断重复第一步和第二布,知道所有子集只剩下一个元素为止
 */

var quickSort = function (arr) {
    // 检查数组的元素个数,如果小于等于一,就返回
    if (arr.length <= 1) {
        return arr
    }

    // 选择基准,并将其与原数组分离,再定义两个空数组,用来存放左右子集
    var pivotIndex = Math.floor(arr.length / 2)
    var pivot = arr.splice(pivotIndex, 1)[0]
    var left = []
    var right = []
    
    // 遍历数组,小于基准的元素放入左边的子集,大于基准的放入右边
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }

    // 递归这个过程
    return quickSort(left).concat([point], quickSort(right))

}

// 使用时调用就好了