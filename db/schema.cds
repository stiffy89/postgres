using {sap} from '@sap/cds/common';

namespace contactbook;

entity Contacts {
    key ID: String;
        FirstName: String(40);
        LastName: String(40);
        TotalKms: Integer;
}