function validateString() {
    const inputString = document.getElementById('inputString').value;
    const resultDiv = document.getElementById('result');
    const isValid = isValidCFG(inputString);

    resultDiv.innerText = isValid ? `The string "${inputString}" is accepted by the CFG.` : `The string "${inputString}" is rejected by the CFG.`;

    drawGraph(inputString, isValid);
}

function isValidCFG(str) {
    if (str.length === 0) return true; // An empty string is valid.
    if (str==='c' || str==='C') return true; // string only containing c is accepted

    const cIndex = str.toLowerCase().indexOf('c'); // Find the first occurrence of 'c'.

    // Case 1: 'c' is present.
    if (cIndex !== -1) {
        if (str.toLowerCase().lastIndexOf('c') !== cIndex) return false; // Ensure only one 'c'.
        if (cIndex !== Math.floor(str.length / 2)) return false; // Ensure 'c' is in the middle.

        const left = str.slice(0, cIndex);
        const right = str.slice(cIndex + 1);

        if (!/^[ab]+$/i.test(left) || !/^[ab]+$/i.test(right)) return false; //Ensure the strings only contain a and b

        // Check if the left and right halves are identical palindromes.
        if (left.length !== right.length) return false; // Both halves must be of equal length.
        for (let i = 0; i < left.length; i++) {
            if (left[i].toLowerCase() !== right[right.length - 1 - i].toLowerCase()) 
                return false;
        }
        return true;
    }

    // Case 2: 'c' is not present.
    let i = 0, j = str.length - 1;
    while (i <= j) {
        if (str.length % 2 !== 0) return false; //Check if the string is even
        if (!/^[ab]+$/i.test(str)) return false; //Ensure the strings only contain a and b
        if (str[i].toLowerCase() !== str[j].toLowerCase()) return false;
        i++;
        j--;
    }
    return true; 
}

function drawGraph(str, isValid) {
    const graphContainer = document.getElementById('graphContainer');
    graphContainer.innerHTML = '';

    for (let i = 0; i < str.length; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        if (isValid) {
            circle.classList.add('bounce');
            circle.style.animationDelay = `${i * 0.2}s`;
        } else {
            circle.classList.add('shake');
            circle.style.animationDelay = '0s';
        }
        circle.style.backgroundColor = isValid ? 'green' : 'red';

        const charSpan = document.createElement('span');
        charSpan.innerText = str[i];

        circle.appendChild(charSpan);
        graphContainer.appendChild(circle);
    }
}
