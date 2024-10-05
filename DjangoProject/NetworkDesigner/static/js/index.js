document.addEventListener('DOMContentLoaded', function() {
    createNavbar();
});

// 监听全局的mousedown事件，以便检测Ctrl键
document.addEventListener('mousedown', function(e) {
    if (e.ctrlKey && e.target.classList.contains('draggable')) {
        // 如果Ctrl键被按下且点击的是可拖拽元素
        updateConnections(e.target)
    }
});

// 鼠标抬起的时候，绘制所有的连线
document.addEventListener('mouseup', function() {
    console.log('mouseup');
    drawAllConnections();
});