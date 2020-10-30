---
title: "A fix for g++ not being able to find OpenCV dependencies on Ubuntu 18.04"
date: 2020-03-14
tags:
  - OpenCV
  - C++
---

## The Issue

Adding third-party code to a C++ application is well-known for being a headache, requiring the user to know about the steps of the
compilation process, the OS environment and the difference between the types of library (static vs dynamically linked). The issue is
annoying enough that some reasonably big C++ libraries like [Catch2](https://github.com/catchorg/Catch2) and [Boost](https://www.boost.org/) 
offer header-only solutions to simplify getting the build process to work correctly.

OpenCV is a big library with many dependencies, and as such, is not exempt from this complex configuration process. Luckily some experienced
 users have made detailed tutorials of the installation process to help us, layman users, benefit from the library, such as [this one](https://www.learnopencv.com/install-opencv-3-4-4-on-ubuntu-18-04/) which I used to install it on my computer.

 I thought that after finishing the tutorial I would be able to run `g++` and be done with it, but that turned out not to be true, which lead me into
 multiple hours of troubleshooting in order to find out if I had done anything wrong.

 *If you do not wish to read the explanation of the problems and just fix them quickly, I've made a [TLDR](#tldr)*

 ## The missing steps

At the end of the tutorial, we are instructed to run the following command in order to compile our code with opencv:

```bash{promptUser: edujtm}
g++ `pkg-config --cflags --libs <OpenCV_Home_Dir>/installation/OpenCV-3.4.4/lib/pkgconfig/opencv.pc` my_sample_file.cpp -o my_sample_file
```
\
With `<OpenCV_Home_Dir>/installation` being the directory where we are supposed to install the OpenCV library. I modified the directory in order to suit my
folder organization, so in my case the library was installed at the following location: 

```
$HOME/Code/local/OpenCV-3.4.4/
```
\
Unfortunately, after running this command I was getting a bunch of undefined references to OpenCV functions.

```
hello_world.cpp:(.text+0x5f): undefined reference to "cv::imread(cv::String const&, int)"
hello_world.cpp:(.text+0xb3): undefined reference to "cv::imshow(cv::String const&, cv::_InputArray const&)"
hello_world.cpp:(.text+0xdb): undefined reference to "cv::waitKey(int)"
```
\
To understand why this message is happening, let's first look at the pkg-config output.

```bash{promptUser: edujtm}
pkg-config --cflags --libs $HOME/Code/local/OpenCV-3.4.4/lib/pkgconfig/opencv.pc
```
\
Which outputs:

```
-I/home/edujtm/Code/local/OpenCV-3.4.4/include/opencv -I/home/edujtm/Code/local/OpenCV-3.4.4/include -L/home/edujtm/Code/local/OpenCV-3.4.4/lib 
-lopencv_stitching -lopencv_superres -lopencv_videostab -lopencv_aruco -lopencv_bgsegm -lopencv_bioinspired -lopencv_ccalib -lopencv_cvv 
-lopencv_dnn_objdetect -lopencv_dpm -lopencv_highgui -lopencv_videoio -lopencv_face -lopencv_freetype -lopencv_fuzzy -lopencv_hdf -lopencv_hfs 
-lopencv_img_hash -lopencv_line_descriptor -lopencv_optflow -lopencv_reg -lopencv_rgbd -lopencv_saliency -lopencv_sfm -lopencv_stereo 
-lopencv_structured_light -lopencv_phase_unwrapping -lopencv_surface_matching -lopencv_tracking -lopencv_datasets -lopencv_text -lopencv_dnn -lopencv_plot 
-lopencv_xfeatures2d -lopencv_shape -lopencv_video -lopencv_ml -lopencv_ximgproc -lopencv_xobjdetect -lopencv_objdetect -lopencv_calib3d -lopencv_imgcodecs 
-lopencv_features2d -lopencv_flann -lopencv_xphoto -lopencv_photo -lopencv_imgproc -lopencv_core
```
\
This is the huge list of OpenCV modules that you need to specify so that the linker is able to find the pre-compiled binaries from OpenCV. You don't actually need to specify all of them, only the ones you're using, but pkg-config will add everything so that you won't have problems when using different modules.

So essentially the error message is happening because the linker is not being able to find the binaries with the implementation of OpenCV functions, even though they are being specified in the command line.

What surprised me was that the order in which you declared the libraries to be linked is important to the linking process. As explained briefly by [this comment by Ivan Aksamentov](https://stackoverflow.com/questions/31634757/how-to-correct-undefined-reference-error-in-compiling-opencv/31635489#31635489):

> In short, the rule "libraries come after objects that use them" is enforced by many GCC distributions to link shared libs only as they are needed. In your case object file facerec_eigenfaces.o, being produced from source file facerec_eigenfaces.cpp, depends on OpenCV libs (exact list is given by a pkg-config command), and thus libs should go after that file. You could also notice very same pattern in pkg-config output: for example, X11, pthreads and other Linux system dependencies go after dependent OpenCV libs.

To put it briefly: if you source code depends on an linked file, it should come before the specified linked file. Following this, the correct way to call the command is by placing the pkg-config after the files, like so:

```bash{promptUser: edujtm}
g++ my_sample_file.cpp -o my_sample_file `pkg-config --cflags --libs <OpenCV_Home_Dir>/installation/OpenCV-3.4.4/lib/pkgconfig/opencv.pc`
```
\
After this was fixed, the files were compiling just fine. But now, the following error was happening at runtime:

```
./hello_world: error while loading shared libraries: libopencv_highgui.so.3.4: cannot open shared object file: No such file or directory
```
\
Well, that's progress, but we are not there yet. We moved from a linker issue to a shared library issue. The name shared comes from the fact that a single binary of this program can be used by multiple other programs during runtime, as long as they can locate it. 

What's happening now is that, when we run our file, the operating system is unable to find some shared libraries from OpenCV. We need to find a way to tell it where our shared libraries are.

The primary way of doing this is linux is by adding a *.conf* file to `/etc/ld.so.conf.d/`. I've created an opencv.conf file with the following content:

```bash{promptUser: edujtm}
echo "/home/edujtm/Code/local/OpenCV-3.4.4/lib" > opencv.conf
```
\
If you followed [the tutorial](https://www.learnopencv.com/install-opencv-3-4-4-on-ubuntu-18-04/) then your *lib* folder will probably be located at `<OpenCV_Home_Dir>/installation/OpenCV-3.4.4/lib`. 

Finally, move the new *.conf* file to `/etc/ld.so.conf.d/` and run ldconfig, which adds the new shared libraries to its cache.

```bash{promptUser: edujtm}
sudo mv opencv.conf /etc/ld.so.conf.d/
sudo ldconfig
```
\
Because this was an OS level issue, your compiled binaries should work just fine, even without recompiling them.

## TL;DR

### Step 1: Change the G++ command order

Change the specified command from the tutorial, placing the dependency libraries at the end:

```bash
g++ `pkg-config --cflags --libs <OpenCV_Home_Dir>/installation/OpenCV-3.4.4/lib/pkgconfig/opencv.pc` my_sample_file.cpp -o my_sample_file
# change to 
g++ my_sample_file.cpp -o my_sample_file `pkg-config --cflags --libs <OpenCV_Home_Dir>/installation/OpenCV-3.4.4/lib/pkgconfig/opencv.pc`
```
<br/>

### Step 2: Add shared libraries to /etc/ld.so.conf.d/

Create a *.conf* file pointing to the OpenCV shared libraries folder, place it at `/etc/ld.so.conf.d/` and run ldconfig.

```bash
echo "<OpenCV_Home_Dir>/installation/OpenCV-3.4.4/lib" > opencv.conf
sudo mv opencv.conf /etc/ld.so.conf.d/
sudo ldconfig
```
