# Ui_testing with playwright

Automated UI testing, often more efficient for large applications, allows tests to be reused and scaled across different devices and environments. 

### This guide will help us intergrate ui testing into playwright

## 1. Getting Started

First we install playwright as seen before in [vite_testing](https://github.com/nevergonnagiveyouup69/vite_testing) repo

## 2. Pixelmatch

To start testing with we need to install a libary called pixelmatch. It helps us compare two images in js.

```bash
npm install pixelmatch
``` 

To get a deeper understanding of pixelmatch we can follow the guide : [pixelmatch](https://github.com/mapbox/pixelmatch). But for our guide we will use the basics.

## 3. Comparing images

To start comparing image we first write a function. 

```bash 
async function compareScreenshots(img1Path, img2Path, diffPath) {
    const pixelmatch = (await import('pixelmatch')).default; // Dynamically import pixelmatch
    const img1 = PNG.sync.read(fs.readFileSync(img1Path));
    const img2 = PNG.sync.read(fs.readFileSync(img2Path));
    const { width, height } = img1;
    const diff = new PNG({ width, height });
    console.log(diff)

    const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
    return numDiffPixels;
}
```
## To get a better explaination 
### 1. async function compareScreenshots(img1Path, img2Path, diffPath) 
This line defines an asynchronous function named compareScreenshots. The function takes three arguments:

- **img1Path**: The file path to the first image.
- **img2Path**: The file path to the second image.
- **diffPath**: The file path where the output (difference) image will be saved.


![alt text](<github_assets/Screenshot from 2024-11-11 11-11-48.png>)


In this case we see that the images are saved in three different folders.

### 2. const pixelmatch = (await import('pixelmatch')).default;
**This part is optional**.
Here, we’re using await import to load a library called pixelmatch, which compares images to find differences. By loading it dynamically, the library is only imported when the function runs, which can be helpful for optimizing performance if we don't always need it.

### 3. const img1 = PNG.sync.read(fs.readFileSync(img1Path));
This line reads the first image file (img1Path) from the file system and decodes it as a PNG image format.

- **fs.readFileSync(img1Path)** reads the file’s data from the specified path.
- **PNG.sync.read(...)**  decodes this data into an object we can work with in code.
 
Here, img1 will hold this decoded data, including image details like width, height, and pixel data.

### 4. const diff = new PNG({ width, height });
This line creates a new blank image, diff, with the same width and height as img1. This diff image will hold the differences (if any) between img1 and img2.

### 5. const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });
This is the main comparison step. The pixelmatch function checks each pixel in img1 and img2 to find any differences. Here's what each argument means:

- **img1.data**: The pixel data for the first image.
- **img2.data**: The pixel data for the second image.
- **diff.data**: Where the difference data (differences found between img1 and img2) will be stored.
- **width and height**: Dimensions of the images.
- **{ threshold: 0.1 }**: This is a sensitivity setting. The value 0.1 allows for a slight tolerance in pixel color differences. Lower values are stricter, while higher values are more lenient.

The function returns the number of pixels that are different between the two images, storing this value in numDiffPixels.

### 7. fs.writeFileSync(diffPath, PNG.sync.write(diff));
This line writes the diff image to the file system at the specified diffPath. This means that any differences between img1 and img2 will be saved visually as a new image.

You can call the function when needed and also add the path for the new image you want to test.

# Outputs

## Original Output
![Original Output](<github_assets/origin.png>)

---

## Current Output
![Current Output](<github_assets/current.png>)

---

## Difference
![Difference](<github_assets/diff.png>)

