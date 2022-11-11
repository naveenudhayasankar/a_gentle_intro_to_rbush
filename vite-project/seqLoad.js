import rbush from 'rbush'
import c4 from './c4.json'
import c5 from './c5.json'
import m1i1 from './m1i1.json'

// Create a R Tree object, can pass number of entries in each node, default is 9 
const rTree = new rbush() // 9 entries in each node 

const rTree2 = new rbush(16) // 16 entries in each node 

let n = c4.length

let start = performance.now()

insertNode(c4)
insertNode(c5)
insertNode(m1i1)

let end = performance.now()
console.log("Time for sequential load: " + (end - start))

console.log(rTree2.all())

start = performance.now()
console.log(rTree2.search({
    minX: 0,
    minY: 0,
    maxX: 0.5,
    maxY: 0.5
}))
end = performance.now()
console.log("Query results obtained in "+ (end - start))

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
        rTree2.insert(node)
    }
}