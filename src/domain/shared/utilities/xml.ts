import { Logger } from "@nestjs/common";

export function XMLToJson(xml: string) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { XMLParser } = require("fast-xml-parser");
        const parser = new XMLParser();
        return parser.parse(xml,
            {
                attrNodeName: "#attr",
                textNodeName: "#text",
                attributeNamePrefix: "",
                ignoreAttributes: false,
                parseAttributeValue: true,
            }, true
        );
    } catch (error) {
        Logger.error(error)
        return null;
    }
}