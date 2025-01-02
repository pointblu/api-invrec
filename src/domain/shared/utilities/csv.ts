import { Logger } from "@nestjs/common";

export function convertCsvToJson(csvFilePath: string) {
    return new Promise((resolve, reject) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const csv = require("csvtojson");
            csv()
                .fromFile(csvFilePath)
                .then(function (jsonArrayObj) { //when parse finished, result will be emitted here.
                    resolve(jsonArrayObj)
                })
        } catch (error) {
            Logger.error(error)
            reject(error)
        }
    })
}
