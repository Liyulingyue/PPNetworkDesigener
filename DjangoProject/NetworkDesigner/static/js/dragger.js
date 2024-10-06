// 定义一个函数来添加可拖拽元素
function addDraggableElement(navButton, x, y) {
    const text = navButton.textContent;
    const fullName = navButton.getAttribute('data-fullname');

    // 获取elements-canvas的中心点坐标
    const canvas = document.getElementById(`elements-canvas`);
    const centerX = canvas.offsetLeft + (canvas.clientWidth / 2);
    const centerY = canvas.offsetTop + (canvas.clientHeight / 2);

    const elem = document.createElement('div');
    elem.classList.add('draggable');
    elem.style.left = `${centerX}px`;
    elem.style.top = `${centerY}px`;
    elem.style.position = 'absolute'; // 确保元素是定位的
    elem.textContent = text;
    elem.setAttribute('data-fullname', fullName);

    // 拖拽逻辑（简化版）
    let isDragging = false;
    let startX, startY;

    elem.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.clientX - elem.offsetLeft;
        startY = e.clientY - elem.offsetTop;
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            elem.style.left = `${e.clientX - startX}px`;
            elem.style.top = `${e.clientY - startY}px`;
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    document.getElementById(`elements-canvas`).appendChild(elem);
    console.log(canvas_obj);
    canvas_obj.addNode(text, fullName, elem);
    console.log(canvas_obj);
}
