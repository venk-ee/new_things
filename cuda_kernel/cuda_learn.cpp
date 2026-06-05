#include <torch/extension.h>
// Forward Declaration
torch::Tensor mask_process_cuda(torch::Tensor mask);

// safty check

torch::Tensor mask_process_cpp(torch::Tensor mask){

    TORCH_CHECK(mask.device().is_cuda(),"mask must ber a loaded into cuda");

    return mask_process_cuda(mask);
}

// The Translation Dictionary (PyBind11)

PYBIND11_MODULE(TORCH_EXTENSION_NAME,m){
    m.def("process_mask",&mask_process_cpp,"Process Instance Mask");
}

