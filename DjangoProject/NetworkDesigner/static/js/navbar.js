
function createNavbar() {
    fetch('/get_navigation_items') // 调用 fetch API 获取导航栏数据
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // 解析JSON响应
        })
        .then(data => {
            // 假设data是一个数组，每个元素都是一个导航项
            const navbar = document.querySelector('.navbar');
            navbar.innerHTML = ''; // 清空现有的导航项
            data.forEach(item => {
                const btn = document.createElement('button');
                btn.textContent = item;
                btn.classList.add('nav-btn'); // 添加类名以便后续添加样式或事件监听器
                btn.addEventListener('click', function() {
                    // 点击后，在.draggable-container中新增一个可拖拽的元素
                    console.log('clicked');
                    addDraggableElement(btn.textContent, 100, 100); // 假设默认位置是(100, 100)
                    });
                navbar.appendChild(btn); // 动态添加按钮到导航栏
            });
        })
        .catch(error => {
            console.error('Error fetching navigation items:', error);
            // 可以选择在这里添加错误处理逻辑，比如显示一个错误消息
        });
}

