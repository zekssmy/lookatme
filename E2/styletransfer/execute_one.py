import time
import random
import os

from imageio import imwrite
import torch
import numpy as np
import sys
#ROOT_PATH = "/home/uwgdz/tmp/SDAPraktikum"
ROOT_PATH = os.getcwd()
sys.path.append(ROOT_PATH)
from E2.styletransfer.NeuralNeighborStyleTransfer.pretrained.vgg import Vgg16Pretrained
from E2.styletransfer.NeuralNeighborStyleTransfer.utils import misc as misc
from E2.styletransfer.NeuralNeighborStyleTransfer.utils.misc import load_path_for_pytorch
from E2.styletransfer.NeuralNeighborStyleTransfer.utils.stylize import produce_stylization

#ROOT_PATH = os.getcwd()
#print(ROOT_PATH)
#ROOT_PATH = "/home/uwgdz/tmp/SDAPraktikum/E2/styletransfer"
MODULE_PATH = os.path.join(ROOT_PATH, "E2", "styletransfer")
INPUT_CONTENT_PATH = os.path.join(MODULE_PATH, "NeuralNeighborStyleTransfer", "inputs", "content")
INPUT_STYLE_PATH = os.path.join(MODULE_PATH, "NeuralNeighborStyleTransfer", "inputs", "style")
OUTPUT_PATH = os.path.join(MODULE_PATH, "outputs")


def create_path(filepath):
    if not os.path.exists(filepath):
        os.makedirs(filepath)
        print(f'Made {filepath}')
    else:
        print(f'filepath {filepath} exists.')


def setup():
    create_path(INPUT_CONTENT_PATH)
    create_path(INPUT_STYLE_PATH)
    create_path(OUTPUT_PATH)
    # Fix Random Seed
    random.seed(0)
    np.random.seed(0)
    torch.manual_seed(0)

# Used to imitate the functionality of execute one
def execute_one_stub(content_im_name,
                style_im_name,
                max_iter=50,
                lr=2e-3,
                half=True,
                high_res=False,
                cpu=False,
                no_flip=False,
                content_loss=False,
                dont_colorize=False,
                alpha=0.75
                ):
    content_path = os.path.join(INPUT_CONTENT_PATH, content_im_name)
    style_path = os.path.join(INPUT_STYLE_PATH, style_im_name)
    output_name = os.path.join(OUTPUT_PATH, content_im_name + "_styled.jpg")
    time.sleep(5)
    return output_name


def execute_one(content_im_name,
                style_im_name,
                max_iter=50,
                lr=2e-3,
                half=True,
                high_res=False,
                cpu=False,
                no_flip=False,
                content_loss=False,
                dont_colorize=False,
                alpha=0.75
                ):
    setup()
    content_path = os.path.join(INPUT_CONTENT_PATH, content_im_name)
    style_path = os.path.join(INPUT_STYLE_PATH, style_im_name)
    output_path = os.path.join(OUTPUT_PATH, content_im_name+"_styled.jpg")

    # Interpret config options arguments
    max_scls = 4
    sz = 512
    if high_res:
        max_scls = 5
        sz = 1024
    flip_aug = (not no_flip)
    misc.USE_GPU = (not cpu)
    content_weight = 1. - alpha

    # Error checking for arguments
    # error checking for paths deferred to imageio
    assert (0.0 <= content_weight) and (content_weight <= 1.0), "alpha must be between 0 and 1"
    assert torch.cuda.is_available() or (not misc.USE_GPU), "attempted to use gpu when unavailable"

    model = Vgg16Pretrained()
    if half:
        model.half()
        for layer in model.modules():
            if isinstance(layer, torch.nn.BatchNorm2d):
                layer.float()

    cnn = misc.to_device(model)
    if half:
        phi = lambda x, y, z: cnn.forward(x.half(), inds=y, concat=z)
    else:
        phi = lambda x, y, z: cnn.forward(x.half(), inds=y, concat=z)

    # Load images
    content_im_orig = misc.to_device(load_path_for_pytorch(content_path, target_size=sz)).unsqueeze(0)
    style_im_orig = misc.to_device(load_path_for_pytorch(style_path, target_size=sz)).unsqueeze(0)

    # Run Style Transfer
    torch.cuda.synchronize()
    start_time = time.time()
    output = produce_stylization(content_im_orig, style_im_orig, phi,
                                 max_iter=max_iter,
                                 lr=lr,
                                 content_weight=content_weight,
                                 max_scls=max_scls,
                                 flip_aug=flip_aug,
                                 content_loss=content_loss,
                                 dont_colorize=dont_colorize)
    torch.cuda.synchronize()
    print('Done! total time: {}'.format(time.time() - start_time))

    # Convert from pyTorch to numpy, clip to valid range
    new_im_out = np.clip(output[0].permute(1, 2, 0).detach().cpu().numpy(), 0., 1.)

    # Save stylized output
    save_im = (new_im_out * 255).astype(np.uint8)
    imwrite(output_path, save_im)

    # Free gpu memory in case something else needs it later
    if misc.USE_GPU:
        torch.cuda.empty_cache()

    from IPython.display import Image
    Image(output_path)
    return content_im_name+"_styled.jpg"



