import importlib
import inspect


def get_object_info(full_name):
    try:
        # 分割模块名和对象名
        module_str, object_str = full_name.rsplit('.', 1)

        # 动态导入模块
        module = importlib.import_module(module_str)
        # 获取类或函数
        obj = getattr(module, object_str)

        # 初始化一个空列表来存储参数信息（如果是函数或类的构造函数）
        parameters = []

        if callable(obj):  # 检查对象是否可调用（函数、方法、类等）
            # 如果是类，尝试获取其构造函数的参数
            if inspect.isclass(obj):
                signature = inspect.signature(obj.__init__)
            else:
                signature = inspect.signature(obj)

            # 遍历参数，排除self参数（如果是类的话）
            for param in signature.parameters.values():
                if param.name == 'self':  # 忽略类构造函数的self参数
                    continue

                # 判断参数是否是必要的（即没有默认值）
                is_necessary = param.default is inspect.Parameter.empty
                # 获取默认值（如果有的话）
                default = param.default if not is_necessary else 'No default'
                # 将参数信息添加到列表中
                parameters.append([param.name, is_necessary, default])

        # 返回字典
        return {"is_class": inspect.isclass(obj), "parameters": parameters, "error": ""}

    except Exception as e:
        # 如果发生任何异常，返回错误信息
        return {"is_class": -1, "parameters": [], "error": str(e)}


# 使用函数
object_info = get_object_info('paddle.nn.Layer')
print(object_info)

# 对于其他具体的函数或类，可以类似地调用：
# object_info = get_object_info('your_module.YourClassOrFunctionName')
# print(object_info)