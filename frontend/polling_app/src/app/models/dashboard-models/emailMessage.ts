export class EmailMessage{
    
    subject: string;
    message: string | null;
    slug: string;
    emails: string[];


    constructor(subject: string,
                message: string | null,
                slug: string,
                emails: string[]){ 
    
        this.subject = subject;
        this.message = message;
        this.slug = slug;
        this.emails = emails;
    }
}