import importlib
import inspect

import paddle
from django.http import JsonResponse
from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def get_navigation_items(request):
    def find_modules_and_apis(module, depth=0, max_depth=2):
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
    nav_items = {"paddle": find_modules_and_apis(paddle)}
    return JsonResponse(nav_items, safe=False)

def get_api_details(request, full_name):
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
                default = param.default if not is_necessary else ""
                # 将参数信息添加到列表中
                parameters.append([param.name, is_necessary, default]) # 名称，是否必要，默认值

        # 返回字典
        return_dict = {"is_class": 1 if inspect.isclass(obj) else 0, "parameters": parameters, "error": ""}

    except Exception as e:
        # 如果发生任何异常，返回错误信息
        return_dict = {"is_class": -1, "parameters": [], "error": str(e)}

    return JsonResponse(return_dict, safe=False)