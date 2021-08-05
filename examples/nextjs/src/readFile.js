//readFile
// const readFile = async (file) => {
//     let fileReader, ready = false;
//     fileReader = new FileReader();
//     fileReader.onloadend = function (e) {
//         ready = true;
//     };
//     let check = async function() {
//         if (ready === true) {
//             return;
//         }
//         await setTimeout(check, 1000);
//     }
//     fileReader.readAsText(file);
//     await check();
//     return fileReader.result;
// };


async function readFile(file) {
    let resultStr = await new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => resolve(fileReader.result);
        fileReader.readAsText(file);
    });

    console.log(resultStr);

    return resultStr;
}

export {
    readFile
};