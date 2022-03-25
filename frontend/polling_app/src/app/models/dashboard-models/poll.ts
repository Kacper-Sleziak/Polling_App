export class Poll{
    
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    filled: number;
    sent: number;
    status: string;

    constructor(id: number, name: string, startDate: string, endDate: string, filled: number, sent: number, status: string){
        
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.filled = filled;
        this.sent = sent;
        this.status = status;
    }
  
}