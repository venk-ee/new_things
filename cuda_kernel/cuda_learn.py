import torch
import mask_process_cuda_learn


def num_of_thread_req(img_size=(640, 640)):
    return img_size[0] * img_size[1]


fake_mask = torch.zeros((10, 10), dtype=torch.uint8, device="cuda")
print("--- BEFORE CUDA ---")
print(fake_mask)


mask_process_cuda_learn.process_mask(fake_mask)
print("\n--- AFTER CUDA ---")
print(fake_mask)
