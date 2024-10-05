import paddle

# 获取paddle下所有模块的名字
modules = [name for name, _ in paddle.__dict__.items() if callable(_)]
print(modules)