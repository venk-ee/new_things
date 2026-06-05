from setuptools import setup
from torch.utils.cpp_extension import BuildExtension, CUDAExtension
import torch.utils.cpp_extension


torch.utils.cpp_extension._check_cuda_version = lambda *args, **kwargs: None


setup(
    name="mask_process_cuda_learn",
    ext_modules=[
        CUDAExtension(
            name="mask_process_cuda_learn",
            sources=["cuda_learn_kernel.cu", "cuda_learn.cpp"],
            extra_compile_args={"cxx": ["-g"], "nvcc": ["-O3"]},
        ),
    ],
    cmdclass={"build_ext": BuildExtension},
)
