export class UserDTO {
    public username: string;
    public discordId: string;
  
    constructor(username: string, discordId: string) {
      this.username = username;
      this.discordId = discordId;
    }
  }
  