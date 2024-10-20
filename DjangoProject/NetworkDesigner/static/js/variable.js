// 定义一个节点类
class NetworkNode {
    constructor(name, fullName, obj, nodeId, is_class = -1, parameters = [], inputs = [], outputs = []) {
        this.name = name;
        this.fullName = fullName;
        this.obj = obj;
        this.nodeId = nodeId;
        this.is_class = is_class; // 默认为-1
        this.parameters = parameters; // 默认为空数组
        this.inputs = inputs; // 默认为空数组
        this.outputs = outputs; // 默认为空数组
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

    addNode: function(name, fullName, obj) {
        // 构造包含 fullName 的 URL
        const url = `/get_api_details/${encodeURIComponent(fullName)}/`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const nodeId = this.nodes.length + 1;
                let node_params, node_inputs, node_outputs;
                // console.log(data);
                if (data.is_class == 1) {
                    node_params = data.parameters;
                    node_inputs = [["input1", true, ""]]; // 标识，是否必须，value
                    node_outputs = [["output1"]];
                }
                else if (data.is_class == 0) {
                    node_params = [];
                    node_inputs = data.parameters; // 标识, 是否必须, value
                    node_outputs = [["output1"]];
                }
                else {
                    node_params = [];
                    node_inputs = [];
                    node_outputs = [];
                }
                var node = new NetworkNode(name, fullName, obj, nodeId, is_class = data.is_class, parameters = node_params, inputs = node_inputs, outputs = node_outputs);
                this.nodes.push(node);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    },

    addConnection: function(fromNode, toNode, fromKey="output", toKey="input") {
        var connection = new NetworkConnection(fromNode, toNode, fromKey, toKey);
        this.connections.push(connection);
    },
}