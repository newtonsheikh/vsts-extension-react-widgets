import * as React from "react";

import { parseUniquefiedIdentityName } from "../../Utilities/Identity";
import { IBaseComponentProps } from "../Utilities/BaseComponent";

import { Persona, PersonaSize } from "OfficeFabric/Persona";

export interface IIdentityViewProps extends IBaseComponentProps {
    identityDistinctName: string;
    size?: PersonaSize;
}

export var IdentityView: React.StatelessComponent<IIdentityViewProps> =
    (props: IIdentityViewProps): JSX.Element => {        
        const identityRef = parseUniquefiedIdentityName(props.identityDistinctName);
        if (!identityRef || !identityRef.displayName) {
            return null;
        }

        return <Persona 
            className={props.className ? `identity-view ${props.className}` : "identity-view"}
            size={props.size || PersonaSize.extraExtraSmall}
            imageUrl={identityRef.imageUrl}
            primaryText={identityRef.displayName}
            secondaryText={identityRef.uniqueName}
        />;
    }; 