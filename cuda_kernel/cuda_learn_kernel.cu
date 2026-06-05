#include <torch/extension.h>
#include <cuda_runtime.h>


__global__ void process_mask_kernel(unsigned char* mask_data,int width ,int height){
    int x=blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    if (x>=width || y >=height){
        return;
    }
    int pixel_index = y * width + x;
    mask_data[pixel_index] = 255;


}


torch::Tensor mask_process_cuda(torch::Tensor mask){
    int height=mask.size(0);
    int width=mask.size(1);  
    
    unsigned char* mask_ptr=mask.data_ptr<unsigned char>();
    int thread=width*height;
    dim3 threads_per_block(16,16);
    dim3 number_of_block((width+15)/16,(height+15)/16);
    
    process_mask_kernel<<<number_of_block,threads_per_block>>>(mask_ptr,width,height);
    return mask;

}
