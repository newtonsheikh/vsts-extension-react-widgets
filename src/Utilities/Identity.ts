import { GUIDUtils } from "./Guid";
import { StringUtils } from "./String";

export function getCurrentUser(): string {
    return `${VSS.getWebContext().user.name} <${VSS.getWebContext().user.uniqueName}>`;
}

export function parseUniquefiedIdentityName(name: string): {displayName: string, uniqueName: string, imageUrl: string} {
    if (!name) { 
        return {
            displayName: "",
            uniqueName: "",
            imageUrl: ""
        };
    }
    
    let i = name.lastIndexOf("<");
    let j = name.lastIndexOf(">");
    let displayName = name;
    let alias = "";
    let rightPart = "";
    let id = "";
    if (i >= 0 && j > i && j === name.length - 1) {
        displayName = name.substr(0, i).trim();
        rightPart = name.substr(i + 1, j - i - 1).trim();
        let vsIdFromAlias: string = getVsIdFromGroupUniqueName(rightPart); // if it has vsid in unique name (for TFS groups)

        if (rightPart.indexOf("@") !== -1 || rightPart.indexOf("\\") !== -1 || vsIdFromAlias || GUIDUtils.isGuid(rightPart)) {
            // if its a valid alias
            alias = rightPart;

            // If the alias component is just a guid then this is not a uniqueName but
            // vsId which is used only for TFS groups
            if (vsIdFromAlias != "") {
                id = vsIdFromAlias;
                alias = "";
            }
        }
        else {
            // if its not a valid alias, treat it as a non-identity string
            displayName = name;
        }
    }

    let imageUrl = "";
    if (id) {
        imageUrl = `${VSS.getWebContext().host.uri}/_api/_common/IdentityImage?id=${id}`;
    }
    else if(alias) {
        imageUrl = `${VSS.getWebContext().host.uri}/_api/_common/IdentityImage?identifier=${alias}&identifierType=0`;
    }

    return {
        displayName: displayName,
        uniqueName: alias,
        imageUrl: imageUrl
    };
}

function getVsIdFromGroupUniqueName(str: string): string {
    let leftPart: string;
    if (!str) { return ""; }

    let vsid = "";
    let i = str.lastIndexOf("\\");
    if (i === -1) {
        leftPart = str;
    }
    else {
        leftPart = str.substr(0, i);
    }

    if (StringUtils.startsWith(leftPart, "id:")) {
        let rightPart = leftPart.substr(3).trim();
        vsid = GUIDUtils.isGuid(rightPart) ? rightPart : "";
    }

    return vsid;
}