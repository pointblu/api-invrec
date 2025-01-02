export interface IResponseReport {
    reportDocumentId: string;
    encryptionDetails: {
        standard: string;
        initializationVector: string;
        key: string;
    };
    url: string;
}

export interface EncryptionDetailsReportAmazon{
    key: string;
    initializationVector: string;
    standard: string;
}