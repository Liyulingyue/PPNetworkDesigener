function createSingleNavbarButton(name, fullName="") {
    const btn = document.createElement('button');
    btn.textContent = name;
    // console.log(fullName);
    btn.classList.add('nav-btn'); // 添加类名以便后续添加样式或事件监听器
    btn.setAttribute('data-fullname', fullName); // 附加全名信息
    btn.addEventListener('click', function() {
        // 点击后，在.draggable-container中新增一个可拖拽的元素
        console.log('clicked');
        addDraggableElement(btn, 100, 100); // 假设默认位置是(100, 100)
        });
    return btn; // 返回按钮元素，以便后续添加到导航栏
}

function createSingleNavbarFolder(name) {
    const folder = document.createElement('button');
    folder.textContent = `${name} 📁`; // 添加一个图标或标记以区分文件夹
    folder.classList.add('nav-folder'); // 添加类名以便后续添加样式或事件监听器

    const folderContainer = document.createElement('div');
    folderContainer.classList.add('folder-container', 'hidden'); // 默认隐藏子元素
    folderContainer.style.marginLeft = '10px'; // 可选，为了子元素缩进

    // folder.appendChild(folderContainer); // 将容器添加到文件夹按钮中

    folder.addEventListener('click', function() {
        // 切换子容器的显示状态
        folderContainer.classList.toggle('hidden');
    });

    // return folder; // 返回文件夹元素，以便后续添加到导航栏
    return {
        folder, // 返回文件夹元素，以便后续添加到导航栏
        folderContainer, // 返回容器元素，以便在创建按钮时将其作为父级
    };
}

// 递归函数来创建按钮
function createNavbarButtons(obj, parentElement = navbar, depth = 0, parentName = "") {
    for (let key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            // 如果值是对象（可能是子模块），创建一个折叠框按钮，递归处理
            const { folder, folderContainer } = createSingleNavbarFolder(key);
            parentElement.appendChild(folder);
            parentElement.appendChild(folderContainer);
            const newParentName = parentName ? `${parentName}.${key}` : key; // 避免paddle以.开头
            createNavbarButtons(obj[key], folderContainer, depth + 1, newParentName);
        } else {
            // 如果值不是对象，则创建按钮
            const fullName = parentName ? `${parentName}.${key}` : key;
            const btn = createSingleNavbarButton(key, fullName);
            parentElement.appendChild(btn);
        }
    }
}

function createNavbar() {
    fetch('/get_navigation_items')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const navbar = document.querySelector('.navbar');
            navbar.innerHTML = ''; // 清空现有的导航项
            createNavbarButtons(data, navbar); // 从顶层数据开始递归创建按钮
        })
        .catch(error => {
            console.error('Error fetching navigation items:', error);
        });
}
