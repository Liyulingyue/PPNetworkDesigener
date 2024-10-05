import paddle

def find_modules_and_apis(module, depth=0, max_depth=5):
    # 初始化当前模块的字典
    current_module_dict = {}

    # 遍历模块的所有属性
    for name, attr in module.__dict__.items():
        # 如果属性是可调用的（比如函数或方法），则添加到当前模块的列表中
        if callable(attr):
            current_module_dict[name] = None  # 或者您可以用更详细的信息替换None
        # 如果属性是模块（即包含__name__和__file__），则递归处理，但检查深度
        elif hasattr(attr, '__name__') and hasattr(attr, '__file__') and depth < max_depth:
            current_module_dict[name] = find_modules_and_apis(attr, depth + 1, max_depth)

    return current_module_dict

# 调用函数并打印结果
modules = find_modules_and_apis(paddle)
print(modules)