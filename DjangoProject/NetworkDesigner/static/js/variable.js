// 定义一个节点类
class NetworkNode {
    constructor(name, fullName, obj, nodeId) {
        this.name = name;
        this.fullName = fullName;
        this.obj = obj;
        this.nodeId = nodeId;
    }

    display() {
        console.log(this);
    }
}

class NetworkConnection {
    constructor(fromNode, toNode, fromKey, toKey) {
        this.fromNode = fromNode;
        this.toNode = toNode;
        this.fromKey = fromKey;
        this.toKey = toKey;
    }
}

// 声明会用到的变量
var canvas_obj = {
    canvas: document.getElementById('elements-canvas'),
    previousSelectedElement: null,
    nodes: [],
    connections: [],

    // 方法
    addNode: function(name, fullName, obj) {
        const nodeId = this.nodes.length + 1;
        var node = new NetworkNode(name, fullName, obj, nodeId);
        this.nodes.push(node);
    },

    addConnection: function(fromNode, toNode, fromKey="output", toKey="input") {
        var connection = new NetworkConnection(fromNode, toNode, fromKey, toKey);
        this.connections.push(connection);
    },
}