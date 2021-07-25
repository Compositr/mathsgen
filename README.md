# mathsgen
> Simple maths worksheet generator built with JavaScript, on NodeJS

mathsgen is a simple maths worksheet generator to create maths worksheets and questions for either Divide, Multiplication, Addition or Subtraction.

mathsgen is a console application and must be run with NodeJS for it to work.

## Installation
> Prerequisites:
> NodeJS is required for mathsgen to work. Please install [NodeJS](https://nodejs.org/en/) (click on the link) before attempting to run mathsgen.

### Step 1: Download mathsgen
Head on over to the [releases page](https://github.com/CoolJim/mathsgen/releases/) and select a version. (Latest stable recommended), and download the zip file

Extract the ZIP

### Step 2: Run mathsgen & install dependencies
Enter the unzipped folder and hold shift, then right click. Select "Open in Powershell". Then type this exact phrase: 

```cmd
npm i
```

Once that is complete, type this exact phrase
```
$env:GENERATE_TYPE="-"; node index
```
You should now find a worksheet.pdf file generated.