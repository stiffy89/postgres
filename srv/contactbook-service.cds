using contactbook from '../db/schema';

service contactbookservice {
    
    entity Contacts as projection on contactbook.Contacts;
    
    entity Team {
        key ID : String;
            FirstName : String;
            LastName : String;
    }

    annotate Contacts with @odata.draft.enabled;
}