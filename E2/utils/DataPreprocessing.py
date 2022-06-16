from skimage import io, img_as_float
import matplotlib.pyplot as plt
import numpy as np
import os

rootdir = "/media/dmitrii/ADATA HV611/extracthere/Augustinermuseum - Städtische Museen Freiburg/"
def crop_pic(name):
    folder_name = rootdir + "presortedFotos/"
    folder_name_to = rootdir + "croppedFotos/"
    if os.path.exists(folder_name_to+name):
        print("already exist ", name)
        return
    image = img_as_float(io.imread(folder_name+name))

    # Select all pixels almost equal to white
    white = np.array([1, 1, 1])
    mask = np.abs(image - white).sum(axis=2) < 0.05

    # Find the bounding box of those pixels
    coords = np.array(np.nonzero(~mask))

    # take only the largest rectangle based on OX axe
    flag = True
    coords_new = [[], []]
    if flag:
        for i in range(len(coords[1])):
            fivePercent = int(image.shape[1] * 0.05)
            if not (fivePercent < coords[1][i] < image.shape[1]-fivePercent):
                coords_new[0].append(coords[0][i])
                coords_new[1].append(coords[1][i])
    coords = np.array(coords_new)
    top_left = np.min(coords, axis=1)
    bottom_right = np.max(coords, axis=1)
    print(top_left, bottom_right)
    out = image[top_left[0]:bottom_right[0],
                top_left[1]:bottom_right[1]]
    print("Saved to "+folder_name_to+name)
    io.imsave(folder_name_to+name, out)
    #plt.imshow(out)
    #plt.show()


def main():
    #filename = "smf_aug_xxx_m-67-007-a_004.jpg"
    #crop_pic(filename)
    presort = rootdir + "presortedFotos"
    for subdir, dirs, files in os.walk(presort):
        for file in files:
            try:
                crop_pic(file)
            except:
                print("Exception in ", file)


if __name__ == '__main__':
    main()