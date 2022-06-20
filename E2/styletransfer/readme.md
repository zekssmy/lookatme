# Style Transfer Module
## Description
This is a modification of [Neural Neighbor Style Transfer](https://github.com/nkolkin13/NeuralNeighborStyleTransfer)
Some modifications are done to perform FP16 iterations on GPU. 
This modification reduces execution time by factor 2 and the quality remains almost the same.

## Use
The interface `execute_one` proposes the method `execute_one(...)` for processing of one image with image style.
The content and style images are awaited under `/styletransfer/NeuralNeighborStyleTransfer/inputs`
