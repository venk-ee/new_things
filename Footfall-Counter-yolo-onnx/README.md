# FOOTFALL Tracking and Counting with YOLOv8 and ONNX

This Jupyter Notebook demonstrates how to use a YOLOv8 model (exported to ONNX) for real-time people detection, tracking, and counting in video streams. The code includes a basic tracker and an optional Deep SORT integration for more robust tracking.

## Features

- Detects people in video using YOLOv8 (ONNX format)
- Letterbox resize and GPU acceleration
- Tracks individuals across frames
- Counts people moving "IN" and "OUT" across a virtual line
- Optional: Uses [deep_sort_realtime](https://github.com/mikel-brostrom/Yolov5_DeepSort_Pytorch) for advanced tracking

## Requirements

- Python 3.7+
- [onnxruntime](https://pypi.org/project/onnxruntime/)
- [opencv-python](https://pypi.org/project/opencv-python/)
- [numpy](https://pypi.org/project/numpy/)
- [ultralytics](https://pypi.org/project/ultralytics/)
- (Optional) [deep_sort_realtime](https://pypi.org/project/deep_sort_realtime/)

Install requirements with :
```bash
pip install onnxruntime opencv-python numpy ultralytics deep_sort_realtime
```

## Installation

Install requirements with:
```bash
pip install onnxruntime opencv-python numpy ultralytics deep_sort_realtime
```
Or simply follow the installation cells at the top of the notebook.

## How the IN/OUT Calculation Works

The notebook draws a horizontal line (default at `y=315`) across the video.  
For each detected person, a unique track ID is assigned and their position is tracked frame by frame.  
- If a person’s center moves from above the line to below, the **IN** counter increases.
- If a person’s center moves from below the line to above, the **OUT** counter increases.

This is determined by comparing the tracked position of each person in consecutive frames and checking on which side of the line their center point is located.

## Notes

- The default configuration counts people crossing a horizontal line at `y=315`.
- For better tracking, enable and use the Deep SORT code section.
- You can adapt the notebook for webcam input or change the video source by modifying the `cv2.VideoCapture` line as needed.
- Links to data and instructions for downloading are provided inside the notebook.
