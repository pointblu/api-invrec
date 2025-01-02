
export function getRandomArbitrary(min, max) {
    const result = Math.random() * (max - min) + min;
    return parseInt(result.toFixed(0));
}

export function removeDuplicates(array) {
    const seen = {};
    const uniqueArray = [];

    array.forEach(item => {
        if (!seen[item]) {
            seen[item] = true;
            uniqueArray.push(item);
        }
    });

    return uniqueArray;
}

export function removeSpecialCharacters(str) {
    const normalized = str.normalize("NFD");
    return normalized.replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9 ]/g, '');
}


export function extraerDominio(url) {
    try {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        let dominio = (new URL(url)).hostname;
        if (!dominio.startsWith('http://') && !dominio.startsWith('https://')) {
            dominio = 'https://' + dominio;
        }
        return dominio;
    } catch (error) {
        return error;
    }
}

/**
* Calcula el índice SMFC del producto dependiendo de sus dimensiones
* @param productData La información del producto a calcular
* @returns El valor del cáldulo del SMFC
*/
export function productDataToSMFCClass(productData: {
    weight: number;
    width: number;
    height: number;
    depth: number;
}, quantity = 1): number {
    const density =
        (productData.weight || 0) / ((((quantity || 1) * (productData.width || 0) * (productData.height || 0) * (productData.depth || 0)) || 1) / 1728);

    if (density <= 1) {
        return 400;
    } else if (density <= 2) {
        return 300;
    } else if (density <= 4) {
        return 250;
    } else if (density <= 6) {
        return 175;
    } else if (density <= 7) {
        return 150;
    } else if (density <= 8) {
        return 125;
    } else if (density <= 10) {
        return 100;
    } else if (density <= 12) {
        return 92.5;
    } else if (density <= 15) {
        return 85;
    } else if (density <= 22.5) {
        return 70;
    } else if (density <= 30) {
        return 65;
    } else if (density <= 35) {
        return 60;
    } else if (density <= 50) {
        return 55;
    } else {
        return 50;
    }
}