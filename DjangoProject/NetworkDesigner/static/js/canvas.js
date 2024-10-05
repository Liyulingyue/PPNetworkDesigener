function drawAllConnections() {
    let connections = canvas_obj.connections;
    // 清除旧的连线
    // 选择所有具有指定class的元素，遍历这些元素并逐一从DOM中移除它们
    var elements = document.getElementById('elements-canvas').querySelectorAll('.' + 'connection');
    elements.forEach(function(element) {
        element.parentNode.removeChild(element);
    });
    var elements = document.getElementById('elements-canvas').querySelectorAll('.' + 'arrow');
    elements.forEach(function(element) {
        element.parentNode.removeChild(element);
    });

    for (let i = 0; i < connections.length; i++) {
        console.log('drawing connection', connections[i]);
        const [fromElement, toElement] = connections[i];

        // 创建连线的 DOM 元素
        const line = document.createElement('div');
        line.classList.add('connection');

        // 计算连线的起点和终点坐标
        const fromRect = fromElement.getBoundingClientRect();
        const toRect = toElement.getBoundingClientRect();

        // 简单的连线绘制逻辑：从 fromElement 的中心到 toElement 的中心
        // 这里可以使用更复杂的路径计算库（如 Fabric.js, D3.js 等）来获取更准确的路径
        const centerXFrom = fromRect.left + fromRect.width / 2;
        const centerYFrom = fromRect.top + fromRect.height / 2;
        const centerXTo = toRect.left + toRect.width / 2;
        const centerYTo = toRect.top + toRect.height / 2;
        const centerX = (centerXFrom + centerXTo) / 2;
        const centerY = (centerYFrom + centerYTo) / 2;

        // 设置连线的位置和大小
        const lineLength = Math.sqrt(Math.pow(centerXTo - centerXFrom, 2) + Math.pow(centerYTo - centerYFrom, 2));
        line.style.height = `${lineLength}px`; // 线的长度（足够长以覆盖两点）
        line.style.left = `${centerXFrom}px`;
        line.style.top = `${centerYFrom}px`;
        line.style.transformOrigin = `0 0`;
        line.style.transform = `rotate(${0-Math.atan2(centerXTo - centerXFrom, centerYTo - centerYFrom) * 180 / Math.PI}deg)`;

        // 可选：根据方向添加箭头
        const arrow = document.createElement('div');
        arrow.classList.add('arrow');
        arrow.style.left = `${centerX}px`; // 箭头位于终点的左侧
        arrow.style.top = `${centerY}px`; // 箭头尖部位于终点处
        arrow.style.transformOrigin = `0 0`;
        arrow.style.transform = `rotate(${0-Math.atan2(centerXTo - centerXFrom, centerYTo - centerYFrom) * 180 / Math.PI}deg)`;


        document.getElementById('elements-canvas').appendChild(arrow);
        document.getElementById('elements-canvas').appendChild(line);
    }
}

function updateConnections(target_element) {
    // 在鼠标点击事件时调用
    let previousSelectedElement = canvas_obj.previousSelectedElement;
    let selectedElement = target_element; // 更新当前选中的元素

    // 如果已经有一个元素被选中，则添加记录
    if (previousSelectedElement && previousSelectedElement !== selectedElement) {
        const new_connection = [previousSelectedElement, selectedElement];
        canvas_obj.connections.push(new_connection);
        previousSelectedElement = null; // 清除上一个选中的元素
        console.log('connected', new_connection);
    } else {
        previousSelectedElement = selectedElement; // 记录上一个选中的元素
    }

    canvas_obj.previousSelectedElement = previousSelectedElement;
}