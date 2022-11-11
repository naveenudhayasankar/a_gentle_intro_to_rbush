import rbush from 'rbush'
import c4 from './c4.json'
import c5 from './c5.json'
import m1i1 from './m1i1.json'

// Create a R Tree object, can pass number of entries in each node, default is 9 
const rTree = new rbush() // 9 entries in each node 

const rTree2 = new rbush(16) // 16 entries in each node 

let n = c4.length

let start = performance.now()
var nodeArray = []

insertNode(c4)
insertNode(c5)
insertNode(m1i1)

for(let j = 0; j < nodeArray.length; j++)
    rTree2.insert(nodeArray[j])

let end = performance.now()

console.log("Bulk load completed: " + (end - start))
console.log(rTree.all())

console.log(rTree.search({
    minX: 1,
    minY: 1,
    maxX: 5,
    maxY: 5
}))

function insertNode(arr){
    n = arr.length
    for(var i = 0; i < n; i++){
        var x = (arr[i].x / 1000) - 100
        var y = (arr[i].y / 1000) - 100
        var w = arr[i].width / 1000
        var h = arr[i].height / 1000 
        const node = {
            minX : x,
            minY : y, 
            maxX : x + w, 
            maxY : y + h, 
            layer : arr[i].layer
        }
        nodeArray.push(node)
    }
}